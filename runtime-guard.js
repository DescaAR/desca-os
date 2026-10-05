(()=>{'use strict';
const BUILD_NUMBER=77,KEY='desca-os-runtime-errors-v1',MAX_RECORDS=20;
let lastSignature='',lastAt=0;

function messageFrom(value){
  if(value instanceof Error)return value.message||value.name||'Unknown error';
  if(typeof value==='string')return value;
  if(value&&typeof value.message==='string')return value.message;
  try{return JSON.stringify(value)}catch{return String(value||'Unknown error')}
}
function shouldIgnore(message,reason){
  const name=reason&&typeof reason==='object'?reason.name:'';
  return name==='AbortError'||/ResizeObserver loop (limit exceeded|completed with undelivered notifications)/i.test(message)||message==='Script error.';
}
function readRecords(){
  try{const rows=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(rows)?rows:[]}catch{return[]}
}
function writeRecord(record){
  try{const rows=readRecords();rows.push(record);localStorage.setItem(KEY,JSON.stringify(rows.slice(-MAX_RECORDS)))}catch{}
}
function routeName(){return String(location.hash||'#today').replace(/^#/,'').split('?')[0]||'today'}
function ensureStyle(){
  if(document.getElementById('descaRuntimeGuardStyle'))return;
  const style=document.createElement('style');style.id='descaRuntimeGuardStyle';style.textContent=`
  .desca-runtime-guard{position:fixed;left:50%;top:max(14px,env(safe-area-inset-top));transform:translateX(-50%);z-index:2147483000;width:min(680px,calc(100vw - 28px));padding:13px 14px;border:1px solid color-mix(in srgb,var(--app-red,#dc2626) 28%,var(--app-border,#d7dee9));border-radius:16px;background:color-mix(in srgb,var(--app-surface,#fff) 94%,var(--app-red,#dc2626) 6%);color:var(--app-text,#0f172a);box-shadow:0 20px 55px rgba(15,23,42,.18);font:500 13px/1.45 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
  .desca-runtime-guard__row{display:flex;gap:12px;align-items:flex-start}.desca-runtime-guard__icon{flex:none;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--app-red,#dc2626) 12%,transparent);color:var(--app-red,#dc2626);font-weight:900}
  .desca-runtime-guard__copy{min-width:0;flex:1}.desca-runtime-guard__copy b,.desca-runtime-guard__copy small{display:block}.desca-runtime-guard__copy b{font-size:12px}.desca-runtime-guard__copy small{margin-top:2px;color:var(--app-muted,#64748b);font-size:10px}.desca-runtime-guard__actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
  .desca-runtime-guard button{border:1px solid var(--app-border,#d7dee9);border-radius:9px;padding:7px 10px;background:var(--app-surface,#fff);color:var(--app-text,#0f172a);font:700 10px/1 inherit;cursor:pointer}.desca-runtime-guard button[data-runtime-action="recovery"]{background:var(--app-blue,#2563eb);border-color:var(--app-blue,#2563eb);color:#fff}.desca-runtime-guard details{margin-top:8px;color:var(--app-muted,#64748b);font-size:9px}.desca-runtime-guard summary{cursor:pointer}.desca-runtime-guard code{display:block;margin-top:5px;white-space:pre-wrap;overflow-wrap:anywhere}
  @media(max-width:620px){.desca-runtime-guard__row{gap:9px}.desca-runtime-guard__actions{display:grid;grid-template-columns:1fr 1fr}.desca-runtime-guard button[data-runtime-action="dismiss"]{grid-column:1/-1}}
  `;document.head.appendChild(style)
}
function surface(record){
  const mount=()=>{
    if(document.getElementById('descaRuntimeGuard'))return;
    ensureStyle();
    const el=document.createElement('aside');el.id='descaRuntimeGuard';el.className='desca-runtime-guard';el.setAttribute('role','alert');el.setAttribute('aria-live','assertive');
    const row=document.createElement('div');row.className='desca-runtime-guard__row';
    const icon=document.createElement('span');icon.className='desca-runtime-guard__icon';icon.setAttribute('aria-hidden','true');icon.textContent='!';
    const copy=document.createElement('div');copy.className='desca-runtime-guard__copy';
    const title=document.createElement('b');title.textContent='Desca OS mendeteksi error yang tidak terduga.';
    const hint=document.createElement('small');hint.textContent='Data lokal tidak dihapus. Kamu bisa membuka Recovery atau memuat ulang aplikasi.';
    const details=document.createElement('details'),summary=document.createElement('summary'),code=document.createElement('code');summary.textContent='Detail teknis';code.textContent=record.message;details.append(summary,code);copy.append(title,hint,details);
    row.append(icon,copy);el.append(row);
    const actions=document.createElement('div');actions.className='desca-runtime-guard__actions';
    for(const [action,label] of [['recovery','Open Recovery'],['reload','Reload'],['dismiss','Dismiss']]){const b=document.createElement('button');b.type='button';b.dataset.runtimeAction=action;b.textContent=label;actions.appendChild(b)}
    el.append(actions);
    el.addEventListener('click',e=>{const action=e.target?.dataset?.runtimeAction;if(!action)return;if(action==='dismiss')el.remove();if(action==='reload')location.reload();if(action==='recovery'){location.hash='recovery';location.reload()}});
    document.body.appendChild(el)
  };
  if(document.body)mount();else window.addEventListener('DOMContentLoaded',mount,{once:true})
}
function capture(kind,message,source='',line=0,column=0,reason=null){
  const text=messageFrom(message||reason);if(shouldIgnore(text,reason))return;
  const now=Date.now(),signature=[kind,text,source,line,column].join('|');if(signature===lastSignature&&now-lastAt<2000)return;lastSignature=signature;lastAt=now;
  const record={id:'err_'+now.toString(36),kind,message:text.slice(0,1200),source:String(source||'').slice(0,500),line:Number(line)||0,column:Number(column)||0,route:routeName(),build:BUILD_NUMBER,at:new Date(now).toISOString()};
  writeRecord(record);surface(record)
}
window.addEventListener('error',event=>capture('error',event.message,event.filename,event.lineno,event.colno,event.error));
window.addEventListener('unhandledrejection',event=>capture('unhandledrejection',event.reason,'',0,0,event.reason));
window.DescaRuntimeGuard={build:BUILD_NUMBER,records:()=>readRecords().slice(),clear:()=>{try{localStorage.removeItem(KEY)}catch{}},report:()=>({build:BUILD_NUMBER,route:routeName(),records:readRecords().slice(-5)})};
})();