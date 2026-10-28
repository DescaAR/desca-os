/* Desca OS — SAT Resource Hub. No account or typing required. */
(function(){
'use strict';
const GROUPS=[
  {id:'featured',label:'Editor’s Picks'},
  {id:'all',label:'All Resources'},
  {id:'official',label:'Official & Partner Resources'},
  {id:'learn',label:'Conceptual Foundations'},
  {id:'questions',label:'Question Banks'},
  {id:'mock',label:'Full-Length Practice'},
  {id:'analysis',label:'Worked Explanations'},
  {id:'saved',label:'Favourites'}
];
const SITES=[
  {id:'khan',name:'Khan Academy',url:'https://www.khanacademy.org/digital-sat',kind:'learn',official:true,featured:true,cost:'Free',skill:'Math · Reading & Writing',desc:'A structured Digital SAT curriculum combining conceptual explanations, videos, and progressive practice.',label:'Build a Strong Foundation'},
  {id:'question-bank',name:'College Board Question Bank',url:'https://satsuite.collegeboard.org/practice/student-question-bank',kind:'questions',official:true,featured:true,cost:'Free',skill:'Math · Reading & Writing',desc:'An official question bank searchable by domain, skill, and difficulty level.',label:'Official Practice'},
  {id:'bluebook',name:'Bluebook',url:'https://bluebook.collegeboard.org/students/practice',kind:'mock',official:true,featured:true,cost:'Free',skill:'Full-length Digital SAT',desc:'The official full-length Digital SAT practice environment, including its adaptive testing format.',label:'Official Simulation'},
  {id:'mypractice',name:'College Board My Practice',url:'https://mypractice.collegeboard.org/',kind:'analysis',official:true,cost:'Free',skill:'Performance Analysis',desc:'Review Bluebook performance, identify skill gaps, and develop targeted improvement strategies.',label:'Analyse Your Results'},
  {id:'schoolhouse',name:'Schoolhouse.world',url:'https://schoolhouse.world/sat-bootcamp',kind:'learn',cost:'Free',skill:'Small-Group Instruction',desc:'Volunteer-led SAT bootcamps and small-group tuition, subject to session availability.',label:'Collaborative Learning'},
  {id:'qotd',name:'SAT Question of the Day',url:'https://qotd.collegeboard.org/',kind:'questions',official:true,cost:'Free',skill:'Daily Practice',desc:'Access a daily College Board practice question, subject to the availability of the source page.',label:'Daily Question'},
  {id:'preparc',name:'PrepArc',url:'https://preparc.app/',kind:'questions',cost:'Free / Features May Vary',skill:'Topic-Based Practice',desc:'Topic-specific SAT exercises, worked solutions, and examination-style practice features.',label:'Supplementary Practice'},
  {id:'oneforall',name:'One for All SAT',url:'https://oneforallsat.com/',kind:'questions',cost:'Free / Features May Vary',skill:'Math · English · Desmos',desc:'Additional Mathematics and Reading & Writing questions, including strategies involving Desmos.',label:'Supplementary Practice'},
  {id:'kaplan',name:'Kaplan SAT',url:'https://www.kaptest.com/sat/free/sat-practice',kind:'mock',cost:'Limited Free Access',skill:'Mock Tests · Score Reports',desc:'Practice tests and simulations from an examination-preparation provider; some programmes require payment.',label:'Additional Mock Tests'},
  {id:'1600io',name:'1600.io',url:'https://1600.io/',kind:'analysis',cost:'Limited Free Access',skill:'SAT Math · Desmos',desc:'In-depth SAT Mathematics explanations, strategic reasoning, and effective use of Desmos.',label:'Deepen Mathematical Understanding'}
];
const PATH=[
  {id:'concept',name:'01 · Establish the Foundations',summary:'Develop Mathematics and Reading & Writing competence progressively.',site:'Khan Academy',href:'https://www.khanacademy.org/digital-sat'},
  {id:'practice',name:'02 · Practise by Domain',summary:'Select official questions by domain and difficulty.',site:'College Board Question Bank',href:'https://satsuite.collegeboard.org/practice/student-question-bank'},
  {id:'challenge',name:'03 · Master Challenging Questions',summary:'Revisit recurring errors through detailed explanations and deliberate practice.',site:'PrepArc · One for All SAT',href:'https://preparc.app/'},
  {id:'mock',name:'04 · Complete a Full Mock Test',summary:'Take a full-length Digital SAT practice test under realistic conditions.',site:'Bluebook',href:'https://bluebook.collegeboard.org/students/practice'},
  {id:'review',name:'05 · Evaluate and Refine',summary:'Analyse your results, address weaknesses, and consolidate your learning.',site:'My Practice',href:'https://mypractice.collegeboard.org/'}
];
function render({S,esc,head,filter}){
  const settings=S.settings||{},stars=new Set(Array.isArray(settings.satFavorites)?settings.satFavorites:[]);
  const done=new Set(Array.isArray(settings.satStepsDone)?settings.satStepsDone:[]);
  const selected=GROUPS.some(g=>g.id===filter)?filter:'featured';
  const visible=SITES.filter(site=>selected==='featured'?site.featured:selected==='all'?true:selected==='saved'?stars.has(site.id):selected==='official'?site.official:selected==='learn'?site.kind==='learn':site.kind===selected);
  const cards=visible.length?visible.map(site=>{
    const marked=stars.has(site.id),type={learn:'Belajar',questions:'Question Banks',mock:'Full-Length Practice',analysis:'Analisis'}[site.kind]||'Referensi';
    return '<article class="sat-site-card"><div class="sat-site-top"><span class="sat-site-avatar" aria-hidden="true">'+esc(site.name.slice(0,1))+'</span><button type="button" class="sat-star '+(marked?'active':'')+'" data-act="satStar" data-id="'+esc(site.id)+'" aria-label="'+esc(marked?'Remove from favourites: '+site.name:'Add to favourites: '+site.name)+'" aria-pressed="'+marked+'">'+(marked?'★':'☆')+'</button></div>'
      +'<h3>'+esc(site.name)+'</h3><div class="sat-tags"><span>'+esc(type)+'</span>'+(site.official?'<span class="sat-official">Official / Partner</span>':'')+'</div><p>'+esc(site.desc)+'</p><div class="sat-skill">'+esc(site.skill)+'</div><div class="sat-site-bottom"><span>'+esc(site.cost)+'</span><a href="'+esc(site.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+esc(site.name)+' in a new tab">Visit Website ↗</a></div></article>';
  }).join(''):'<div class="sat-empty"><b>You have not saved any favourites yet.</b><p>Select ☆ on any resource to add it to your favourites.</p><button type="button" class="sat-chip" data-act="satFilter" data-filter="featured">View Editor’s Picks</button></div>';
  const stages=PATH.map(step=>{
    const checked=done.has(step.id);
    return '<div class="sat-stage '+(checked?'is-done':'')+'"><button type="button" class="sat-step-check" data-act="satStep" data-id="'+esc(step.id)+'" aria-pressed="'+checked+'" aria-label="'+esc(checked?'Mark as Incomplete: '+step.name:'Mark as Completed: '+step.name)+'">'+(checked?'✓':'○')+'</button><div class="sat-stage-copy"><h3>'+esc(step.name)+'</h3><p>'+esc(step.summary)+'</p><a href="'+esc(step.href)+'" target="_blank" rel="noopener noreferrer">'+esc(step.site)+' ↗</a></div></div>';
  }).join('');
  return head('SAT','All Digital SAT resources in one place. Select a category and open a website immediately—no manual setup required.')
    +'<section class="sat-hero"><div class="sat-hero-main"><span class="sat-overline">DIGITAL SAT · RESOURCE HUB</span><h2>Learn. Practise. Refine.</h2><p>Ten carefully selected resources for conceptual mastery, purposeful practice, official mock examinations, and diagnostic review. Begin with the three essential platforms.</p><div class="sat-hero-actions"><a href="https://www.khanacademy.org/digital-sat" target="_blank" rel="noopener noreferrer">Begin Learning ↗</a><a href="https://bluebook.collegeboard.org/students/practice" target="_blank" rel="noopener noreferrer">Launch a Mock Test ↗</a></div></div><div class="sat-hero-numbers"><div><strong>10</strong><span>SAT Resources</span></div><div><strong>3</strong><span>Essential Resources</span></div><div><strong>'+stars.size+'</strong><span>Saved Favourites</span></div></div></section>'
    +'<section class="sat-exam"><div class="sat-exam-heading"><div><span class="sat-overline">EXAM OVERVIEW</span><h2>Digital SAT Structure</h2></div><span class="sat-score">Total Score: 400–1600</span></div><div class="sat-exam-grid"><article><div><span>SECTION 01</span><b>Math</b></div><strong>200–800</strong><p>44 Questions · 70 Minutes</p><small>Algebra · Advanced Math · Problem-Solving & Data Analysis · Geometry & Trigonometry</small></article><article><div><span>SECTION 02</span><b>Reading & Writing</b></div><strong>200–800</strong><p>54 Questions · 64 Minutes</p><small>Information & Ideas · Craft & Structure · Expression of Ideas · Standard English Conventions</small></article></div></section>'
    +'<section class="sat-library"><div class="sat-section-heading"><div><span class="sat-overline">SAT TOOLKIT</span><h2>SAT Learning Resources</h2><p>The three essential platforms: Khan Academy, College Board Question Bank, and Bluebook.</p></div></div><div class="sat-filter-bar" aria-label="Filter SAT resources">'+GROUPS.map(g=>'<button type="button" class="sat-chip '+(g.id===selected?'active':'')+'" data-act="satFilter" data-filter="'+esc(g.id)+'" aria-pressed="'+(g.id===selected?'true':'false')+'">'+esc(g.label)+(g.id==='all'?' <small>10</small>':g.id==='saved'?' <small>'+stars.size+'</small>':'')+'</button>').join('')+'</div><div class="sat-library-meta"><strong>'+esc(GROUPS.find(x=>x.id===selected).label)+'</strong><span>'+visible.length+' website</span></div><div class="sat-site-grid">'+cards+'</div></section>'
    +'<section class="sat-roadmap"><div class="sat-roadmap-head"><div><span class="sat-overline">5-STEP LEARNING PATH</span><h2>A Recommended Learning Sequence</h2><p>Mark each stage complete with one click; your progress is saved locally.</p></div><div class="sat-roadmap-progress"><strong>'+done.size+'/5</strong><span>Stages Completed</span></div></div><div class="sat-progress-track"><span style="width:'+(Math.min(done.size,5)*20)+'%"></span></div><div class="sat-stages">'+stages+'</div></section>'
    +'<aside class="sat-footnote"><b>Important context:</b> The SAT is principally used for undergraduate admissions. For postgraduate mathematics, verify each programme’s admissions requirements, potentially including GRE and IELTS/TOEFL. Third-party access conditions may change; Bluebook provides the official SAT testing environment.</aside>';
}
globalThis.DescaSatHub={render,sites:SITES,groups:GROUPS,steps:PATH};
})();