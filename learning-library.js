/* Desca OS Learning Library: one catalog for existing study destinations. */
(function(){
'use strict';
const CATEGORIES=[
 {id:'all',label:'All Resources',icon:'◈'},
 {id:'math',label:'Mathematics',icon:'∑',route:'math'},
 {id:'english',label:'English Language',icon:'EN',route:'english'},
 {id:'sat',label:'SAT',icon:'SAT',route:'sat'},
 {id:'psikotes',label:'Psychometric Tests',icon:'Ψ',route:'psikotes'},
 {id:'research',label:'Research & AI',icon:'⌘',route:'research'},
 {id:'saved',label:'Favourites',icon:'★'},
 {id:'mine',label:'My Resources',icon:'+'}
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
  add(row('math:'+s.id,s.name,s.url,isResearch?'research':'math','math',s.tag||s.level||'Mathematics',s.desc,'Free / Open Access',s.featured));
 }
 for(const s of (S?.english?.sites?.length?S.english.sites:englishCatalog)){
  add(row('english:'+s.id,s.title||s.name,s.url,'english','english',s.skill||'English',s.description||(s.useCases||[]).join(' · '),s.tier==='core'?'Primary Resource':'Check Access Terms',s.tier==='core'));
 }
 for(const s of globalThis.DescaSatHub?.sites||[]){
  add(row('sat:'+s.id,s.name,s.url,'sat','sat',s.label||s.kind,s.desc,s.cost||'Check Access Terms',s.featured));
 }
 for(const s of globalThis.DescaPsikotesHub?.sites||[]){
  add(row('psikotes:'+s.id,s.name,s.url,'psikotes','psikotes',s.tag||'Psychometric Tests',s.desc,s.access||'Check Access Terms',s.featured));
 }
 for(const s of (Array.isArray(S?.settings?.learningCustomResources)?S.settings.learningCustomResources:[])){
  add(row('custom:'+s.id,s.title,s.url,SUBJECTS.includes(s.category)?s.category:'research','custom','Personal Resource',s.note||'A resource from your personal collection.','Personal'));
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
  return '<article class="ll-resource-card"><div class="ll-card-head"><span class="ll-card-icon" aria-hidden="true">'+esc(group.icon)+'</span><div class="ll-card-tags"><span>'+esc(group.label)+'</span><span>'+esc(x.tag)+'</span></div><button type="button" class="ll-fav '+(fav?'is-fav':'')+'" data-act="libraryStar" data-id="'+esc(x.id)+'" aria-label="'+esc(fav?'Remove from favourites: '+x.title:'Add to favourites: '+x.title)+'" aria-pressed="'+fav+'">'+(fav?'★':'☆')+'</button>'+(x.source==='custom'?'<button type="button" class="ll-remove" data-act="libraryRemove" data-id="'+esc(x.id)+'" aria-label="Remove '+esc(x.title)+'" title="Remove resource">×</button>':'')+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.desc||'Learning material designed to deepen subject knowledge.')+'</p><div class="ll-card-end"><small>'+esc(x.access||'Visit Website')+'</small><a href="'+esc(x.url)+'" data-os-resource="'+esc(x.id)+'" rel="noopener noreferrer" target="_blank">Open Website ↗</a></div></article>';
 }).join('');
 const empty='<div class="ll-empty"><div class="ll-empty-icon">⌕</div><h3>No resources match your criteria</h3><p>Select another subject or clear your search.</p><button type="button" data-act="libraryReset" class="ll-quiet-btn">Browse all resources</button></div>';
 return '<div class="ll-result-meta"><strong>'+result.length+' resources available</strong><span>'+esc(query?'Results for “'+query+'”':CATEGORIES.find(c=>c.id===category)?.label||'All')+'</span></div><div class="ll-resource-grid">'+(cards||empty)+'</div>'
}
function render({S,esc,head,englishCatalog=[],category='all',query=''}){
 const items=catalog(S,englishCatalog),recent=S.settings?.quickResourceRecent||[],favCount=items.filter(s=>isFavorite(S,s)).length;
 const recentRows=recent.map(id=>items.find(x=>x.id===id)).filter(Boolean).slice(0,4);
 const summaries=CATEGORIES.filter(x=>SUBJECTS.includes(x.id));
 const overview=head('Learning Library','A unified catalogue for substantive learning, deliberate practice, and independent research. Select a discipline and explore.');
 return overview+
  '<section class="ll-hero"><div class="ll-hero-left"><div class="ll-eyebrow">DESCA LEARNING OS · YOUR RESOURCE SPACE</div><h2>Every learning resource.<br><span>One destination.</span></h2><p>Progress from foundational concepts to advanced mathematical inquiry, academic English, examination preparation, and research—without administrative clutter.</p><div class="ll-hero-actions"><a href="#ll-discover">Explore resources <span aria-hidden="true">↓</span></a><button type="button" data-act="libraryAdd" class="ll-outline">+ Save a resource</button></div></div><div class="ll-hero-stats"><div><strong>'+items.length+'</strong><span>Learning resources</span></div><div><strong>'+summaries.length+'</strong><span>Learning disciplines</span></div><div><strong data-library-favorites>'+favCount+'</strong><span>Favourites</span></div></div></section>'
  +'<section class="ll-subjects" aria-label="Learning disciplines"><div class="ll-section-top"><div><span class="ll-eyebrow">LEARNING AREAS</span><h2>Explore your disciplines</h2><p>Select a discipline to discover its most relevant resources.</p></div></div><div class="ll-subject-grid">'+summaries.map(c=>'<button type="button" data-act="libraryFilter" data-filter="'+c.id+'" class="ll-subject"><span class="ll-subject-icon">'+esc(c.icon)+'</span><span><b>'+esc(c.label)+'</b><small>'+items.filter(x=>x.category===c.id).length+' resources</small></span><span class="ll-subject-arrow">↗</span></button>').join('')+'</div></section>'
  +(recentRows.length?'<section class="ll-continue"><div class="ll-section-top"><div><span class="ll-eyebrow">CONTINUE LEARNING</span><h2>Recently accessed</h2></div></div><div class="ll-continue-grid">'+recentRows.map(x=>'<a href="'+esc(x.url)+'" data-os-resource="'+esc(x.id)+'" rel="noopener noreferrer" target="_blank"><span>'+esc(CATEGORIES.find(c=>c.id===x.category)?.icon||'◈')+'</span><b>'+esc(x.title)+'</b><small>↗</small></a>').join('')+'</div></section>':'')
  +'<section class="ll-discover" id="ll-discover"><div class="ll-section-top"><div><span class="ll-eyebrow">RESOURCE EXPLORER</span><h2>Explore the collection</h2><p>Filter with a single click, or search for a particular resource or concept.</p></div><button type="button" data-act="libraryAdd" class="ll-add-secondary">+ Add a resource</button></div><label for="learningSearch" class="ll-search-label"><span aria-hidden="true">⌕</span><input type="search" id="learningSearch" autocomplete="off" spellcheck="false" placeholder="Search resources, subjects, or concepts..." value="'+esc(query)+'" aria-label="Search learning resources"></label><div class="ll-filter-row" aria-label="Filter resources by discipline">'+CATEGORIES.map(c=>'<button type="button" data-act="libraryFilter" data-filter="'+c.id+'" class="ll-chip '+(c.id===category?'active':'')+'" aria-pressed="'+(c.id===category)+'">'+esc(c.label)+'</button>').join('')+'</div><div id="learningResults" aria-live="polite">'+resultHtml({S,esc,items,category,query})+'</div></section>'
  +'<aside class="ll-footnote">Resources from Mathematics, English, SAT, and Psychometric Tests are consolidated automatically. Your favourites remain synchronised across sections. Access conditions are indicative and may change; consult the provider for current terms. Research papers and notes remain available in the Research workspace.</aside>';
}
function addForm(esc){
 return '<div class="modal-head"><div><div class="eyebrow">LEARNING LIBRARY</div><h2 id="modalTitle">Save a learning resource</h2><p class="modal-subtitle">Just a title and a link. Your curated collection is already available.</p></div><button class="icon-btn" data-act="close" aria-label="Close">×</button></div><form id="libraryAddForm"><div class="field"><label>Resource title</label><input name="title" type="text" required minlength="2" maxlength="90" placeholder="Name your resource" autocomplete="off"></div><div class="field"><label>Website URL</label><input name="url" required type="url" placeholder="https://..." inputmode="url"></div><div class="field"><label>Discipline</label><select name="category">'+CATEGORIES.filter(c=>SUBJECTS.includes(c.id)).map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('')+'</select></div><button type="submit" class="btn btn-primary" style="width:100%;margin-top:14px">Save resource</button></form>';
}
globalThis.DescaLearningLibrary={render,catalog,filtered,resultHtml,addForm,toggleFavorite,isFavorite,normalizeUrl,categories:CATEGORIES,subjects:SUBJECTS};
})();
