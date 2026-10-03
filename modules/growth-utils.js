(()=>{'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,+v||0));
const text=v=>String(v??'').trim();
function normalizeProject(p,i=0){
  if(Array.isArray(p))return{id:'proj_legacy_'+i,title:text(p[0])||'Project',area:'General',status:'active',startDate:'',deadline:'',progress:clamp(p[1],0,100),nextAction:text(p[2]),notes:'',milestones:[],createdAt:''};
  p=p&&typeof p==='object'?p:{};
  const milestones=Array.isArray(p.milestones)?p.milestones.map((m,j)=>typeof m==='string'?{id:'pm_'+i+'_'+j,title:m,done:false}:{id:m.id||'pm_'+i+'_'+j,title:text(m.title),done:!!m.done}).filter(m=>m.title):[];
  return{id:p.id||'proj_'+i,title:text(p.title||p.name)||'Project',area:text(p.area)||'General',status:['active','paused','completed'].includes(p.status)?p.status:'active',startDate:p.startDate||'',deadline:p.deadline||'',progress:clamp(p.progress,0,100),nextAction:text(p.nextAction||p.next),notes:text(p.notes),milestones,createdAt:p.createdAt||''};
}
function normalizeStudyTopic(x,i=0){
  x=x&&typeof x==='object'?x:{};
  return{id:x.id||'topic_'+i,title:text(x.title)||'Topik',subject:text(x.subject)||'General',mastery:clamp(x.mastery,0,100),questionsDone:Math.max(0,+x.questionsDone||0),questionsTotal:Math.max(0,+x.questionsTotal||0),targetDate:x.targetDate||'',lastStudied:x.lastStudied||'',notes:text(x.notes)};
}
function normalizeStudyTest(x,i=0){
  x=x&&typeof x==='object'?x:{};
  return{id:x.id||'test_'+i,title:text(x.title)||'Mock Test',date:x.date||'',score:Math.max(0,+x.score||0),maxScore:Math.max(1,+x.maxScore||100),topicId:x.topicId||'',notes:text(x.notes)};
}
function normalizePaper(x,i=0){
  x=x&&typeof x==='object'?x:{};
  return{id:x.id||'paper_'+i,title:text(x.title)||'Paper',authors:text(x.authors),year:text(x.year),status:['to-read','reading','read','key'].includes(x.status)?x.status:'to-read',doi:text(x.doi),url:text(x.url),projectId:x.projectId||'',tags:Array.isArray(x.tags)?x.tags.map(text).filter(Boolean):String(x.tags||'').split(',').map(text).filter(Boolean),notes:text(x.notes),createdAt:x.createdAt||''};
}
function normalizeResearchNote(x,i=0){
  x=x&&typeof x==='object'?x:{};
  return{id:x.id||'rnote_'+i,type:['idea','hypothesis','derivation','result','decision'].includes(x.type)?x.type:'idea',title:text(x.title)||'Research Note',text:text(x.text),projectId:x.projectId||'',date:x.date||'',createdAt:x.createdAt||''};
}
window.DescaGrowth={normalizeProject,normalizeStudyTopic,normalizeStudyTest,normalizePaper,normalizeResearchNote};
})();