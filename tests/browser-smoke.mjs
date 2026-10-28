/* Browser smoke tests: real navigation, persistence, themes and mobile layout. */
import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:8765/';
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:900},colorScheme:'light'});
const page=await context.newPage();
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
async function visit(route){await page.goto(origin+'#'+route,{waitUntil:'domcontentloaded'});await page.locator('#page .page-head, #page .hero-greeting').first().waitFor({timeout:10000});}
async function noRenderError(){assert.equal(await page.locator('.render-error-card').count(),0,'Page should not show a render error');}
try{
  await visit('today');
  await page.locator('.os-shortcut-library').waitFor();
  assert.ok(await page.locator('.os-shortcut-link').count()>=4,'Home should have accessible resource shortcuts');
  assert.ok((await page.locator('#page').innerText()).includes('Persiapan S2'),'Home must retain the S2 goal');
  await noRenderError();

  await visit('academic');
  assert.equal(await page.locator('details.os-academic-group').count(),3,'Academic should show 3 groups');
  assert.ok(await page.locator('details.os-academic-group[open]').count()>=1,'Current academic group must be open');
  await page.locator('details.os-academic-group').first().locator('summary').click();
  await page.locator('details.os-academic-group').first().locator('[data-route="math"]').click();
  await page.locator('.math-resource-card').first().waitFor({timeout:10000});
  await noRenderError();

  await visit('sat');
  await page.locator('.sat-site-card').first().waitFor();
  await page.locator('[data-act="satStar"]').first().click();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.sat-site-card').first().waitFor();
  assert.equal(await page.locator('[data-act="satStar"]').first().getAttribute('aria-pressed'),'true','Favorites must persist through reload');
  await page.locator('[data-act="satFilter"][data-filter="saved"]').click();
  assert.ok(await page.locator('.sat-site-card').count()>=1,'Saved SAT website should be listed');

  await visit('psikotes');
  await page.locator('[data-act="psikotesFilter"][data-filter="all"]').click();
  assert.equal(await page.locator('.psy-site').count(),10,'Psychometric hub must retain all 10 sites');
  await page.locator('.psy-filter-bar [data-act="psikotesFilter"][data-filter="kraepelin"]').click();
  assert.equal(await page.locator('.psy-site').count(),3,'Psychometric topic filter should work');
  await noRenderError();

  await visit('today');
  const light=await page.locator('.os-shortcut-library').evaluate(el=>getComputedStyle(el).backgroundColor);
  await page.locator('#themeToggle').click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark','Dark mode should be applied');
  const dark=await page.locator('.os-shortcut-library').evaluate(el=>getComputedStyle(el).backgroundColor);
  assert.notEqual(light,dark,'Quick Access surface must be legible in both modes');
  await page.reload({waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark','Theme must persist after reload');

  await page.setViewportSize({width:375,height:812});
  await visit('today');
  await page.locator('.os-shortcut-library').waitFor();
  await noRenderError();
  const bounds=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,full:document.documentElement.scrollWidth}));
  if(bounds.full>bounds.viewport+5){
    const offenders=await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).map(el=>({tag:el.tagName,cls:typeof el.className==='string'?el.className.slice(0,105):'',width:Math.round(el.getBoundingClientRect().width),right:Math.round(el.getBoundingClientRect().right),left:Math.round(el.getBoundingClientRect().left)})).filter(x=>x.right>document.documentElement.clientWidth+10&&x.left>=0).sort((a,b)=>b.right-a.right).slice(0,16));
    const regions=await page.evaluate(()=>['.app-shell','.main','.topbar','.top-actions','#page','.os-goal-spotlight','.os-s2-home-card','.os-home-archive','.os-shortcut-library'].map(sel=>{const el=document.querySelector(sel),r=el?.getBoundingClientRect();return{sel,left:Math.round(r?.left||0),right:Math.round(r?.right||0),width:Math.round(r?.width||0),scroll:el?.scrollWidth||0}}));
    console.error('Mobile layout regions:',JSON.stringify(regions));
    console.error('Mobile horizontal overflow offenders:',JSON.stringify(offenders));
  }
  assert.ok(bounds.full<=bounds.viewport+5,'Home should not overflow horizontally on mobile: '+JSON.stringify(bounds));
  await visit('academic');
  await noRenderError();
  assert.equal(await page.locator('details.os-academic-group').count(),3,'Mobile Academic groups must remain accessible');
  assert.deepEqual(errors,[],'Uncaught browser errors: '+errors.join(' | '));
  console.log('Browser smoke tests passed: Home, Academic, Math, SAT, Psikotes, favorites, themes and mobile.');
}finally{
  await browser.close();
}
