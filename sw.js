const CACHE='desca-os-v108-english-audit',ASSETS=['./','./index.html','./styles.css?v=72','./ui-v21.css?v=108','./math-hub.css?v=108','./runtime-guard.js?v=108','./modules/growth-utils.js?v=72','./math-hub.js?v=108','./sat-hub.css?v=108','./sat-hub.js?v=108','./psikotes-hub.css?v=108','./psikotes-hub.js?v=108','./learning-library.js?v=108','./learning-library.css?v=108','./ui-optimizations.css?v=108','./version.json','./app.js?v=108','./manifest.webmanifest','./assets/favicon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('desca-os-v')&&x!==CACHE).map(x=>caches.delete(x)))),checkReminderQueue()]))});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  // Never intercept or cache third-party requests, credentials, or unrelated origins.
  if(url.origin!==self.location.origin)return;
  const navigation=request.mode==='navigate';
  const staticAsset=/\.(?:js|css|json|webmanifest|svg|png)$/i.test(url.pathname);
  if(!navigation&&!staticAsset)return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(request);
      if(response.ok){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));
      }
      return response;
    }catch{
      const offline=await caches.match(request,{ignoreSearch:true});
      if(offline)return offline;
      // An HTML fallback must never masquerade as CSS, JavaScript, or JSON.
      if(navigation)return(await caches.match('./index.html'))||Response.error();
      return Response.error();
    }
  })());
});

function reminderDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open('desca-os-reminders-v1',1);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains('reminders')){const s=db.createObjectStore('reminders',{keyPath:'id'});s.createIndex('at','at')}};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function replaceReminders(rows=[]){const db=await reminderDB(),read=await new Promise((res,rej)=>{const tx=db.transaction('reminders','readonly'),q=tx.objectStore('reminders').getAll();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error)}),shown=new Map(read.map(x=>[x.id,!!x.shown])),tx=db.transaction('reminders','readwrite'),store=tx.objectStore('reminders');store.clear();for(const x of rows)if(x&&x.id&&x.at)store.put({...x,shown:shown.get(x.id)||false});return new Promise((res,rej)=>{tx.oncomplete=res;tx.onerror=()=>rej(tx.error)})}
async function dueReminders(){const db=await reminderDB(),tx=db.transaction('reminders','readonly');return new Promise((res,rej)=>{const q=tx.objectStore('reminders').getAll();q.onsuccess=()=>res((q.result||[]).filter(x=>!x.shown&&+x.at<=Date.now()+60000));q.onerror=()=>rej(q.error)})}
async function markShown(id){const db=await reminderDB(),tx=db.transaction('reminders','readwrite'),s=tx.objectStore('reminders'),x=await new Promise((res,rej)=>{const q=s.get(id);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)});if(x){x.shown=true;s.put(x)}}
async function checkReminderQueue(){try{const due=await dueReminders();for(const x of due){await self.registration.showNotification(x.title||'Desca OS',{body:x.body||'',icon:'./assets/icon-192.png',tag:x.id,data:{url:'./'}});await markShown(x.id)}}catch{}}

self.addEventListener('message',e=>{if(e.data?.type==='SYNC_REMINDERS')e.waitUntil(replaceReminders(e.data.reminders||[]).then(checkReminderQueue))});
self.addEventListener('sync',e=>{if(e.tag==='desca-reminders')e.waitUntil(checkReminderQueue())});
self.addEventListener('periodicsync',e=>{if(e.tag==='desca-reminders')e.waitUntil(checkReminderQueue())});
self.addEventListener('push',e=>{let data={};try{data=e.data?.json()||{}}catch{data={body:e.data?.text()||''}}e.waitUntil(self.registration.showNotification(data.title||'Desca OS',{body:data.body||'',icon:'./assets/icon-192.png',tag:data.tag||'desca-push',data:{url:data.url||'./'}}))});
self.addEventListener('notificationclick',e=>{const url=e.notification?.data?.url||'./';e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list){if('focus'in client){client.navigate?.(url);return client.focus()}}return clients.openWindow?clients.openWindow(url):undefined}))});
