/* Production builder: static assets only, no changes to source files or user data. */
import {mkdir,cp,readFile,writeFile,rm,stat} from 'node:fs/promises';
import {join} from 'node:path';
import {transform} from 'esbuild';

const build=104;
const out='dist';
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
const copyNames=['index.html','sw.js','manifest.webmanifest','version.json','runtime-guard.js',
  'math-hub.js','sat-hub.js','psikotes-hub.js','learning-library.js'];
const cssNames=['styles.css','ui-v21.css','math-hub.css','sat-hub.css','psikotes-hub.css','ui-optimizations.css','learning-library.css'];
for(const file of copyNames)await cp(file,join(out,file));
for(const folder of ['assets','modules'])await cp(folder,join(out,folder),{recursive:true});

const js=await readFile('app.js','utf8');
const minified=await transform(js,{loader:'js',minify:true,target:'es2022',legalComments:'none'});
await writeFile(join(out,'app.min.js'),minified.code);

for(const name of cssNames){
  const source=await readFile(name,'utf8');
  const result=await transform(source,{loader:'css',minify:true,target:'chrome110',legalComments:'none'});
  await writeFile(join(out,name),result.code);
}

const htmlFile=join(out,'index.html');
const html=await readFile(htmlFile,'utf8');
const appRef='app.js?v='+build;
if(!html.includes(appRef))throw Error('Expected app.js build '+build+' in index.html');
await writeFile(htmlFile,html.replace(appRef,'app.min.js?v='+build));
const swFile=join(out,'sw.js');
const sw=await readFile(swFile,'utf8'),expected="'./app.js?v="+build+"'";
if(!sw.includes(expected))throw Error('Missing app.js reference in service worker');
await writeFile(swFile,sw.replace(expected,"'./app.min.js?v="+build+"'").replace("u.pathname.endsWith('/app.js')","u.pathname.endsWith('/app.min.js')||u.pathname.endsWith('/app.js')"));

const originalBytes=(await stat('app.js')).size+ (await Promise.all(cssNames.map(x=>stat(x)))).reduce((n,x)=>n+x.size,0);
const minimizedBytes=(await stat(join(out,'app.min.js'))).size+(await Promise.all(cssNames.map(x=>stat(join(out,x))))).reduce((n,x)=>n+x.size,0);
console.log('Desca OS v'+build+' static bundle: '+originalBytes+' → '+minimizedBytes+' bytes ('+(100-minimizedBytes/originalBytes*100).toFixed(1)+'% smaller before HTTP compression).');
