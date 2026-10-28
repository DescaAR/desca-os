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
  assert.equal(await page.locator('html').getAttribute('lang'),'en','The document language must be English');
  await page.locator('.os-shortcut-library').waitFor();
  assert.ok(await page.locator('.os-shortcut-link').count()>=4,'Home should have accessible resource shortcuts');
  assert.ok((await page.locator('#page').innerText()).includes('Postgraduate Preparation'),'Home must retain the S2 goal');
  await noRenderError();

  await visit('library');
  await page.locator('.ll-hero').waitFor();
  const libraryCount=await page.locator('.ll-resource-card').count();
  assert.ok(libraryCount>=40,'Library should aggregate at least 40 existing resources, got '+libraryCount);
  assert.equal(await page.locator('#sideNav .nav-item').count(),5,'Primary menu must remain five hubs');
  assert.ok((await page.locator('#sideNav').innerText()).includes('Learning'),'Main navigation should highlight Learning');
  await page.locator('.ll-chip[data-filter="sat"]').click();
  assert.equal(await page.locator('.ll-resource-card').count(),10,'SAT library filter must contain all 10 existing SAT websites');
  await page.locator('.ll-chip[data-filter="all"]').click();
  await page.locator('#learningSearch').fill('Kraepelin');
  assert.ok(await page.locator('.ll-resource-card').count()>0,'Live search should find psychometric practice');
  await page.locator('#learningSearch').fill('');
  await page.locator('.ll-fav').first().click();
  await page.locator('.ll-chip[data-filter="saved"]').click();
  assert.ok(await page.locator('.ll-resource-card').count()>=1,'Unified favorites should be accessible');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.ll-hero').waitFor();
  await page.locator('.ll-chip[data-filter="saved"]').click();
  assert.ok(await page.locator('.ll-resource-card').count()>=1,'Favorite should persist through reload');
  await page.locator('[data-act="libraryAdd"]').first().click();
  await page.locator('#libraryAddForm [name="title"]').fill('Personal Learning Portal');
  await page.locator('#libraryAddForm [name="url"]').fill('https://example.org/my-learning');
  await page.locator('#libraryAddForm [name="category"]').selectOption('math');
  await page.locator('#libraryAddForm button[type="submit"]').click();
  await page.locator('.ll-resource-card').getByText('Personal Learning Portal').waitFor();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.ll-chip[data-filter="mine"]').click();
  assert.ok((await page.locator('.ll-resource-grid').innerText()).includes('Personal Learning Portal'),'Personal resource must persist after reload');
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
  await page.waitForTimeout(450); // Allow any legacy entrance animation to settle before measuring layout.
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

  // Language-quality audit of actually rendered UI; do not alter user-generated data.
  await page.setViewportSize({width:1280,height:800});
  const languageRoutes=['today','goals','library','math','english','sat','psikotes','academic','study','research','projects','dmath','books','life','quran','running','health','work','finance','journal','settings','reviews','progress'];
  const indoUI=/\b(?:belajar|sumber|halaman|semua|tambah|simpan|hapus|pilih|buka|latihan|pembahasan|lanjutkan|mulai|selesai|belum|sudah|rencana|persiapan|tugas|kegiatan|berkas|waktu|hari|bulan|minggu|nilai|catatan|keuangan|penghasilan|pemasukan|pengeluaran|tercatat|kembali|ketika|dengan|untuk|yang|dari|tanpa|atau|juga|jika|bukan|dalam|hanya|sekarang|kamu|kalian|sebaiknya|membaca|tidak|kebutuhan|diisi|berikutnya|diperbarui|tersimpan|kosong|lokasi|kota|wajib|sholat|ibadah)\b/i;
  let languageFindings=0;
  for(const pageRoute of languageRoutes){
    await visit(pageRoute);
    const screen=await page.locator('#page').innerText();
    const lines=screen.split('\n').map(v=>v.trim()).filter(Boolean);
    const matches=lines.filter(v=>indoUI.test(v)&&!(/^https?:\/\//.test(v))&&v.length<260);
    if(matches.length){
      languageFindings+=matches.length;
      console.log('LANGUAGE_AUDIT '+pageRoute+' '+matches.length+' matches: '+JSON.stringify([...new Set(matches)].slice(0,22)));
    }
  }
  console.log('LANGUAGE_AUDIT total UI lines to review: '+languageFindings);
  assert.equal(languageFindings,0,'Rendered Desca OS pages still contain Indonesian user-interface copy');

  const languageModalAudit=[
    ['goals',['newS2Item','newS2Document','editS2Prep']],
    ['english',['newEnglishSession','newEnglishWebsite','englishSettings']],
    ['study',['newStudyTopic']],
    ['research',['newResearchPaper','newResearchNote']],
    ['books',['newBook']],
    ['quran',['newQuranEntry','logQuranSession']],
    ['running',['newSport','sportsSettings','newRun']],
    ['work',['newWorkJob','workSession','workPayment']],
    ['finance',['newFinance','newBudget','newDebt','newFinanceGoal']],
    ['dmath',['newDMathContent']],
    ['settings',['customPomodoro']]
  ];
  let modalLanguageFindings=0;
  for(const [pageRoute,actions] of languageModalAudit){
    await visit(pageRoute);
    for(const action of actions){
      await page.evaluate(name=>{const trigger=document.createElement('button');trigger.dataset.act=name;document.body.appendChild(trigger);trigger.click();trigger.remove()},action);
      const copy=await page.locator('#modal').evaluate(el=>[el.innerText,...Array.from(el.querySelectorAll('input,textarea,select')).map(x=>x.getAttribute('placeholder')||'')].join('\n')).catch(()=>'');
      const matched=copy.split('\n').map(v=>v.trim()).filter(v=>indoUI.test(v) && v.length<260);
      if(matched.length){modalLanguageFindings+=matched.length;console.log('MODAL_LANGUAGE_AUDIT '+pageRoute+'/'+action+' '+JSON.stringify([...new Set(matched)].slice(0,18)))}
      await page.evaluate(()=>{const backdrop=document.querySelector('#modalBackdrop');if(backdrop&&!backdrop.hidden){const close=document.querySelector('#modal [data-act="close"]');if(close)close.click();else backdrop.click();}});
    }
  }



  assert.equal(modalLanguageFindings,0,'Desca OS forms still contain Indonesian interface labels');
  assert.deepEqual(errors,[],'Uncaught browser errors: '+errors.join(' | '));
  console.log('Browser smoke tests passed: Home, Learning Library, Academic, Math, SAT, Psikotes, favorites, themes and mobile.');
}finally{
  await browser.close();
}
