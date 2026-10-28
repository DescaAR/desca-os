/* Desca OS Learning Library: one catalog for existing study destinations. */
(function(){
'use strict';
const CATEGORIES=[
 {id:'all',label:'Semua Sumber',icon:'◈'},
 {id:'math',label:'Matematika',icon:'∑',route:'math'},
 {id:'english',label:'Bahasa Inggris',icon:'EN',route:'english'},
 {id:'sat',label:'SAT',icon:'SAT',route:'sat'},
 {id:'psikotes',label:'Psikotes',icon:'Ψ',route:'psikotes'},
 {id:'research',label:'Riset & AI',icon:'⌘',route:'research'},
 {id:'saved',label:'Favorit',icon:'★'},
 {id:'mine',label:'Ditambahkan',icon:'+'}
];
const SUBJECTS=['math','english','sat','psikotes','research'];
const normalizeUrl=url=>{
 try{const u=new URL(String(url||'').trim());if(!['https:','http:'].includes(u.protocol)||u.username||u.password)return'';return u.href}catch{return''}
};
const row=(id,title,url,category,source,tag,desc,access='',featured=false)=>{
 const link=normalizeUrl(url);return link?{id:String(id),title:String(title||''),url:link,category,source,tag:String(tag||category),desc:String(desc||''),access:String(access||''),featured:!!featured}:null
};
function catalog(S,englishCatalog=[]){
 const all=[],add=x=>{if(x)all.push(x)};
 for(const s of globalThis.DescaMathHub?.resources||[]){
  const isResearch=['research','ai'].includes(s.group);
  add(row('math:'+s.id,s.name,s.url,isResearch?'research':'math','math',s.tag||s.level||'Matematika',s.desc,'Gratis / akses terbuka',s.featured));
 }
 for(const s of (S?.english?.sites?.length?S.english.sites:englishCatalog)){
  add(row('english:'+s.id,s.title||s.name,s.url,'english','english',s.skill||'English',s.description||(s.useCases||[]).join(' · '),s.tier==='core'?'Sumber utama':'Cek ketentuan akses',s.tier==='core'));
 }
 for(const s of globalThis.DescaSatHub?.sites||[]){
  add(row('sat:'+s.id,s.name,s.url,'sat','sat',s.label||s.kind,s.desc,s.cost||'Cek ketentuan akses',s.featured));
 }
 for(const s of globalThis.DescaPsikotesHub?.sites||[]){
  add(row('psikotes:'+s.id,s.name,s.url,'psikotes','psikotes',s.tag||'Psikotes',s.desc,s.access||'Cek ketentuan akses',s.featured));
 }
 for(const s of (Array.isArray(S?.settings?.learningCustomResources)?S.settings.learningCustomResources:[])){
  add(row('custom:'+s.id,s.title,s.url,SUBJECTS.includes(s.category)?s.category:'research','custom','Sumber pribadi',s.note||'Tautan yang kamu simpan sendiri.','Pribadi'));
 }
 // One URL is one card even when the same service is registered in multiple specialist pages.
 const seen=new Set();
 return all.filter(s=>{const url=new URL(s.url),key=url.origin+url.pathname.replace(/\/+$/,'')+url.search;
  if(seen.has(key))return false;seen.add(key);return true});
}
function isFavorite(S,x){
 const settings=S.settings||{};
 if(x.source==='math')return (settings.mathFavorites||[]).includes(x.id.slice(5));
 if(x.source==='sat')return (settings.satFavorites||[]).includes(x.id.slice(4));
 if(x.source==='psikotes')return (settings.psikotesFavorites||[]).includes(x.id.slice(9));
 return (settings.learningFavorites||[]).includes(x.id);
}
function toggleFavorite(S,item){
 if(!item)return false;
 if(!S.settings)S.settings={};
 const field=item.source==='math'?'mathFavorites':item.source==='sat'?'satFavorites':item.source==='psikotes'?'psikotesFavorites':'learningFavorites';
 const value=field==='learningFavorites'?item.id:item.id.slice(item.source.length+1);
 const old=new Set(Array.isArray(S.settings[field])?S.settings[field]:[]);
 old.has(value)?old.delete(value):old.add(value);
 S.settings[field]=[...old];return true
}
function filtered(S,items,category='all',query=''){
 const key=String(query||'').toLocaleLowerCase('id').trim();
 return items.filter(x=>{
  if(category==='saved'&&!isFavorite(S,x))return false;
  if(category==='mine'&&x.source!=='custom')return false;
  if(SUBJECTS.includes(category)&&x.category!==category)return false;
  if(key&&!([x.title,x.tag,x.desc,x.access,x.category].join(' ').toLocaleLowerCase('id').includes(key)))return false;
  return true;
 }).sort((a,b)=>{
  const ar=(S.settings?.quickResourceRecent||[]),ai=ar.indexOf(a.id),bi=ar.indexOf(b.id);
  if(ai>=0||bi>=0)return (ai<0?1000:ai)-(bi<0?1000:bi);
  const fav=Number(isFavorite(S,b))-Number(isFavorite(S,a));
  return fav||(Number(b.featured)-Number(a.featured))||a.title.localeCompare(b.title,'id')
 })
}
function resultHtml({S,esc,items,category='all',query=''}) {
 const result=filtered(S,items,category,query);
 const cards=result.map(x=>{
  const fav=isFavorite(S,x),group=CATEGORIES.find(c=>c.id===x.category)||CATEGORIES[0];
  return '<article class="ll-resource-card"><div class="ll-card-head"><span class="ll-card-icon" aria-hidden="true">'+esc(group.icon)+'</span><div class="ll-card-tags"><span>'+esc(group.label)+'</span><span>'+esc(x.tag)+'</span></div><button type="button" class="ll-fav '+(fav?'is-fav':'')+'" data-act="libraryStar" data-id="'+esc(x.id)+'" aria-label="'+esc(fav?'Hapus favorit '+x.title:'Simpan favorit '+x.title)+'" aria-pressed="'+fav+'">'+(fav?'★':'☆')+'</button>'+(x.source==='custom'?'<button type="button" class="ll-remove" data-act="libraryRemove" data-id="'+esc(x.id)+'" aria-label="Hapus '+esc(x.title)+'" title="Hapus sumber">×</button>':'')+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.desc||'Materi dan sumber untuk memperdalam belajar.')+'</p><div class="ll-card-end"><small>'+esc(x.access||'Lihat situs')+'</small><a href="'+esc(x.url)+'" data-os-resource="'+esc(x.id)+'" rel="noopener noreferrer" target="_blank">Buka Website ↗</a></div></article>';
 }).join('');
 const empty='<div class="ll-empty"><div class="ll-empty-icon">⌕</div><h3>Belum ada sumber yang cocok</h3><p>Coba kategori lain atau kosongkan pencarian.</p><button type="button" data-act="libraryReset" class="ll-quiet-btn">Lihat semua sumber</button></div>';
 return '<div class="ll-result-meta"><strong>'+result.length+' sumber tersedia</strong><span>'+esc(query?'Hasil untuk “'+query+'”':CATEGORIES.find(c=>c.id===category)?.label||'Semua')+'</span></div><div class="ll-resource-grid">'+(cards||empty)+'</div>'
}
function render({S,esc,head,englishCatalog=[],category='all',query=''}){
 const items=catalog(S,englishCatalog),recent=S.settings?.quickResourceRecent||[],favCount=items.filter(s=>isFavorite(S,s)).length;
 const recentRows=recent.map(id=>items.find(x=>x.id===id)).filter(Boolean).slice(0,4);
 const summaries=CATEGORIES.filter(x=>SUBJECTS.includes(x.id));
 const overview=head('Learning Library','Satu tempat untuk website belajar, referensi, latihan, dan riset. Pilih kategori, lalu langsung buka.');
 return overview+
  '<section class="ll-hero"><div class="ll-hero-left"><div class="ll-eyebrow">DESCA LEARNING OS · YOUR RESOURCE SPACE</div><h2>Semua sumber belajar.<br><span>Satu tempat.</span></h2><p>Dari konsep dasar hingga riset matematika, bahasa Inggris, SAT, dan psikotes. Kumpulkan referensi tanpa membuat jadwal atau daftar tugas.</p><div class="ll-hero-actions"><a href="#ll-discover">Jelajahi sumber <span aria-hidden="true">↓</span></a><button type="button" data-act="libraryAdd" class="ll-outline">+ Simpan tautan</button></div></div><div class="ll-hero-stats"><div><strong>'+items.length+'</strong><span>Sumber belajar</span></div><div><strong>'+summaries.length+'</strong><span>Bidang belajar</span></div><div><strong data-library-favorites>'+favCount+'</strong><span>Favorit</span></div></div></section>'
  +'<section class="ll-subjects" aria-label="Kategori belajar"><div class="ll-section-top"><div><span class="ll-eyebrow">LEARNING AREAS</span><h2>Pilih bidang belajar</h2><p>Buka kategori untuk melihat sumber yang paling sesuai.</p></div></div><div class="ll-subject-grid">'+summaries.map(c=>'<button type="button" data-act="libraryFilter" data-filter="'+c.id+'" class="ll-subject"><span class="ll-subject-icon">'+esc(c.icon)+'</span><span><b>'+esc(c.label)+'</b><small>'+items.filter(x=>x.category===c.id).length+' sumber</small></span><span class="ll-subject-arrow">↗</span></button>').join('')+'</div></section>'
  +(recentRows.length?'<section class="ll-continue"><div class="ll-section-top"><div><span class="ll-eyebrow">CONTINUE LEARNING</span><h2>Terakhir dibuka</h2></div></div><div class="ll-continue-grid">'+recentRows.map(x=>'<a href="'+esc(x.url)+'" data-os-resource="'+esc(x.id)+'" rel="noopener noreferrer" target="_blank"><span>'+esc(CATEGORIES.find(c=>c.id===x.category)?.icon||'◈')+'</span><b>'+esc(x.title)+'</b><small>↗</small></a>').join('')+'</div></section>':'')
  +'<section class="ll-discover" id="ll-discover"><div class="ll-section-top"><div><span class="ll-eyebrow">RESOURCE EXPLORER</span><h2>Jelajahi koleksi</h2><p>Filter dengan sekali klik, atau cari judul dan materi tertentu.</p></div><button type="button" data-act="libraryAdd" class="ll-add-secondary">+ Tambah tautan</button></div><label for="learningSearch" class="ll-search-label"><span aria-hidden="true">⌕</span><input type="search" id="learningSearch" autocomplete="off" spellcheck="false" placeholder="Cari website, topik, atau materi..." value="'+esc(query)+'" aria-label="Cari sumber belajar"></label><div class="ll-filter-row" aria-label="Filter kategori sumber">'+CATEGORIES.map(c=>'<button type="button" data-act="libraryFilter" data-filter="'+c.id+'" class="ll-chip '+(c.id===category?'active':'')+'" aria-pressed="'+(c.id===category)+'">'+esc(c.label)+'</button>').join('')+'</div><div id="learningResults" aria-live="polite">'+resultHtml({S,esc,items,category,query})+'</div></section>'
  +'<aside class="ll-footnote">Sumber dari halaman Matematika, English, SAT, dan Psikotes digabungkan otomatis. Favorit pada tiap halaman tersinkron di Desca OS. Status gratis/berbayar mengikuti informasi katalog dan dapat berubah di situs penyedia. Untuk berkas PDF dan catatan riset, gunakan halaman Research yang sudah ada.</aside>';
}
function addForm(esc){
 return '<div class="modal-head"><div><div class="eyebrow">LEARNING LIBRARY</div><h2 id="modalTitle">Simpan sumber belajar</h2><p class="modal-subtitle">Cukup nama dan tautan. Ini opsional—sumber bawaan sudah tersedia.</p></div><button class="icon-btn" data-act="close" aria-label="Tutup">×</button></div><form id="libraryAddForm"><div class="field"><label>Nama website</label><input name="title" type="text" required minlength="2" maxlength="90" placeholder="Nama sumber belajar" autocomplete="off"></div><div class="field"><label>Link website</label><input name="url" required type="url" placeholder="https://..." inputmode="url"></div><div class="field"><label>Bidang</label><select name="category">'+CATEGORIES.filter(c=>SUBJECTS.includes(c.id)).map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('')+'</select></div><button type="submit" class="btn btn-primary" style="width:100%;margin-top:14px">Simpan sumber</button></form>';
}
globalThis.DescaLearningLibrary={render,catalog,filtered,resultHtml,addForm,toggleFavorite,isFavorite,normalizeUrl,categories:CATEGORIES,subjects:SUBJECTS};
})();
