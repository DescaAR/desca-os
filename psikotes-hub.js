/* Desca OS — Psikotes Hub: curated aptitude test resource directory. */
(function(){
'use strict';
const GROUPS=[
 {id:'featured',label:'Editor’s Picks'},
 {id:'all',label:'All Resources (10)'},
 {id:'indonesia',label:'Indonesian'},
 {id:'international',label:'International'},
 {id:'numerik',label:'Numerical Reasoning'},
 {id:'verbal',label:'Verbal Reasoning'},
 {id:'logika',label:'Logical Reasoning'},
 {id:'figural',label:'Abstract Reasoning'},
 {id:'kraepelin',label:'Kraepelin & Pauli'},
 {id:'ketelitian',label:'Attention to Detail'},
 {id:'kepribadian',label:'Personality'},
 {id:'tryout',label:'Mock Tests'},
 {id:'saved',label:'Favourites'}
];
const SITES=[
 {id:'simulasi',name:'Mock Tests Psikotes',url:'https://pramudya-yb.github.io/psychotest-simulation/',region:'indonesia',topics:['numerik','verbal','logika','figural','kepribadian','tryout'],access:'Free · No Registration',tag:'Quick Assessment',desc:'Simulated numerical, verbal, logical, and abstract reasoning assessments, including workplace-related measures. Suitable for familiarising yourself with common question formats.'},
 {id:'psikoteskerja',name:'Psikotes Kerja',url:'https://psikoteskerja.id/',region:'indonesia',topics:['numerik','logika','kraepelin','kepribadian','tryout'],access:'Limited Free Access · Paid Plans',tag:'Employment Assessments',desc:'TIU, Kraepelin, Pauli, Wartegg, and PAPI Kostick exercises, alongside employment assessment simulations.'},
 {id:'sikotesku',name:'Sikotesku',url:'https://sikotesku.com/landing',region:'indonesia',topics:['numerik','logika','figural','kraepelin','ketelitian'],access:'Free Introductory Exercises',tag:'Mental Arithmetic',desc:'Kraepelin drills, foundational mathematics, TIU/CFIT exercises, and assessments of concentration and accuracy.',featured:true},
 {id:'matchupskills',name:'MatchupSkills',url:'https://www.matchupskills.id/belajar/psikotes-online-gratis',region:'indonesia',topics:['kraepelin','ketelitian','kepribadian'],access:'Free · Account Required',tag:'Concentration',desc:'Symbol-recognition exercises, attention-to-detail drills, Kraepelin tests, and repeatable personality assessments.'},
 {id:'jadibumn',name:'JadiBUMN',url:'https://app.jadibumn.id/tryout-bumn',region:'indonesia',topics:['numerik','verbal','logika','tryout'],access:'Limited Free Access · Paid Plans',tag:'State-Owned Enterprise Recruitment',desc:'TKD assessments, psychometric practice, learning-agility exercises, and recruitment simulations for Indonesiann state-owned enterprises.'},
 {id:'123test',name:'123test',url:'https://www.123test.com/',region:'international',topics:['numerik','verbal','logika','figural','kepribadian','tryout'],access:'Selected Tests Available Free',tag:'Patterns & Abstraction',desc:'Aptitude assessments covering abstract reasoning, pattern recognition, and personality, with explanatory feedback.',featured:true},
 {id:'practiceaptitude',name:'Practice Aptitude Tests',url:'https://www.practiceaptitudetests.com/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Free Tests Available',tag:'Professional Aptitude',desc:'Numerical, verbal, logical, and abstract reasoning exercises, cognitive ability tests, and situational judgement assessments.',featured:true},
 {id:'assessmentday',name:'AssessmentDay',url:'https://www.assessmentday.com/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Limited Free Access · Premium',tag:'Advanced Practice',desc:'Numerical and verbal assessments, inductive and deductive reasoning, spatial ability, and critical-thinking practice.'},
 {id:'shl',name:'SHL Practice Tests',url:'https://www.shl.com/shldirect/en/practice-tests/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Latihan gratis',tag:'Recruitment Assessments',desc:'Sample aptitude questions and introductory material on professional recruitment assessment formats.'},
 {id:'psychometricsuccess',name:'Psychometric Success',url:'https://psychometric-success.com/',region:'international',topics:['numerik','verbal','logika','figural'],access:'Free Practice · Paid Options',tag:'Guidance & Practice',desc:'Explanatory guides, practice questions, and solutions in numerical, verbal, diagrammatic, spatial, and mechanical reasoning.'}
];
const TOPICS=[
 {id:'numerik',label:'Numerical Reasoning',caption:'Arithmetic, ratios, graphs, and data interpretation',sites:'Practice Aptitude Tests · AssessmentDay'},
 {id:'verbal',label:'Verbal Reasoning',caption:'Reading comprehension and valid inference',sites:'Practice Aptitude Tests · Psychometric Success'},
 {id:'logika',label:'Logical Reasoning',caption:'Syllogisms and deductive reasoning',sites:'123test · SHL'},
 {id:'figural',label:'Abstract Reasoning',caption:'Visual patterns and abstract inference',sites:'123test · AssessmentDay'},
 {id:'kraepelin',label:'Kraepelin & Pauli',caption:'Sustained arithmetic speed and accuracy',sites:'Sikotesku · MatchupSkills'},
 {id:'ketelitian',label:'Attention to Detail',caption:'Concentration, symbol recognition, and precision',sites:'MatchupSkills · Sikotesku'},
 {id:'kepribadian',label:'Personality',caption:'Working styles and behavioural preferences',sites:'Psikotes Kerja · 123test'},
 {id:'tryout',label:'Full-Length Practice',caption:'Timed exercises with diagnostic feedback',sites:'Mock Tests Psikotes · SHL'}
];
const PATH=[
 {id:'orientasi',label:'01 · Understand Assessment Formats',text:'Sample numerical, verbal, logical, and abstract tests before selecting your priorities.',site:'123test + Mock Tests Psikotes',url:'https://www.123test.com/'},
 {id:'penalaran',label:'02 · Strengthen Analytical Reasoning',text:'Tackle more demanding questions, review worked solutions, and analyse recurring errors.',site:'Practice Aptitude Tests',url:'https://www.practiceaptitudetests.com/'},
 {id:'ketelitian',label:'03 · Improve Speed and Accuracy',text:'Practise Kraepelin, Pauli, and precision-based exercises under controlled time limits.',site:'Sikotesku',url:'https://sikotesku.com/landing'},
 {id:'simulasi',label:'04 · Complete a Mock Assessment',text:'Complete a representative assessment, evaluate your performance, and address areas of weakness.',site:'Psikotes Kerja / SHL',url:'https://psikoteskerja.id/'}
];
function render({S,esc,head,filter}){
 const prefs=S.settings||{},stars=new Set(Array.isArray(prefs.psikotesFavouriteses)?prefs.psikotesFavouriteses:[]),done=new Set(Array.isArray(prefs.psikotesStepsDone)?prefs.psikotesStepsDone:[]);
 const chosen=GROUPS.some(g=>g.id===filter)?filter:'featured';
 const visible=SITES.filter(s=>chosen==='featured'?s.featured:chosen==='all'?true:chosen==='saved'?stars.has(s.id):chosen==='indonesia'||chosen==='international'?s.region===chosen:s.topics.includes(chosen));
 const label=GROUPS.find(g=>g.id===chosen).label;
 const cards=visible.length?visible.map(s=>{
  const star=stars.has(s.id);
  return '<article class="psy-site"><div class="psy-site-top"><span class="psy-mark" aria-hidden="true">'+esc(s.name.slice(0,1))+'</span><button type="button" class="psy-star '+(star?'selected':'')+'" data-act="psikotesStar" data-id="'+esc(s.id)+'" aria-label="'+esc(star?'Remove from favourites: '+s.name:'Add to favourites: '+s.name)+'" aria-pressed="'+star+'">'+(star?'★':'☆')+'</button></div>'
    +'<h3>'+esc(s.name)+'</h3><div class="psy-tags"><span>'+esc(s.region==='indonesia'?'Indonesiann-language':'English')+'</span><span>'+esc(s.tag)+'</span></div><p>'+esc(s.desc)+'</p><div class="psy-caps">'+s.topics.slice(0,4).map(t=>'<span>'+esc(TOPICS.find(y=>y.id===t)?.label||t)+'</span>').join('')+'</div><div class="psy-site-bottom"><small>'+esc(s.access)+'</small><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+esc(s.name)+' in a new tab">Visit Website ↗</a></div></article>';
 }).join(''):'<div class="psy-empty"><strong>No favourite websites yet</strong><p>Select the star to retain a website in your favourites.</p><button type="button" class="psy-filter" data-act="psikotesFilter" data-filter="featured">View Recommended Resources</button></div>';
 const roadmap=PATH.map(step=>{
  const checked=done.has(step.id);
  return '<div class="psy-stage '+(checked?'done':'')+'"><button type="button" class="psy-step-check" data-act="psikotesStep" data-id="'+esc(step.id)+'" aria-pressed="'+checked+'" aria-label="'+esc(checked?'Mark as Incomplete: '+step.label:'Mark as Completed: '+step.label)+'">'+(checked?'✓':'○')+'</button><div><h3>'+esc(step.label)+'</h3><p>'+esc(step.text)+'</p><a href="'+esc(step.url)+'" target="_blank" rel="noopener noreferrer">'+esc(step.site)+' ↗</a></div></div>';
 }).join('');
 return head('Psikotes','Kumpulan latihan psikotes kerja, BUMN, dan kemampuan umum — pilih kategori lalu buka sumber tanpa mengetik.')
  +'<section class="psy-hero"><div class="psy-hero-copy"><span class="psy-kicker">APTITUDE · REASONING · ASSESSMENT</span><h2>Practise with Greater Precision.</h2><p>Ten resources spanning numerical and verbal aptitude, abstract reasoning, Kraepelin drills, precision, and comprehensive psychometric assessments. Begin with three recommended platforms.</p><div class="psy-hero-actions"><a href="https://pramudya-yb.github.io/psychotest-simulation/" target="_blank" rel="noopener noreferrer">Try a Mock Assessment ↗</a><a href="https://www.practiceaptitudetests.com/" target="_blank" rel="noopener noreferrer">Practise Reasoning ↗</a></div></div><div class="psy-hero-metrics"><div><strong>10</strong><span>Website</span></div><div><strong>8</strong><span>Assessment Domains</span></div><div><strong>'+stars.size+'</strong><span>Favourites</span></div></div></section>'
  +'<section class="psy-library"><div class="psy-section-head"><div><span class="psy-kicker">RESOURCE COLLECTION</span><h2>Psychometric Test Resources</h2><p>Recommended starting points: Practice Aptitude Tests, 123test, and Sikotesku.</p></div></div><div class="psy-filter-wrap"><div class="psy-filter-bar" aria-label="Filter psychometric resources">'+GROUPS.map(g=>'<button type="button" class="psy-filter '+(chosen===g.id?'active':'')+'" data-act="psikotesFilter" data-filter="'+esc(g.id)+'" aria-pressed="'+(chosen===g.id)+'">'+esc(g.label)+(g.id==='saved'?' <span>'+stars.size+'</span>':'')+'</button>').join('')+'</div></div><div class="psy-list-meta"><strong>'+esc(label)+'</strong><span>'+visible.length+' website</span></div><div class="psy-grid">'+cards+'</div></section>'
  +'<section class="psy-topic-section"><div class="psy-section-head"><div><span class="psy-kicker">QUICK PRACTICE</span><h2>Explore Assessment Domains</h2><p>Select a domain to reveal relevant assessment providers.</p></div></div><div class="psy-topic-grid">'+TOPICS.map(t=>'<button type="button" class="psy-topic" data-act="psikotesFilter" data-filter="'+esc(t.id)+'"><span class="psy-topic-arrow" aria-hidden="true">↗</span><b>'+esc(t.label)+'</b><small>'+esc(t.caption)+'</small><span>'+esc(t.sites)+'</span></button>').join('')+'</div></section>'
  +'<section class="psy-roadmap"><div class="psy-roadmap-heading"><div><span class="psy-kicker">LEARNING PATH</span><h2>Four Stages of Psychometric Preparation</h2><p>Track completed stages with a single click; no schedules or deadlines are necessary.</p></div><div class="psy-roadmap-counter"><strong>'+done.size+'/4</strong><small>Completed</small></div></div><div class="psy-progress"><span style="width:'+Math.min(done.size,4)*25+'%"></span></div><div class="psy-stage-grid">'+roadmap+'</div></section>'
  +'<aside class="psy-note"><b>Important:</b> Third-party aptitude and personality assessments do not constitute psychological diagnoses or guarantee recruitment outcomes. Access tiers, registration requirements, and available features may change.</aside>';
}
globalThis.DescaPsikotesHub={render,sites:SITES,groups:GROUPS,topics:TOPICS,steps:PATH};
})();
