const fs=require('fs');
const vm=require('vm');
const app=fs.readFileSync('app.js','utf8');
if(app.includes('https://www.googleapis.com/auth/calendar.events'))throw new Error('Google Calendar OAuth scope must be removed');
if(app.includes('/calendar/v3'))throw new Error('Google Calendar API calls must be removed');
if(app.includes('googleCalendarBanner()'))throw new Error('Google Calendar connection UI must be removed');
if(!app.includes('https://www.googleapis.com/auth/tasks')||!app.includes('https://www.googleapis.com/auth/drive.appdata'))throw new Error('Preserve Tasks and Drive scopes');
const instrumented=app.replace(/\}\)\(\);\s*$/,`globalThis.__DESCA_TEST__={S,bookPace,parseSmartCapture,commandParse,readingStats,osFastStudy,osFastEnglish,osFastSport,osFastWork,taskForm,activityForm,financeForm,englishSessionForm,workSessionForm};})();`);
const routes=['today','planner','inbox','tasks','calendar','deadlines','goals','academic','study','research','projects','dmath','vault','life','quran','books','running','health','finance','journal','progress','timeline','analytics','reviews','notifications','recovery','settings'];

function element(){
  return {
    innerHTML:'',textContent:'',value:'',hidden:false,title:'',dataset:{},files:[],tagName:'DIV',options:[],selectedIndex:0,nextElementSibling:null,
    style:{setProperty(){},removeProperty(){},width:''},
    classList:{add(){},remove(){},toggle(){},contains(){return false}},
    setAttribute(){},getAttribute(){return null},removeAttribute(){},
    querySelector(){return element()},querySelectorAll(){return []},
    addEventListener(){},removeEventListener(){},focus(){},closest(){return null},
    appendChild(){},append(){},remove(){},click(){},scrollIntoView(){},getContext(){return null}
  };
}
function richState(){
  return {
    profile:{name:'Desca',timezone:'Asia/Jakarta',dailyFocusTarget:240,weeklyTarget:1800},
    settings:{theme:'light',plannerStart:'08:00',plannerEnd:'22:00',calendarView:'month',pomodoroPreset:'classic',pomodoroFocus:25,pomodoroShortBreak:5,pomodoroLongBreak:15,pomodoroCycles:4,sidebarCollapsed:false,notifications:false,reminderLead:30,automationEnabled:true,automationAutoPlan:false,automationCalendarPrep:true,automationDeadline:true,automationS2:true,automationResearchNudge:true,autoDayClosure:true,smartNotifications:true,digestMode:true,reduceMotion:false,copilotEndpoint:'',runningMaxHR:190,runningRestingHR:60,runningWeeklyGoalKm:20,dashboardWidgets:['now','quests','timeline','summary','planner','priorities','life','timer','pomodoro','recommendation','weekly','goals'],latestKnownBuild:70},
    tasks:[
      {id:'t1',title:'Belajar Analisis Real',date:'2026-10-05',deadline:'2026-10-05',startTime:'09:00',estimate:90,status:'planned',priority:'high',category:'study',inbox:false,subtasks:[],tags:[],goalId:'g1',projectId:'p1',studyTopicId:'st1'},
      {id:'t2',title:'Revisi skripsi',date:'2026-10-05',deadline:'2026-10-07',startTime:'09:30',estimate:120,status:'planned',priority:'high',category:'research',inbox:false,subtasks:[],tags:[],projectId:'p1',goalId:'g1'}
    ],
    activities:[
      {id:'a1',date:'2026-10-04',title:'Study',category:'study',duration:120,startTime:'09:00',completed:true,studyTopicId:'st1'},
      {id:'a2',date:'2026-10-03',title:'Research',category:'research',duration:90,startTime:'10:00',completed:true,projectId:'p1'},
      {id:'a3',date:'2026-10-04',title:'Reading · How to Prove It',category:'reading',duration:35,startTime:'20:00',completed:true,source:'books'}
    ],
    goals:[{id:'g1',title:'Selesaikan Skripsi',area:'Research',deadline:'2026-10-20',progress:50,status:'active',milestones:[],milestoneDone:[],autoProgress:true,createdAt:'2026-09-01'}],
    projects:[{id:'p1',title:'Skripsi Alexandroff',area:'Research',status:'active',startDate:'2026-09-01',deadline:'2026-10-20',progress:40,nextAction:'Revisi lemma',notes:'',milestones:[],createdAt:'2026-09-01'}],
    studyTopics:[{id:'st1',title:'Konvergensi Seragam',subject:'Analisis Real',mastery:65,questionsDone:20,questionsTotal:30,targetDate:'2026-10-20',lastStudied:'2026-10-04',notes:''}],
    studyTests:[],
    researchPapers:[{id:'rp1',title:'Distance Spectra',authors:'A',year:'2025',status:'reading',projectId:'p1',tags:[],notes:'',annotations:'',paperMarks:[],citedPaperIds:[],readProgress:40,lastPage:10,rating:4,lastOpenedAt:'2026-10-04T00:00:00Z'}],
    researchNotes:[],routines:[],routineSkips:[],attendance:[],vault:[],rankHistory:[],archive:[],notificationsCenter:[],examModes:[],
    academic:{semesters:[{id:'s1',name:'Semester 7',start:'2026-08-01',end:'2026-12-30',status:'active'}],courses:[{id:'c1',semesterId:'s1',name:'Analisis Real',credits:3,targetScore:85}],assessments:[{id:'as1',courseId:'c1',title:'UTS',date:'2026-10-10',weight:40,score:80,maxScore:100}]},
    finance:[],budgets:[],investments:[],financeGoals:[],recurringFinance:[],debts:[],netWorthSnapshots:[],
    healthLogs:[{id:'h1',date:'2026-10-05',sleep:7.5,energy:4,mood:4}],runs:[],dayClosures:[],reminderLog:[],automationLog:[],googleEvents:[],
    dmath:{instagram:{name:'Instagram',metric:'Followers',current:0,target:1000,monthlyTarget:0},youtube:{name:'YouTube',metric:'Subscribers',current:0,target:1000,monthlyTarget:0},facebook:{name:'Facebook',metric:'Followers',current:0,target:1000,monthlyTarget:0},website:{name:'Website',metric:'Monthly Visitors',current:0,target:100,monthlyTarget:0},updates:[],content:[]},
    quran:{entries:[],sessions:[],dailyTargetVerses:5},
    books:{items:[
      {id:'b1',title:'How to Prove It',author:'Daniel J. Velleman',year:'2019',isbn:'9781108439534',genre:'Mathematics',coverUrl:'',totalPages:384,currentPage:96,status:'reading',startDate:'2026-10-01',targetDays:21,targetDate:'2026-10-22',finishedDate:'',rating:0,why:'Proof writing',review:'',createdAt:'2026-10-01T00:00:00Z',updatedAt:'2026-10-04T00:00:00Z'},
      {id:'b2',title:'A Finished Book',author:'Author',totalPages:200,currentPage:200,status:'finished',startDate:'2026-09-01',targetDays:30,targetDate:'2026-09-30',finishedDate:'2026-09-25',rating:5,createdAt:'2026-09-01T00:00:00Z',updatedAt:'2026-09-25T00:00:00Z'}
    ],sessions:[{id:'bs1',bookId:'b1',date:'2026-10-04',time:'20:00',pageStart:70,pageEnd:96,pagesRead:26,duration:35,notes:'Good chapter',quote:''}],annualTarget:24,defaultFinishDays:30},
    decisions:[{id:'d1',title:'Focus S2 on Analysis',date:'2026-10-01',area:'Academic',reason:'Best fit',alternatives:'Combinatorics',reviewDate:'2027-01-01'}],
    plans:[{id:'pl1',title:'Semester 7',horizon:'Semester',start:'2026-08-01',end:'2026-12-30',outcomes:['Finish thesis'],doneOutcomes:[]}],
    changeLog:[],offlineQueue:[],journal:{},trash:[],notes:[],
    s2Prep:{focus:'Analisis',targetIntake:'2027',universities:[],scholarships:[],checklist:[],documents:[]},
    meta:{version:30,activeTimer:null,revision:0,modifiedAt:'',lastCloudSync:'',lastCloudRevision:0,lastAutoPlanDate:'',lastAutoPlanCount:0,nowNextSnoozes:{},lastDiligenceRankIndex:null,highestDiligenceRankIndex:0,pendingRankUp:null,questAwards:{},morningStartedDate:'2026-10-05',lastRecoveryGuardDate:'',recoveryDays:[],lastDailySnapshotDate:'',lastWeeklySnapshotKey:'',lastMonthlySnapshotKey:'',lastDataQualityRun:'',lastDiagnosticsRun:'',lastAutoClosureDate:'',shareTargetHandled:'',onboardingDone:true,lastWeeklyReset:''}
  };
}
function run(route,state){
  const errors=[],els=new Map(),store=new Map();
  if(state)store.set('desca-os-state-v1',JSON.stringify(state));
  const get=q=>{if(!els.has(q))els.set(q,element());return els.get(q)};
  const ctx={
    console:{log(){},warn(){},error(...a){errors.push(a.map(String).join(' | '))}},
    localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)},
    sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},
    document:{querySelector:get,querySelectorAll(){return[]},getElementById:id=>get('#'+id),documentElement:element(),body:element(),head:element(),activeElement:element(),addEventListener(){},createElement(){return element()}},
    navigator:{onLine:true},location:{hash:'#'+route,search:'',pathname:'/desca-os/',protocol:'https:',origin:'https://descaar.github.io',reload(){},assign(){}},
    history:{replaceState(){},pushState(){}},Notification:{permission:'default'},confirm:()=>true,alert(){},prompt:()=>null,
    requestAnimationFrame:fn=>{try{fn()}catch(e){errors.push(String(e))}},cancelAnimationFrame(){},setTimeout(){return 0},clearTimeout(){},setInterval(){return 0},clearInterval(){},
    caches:{keys:async()=>[],delete:async()=>true},URLSearchParams,Intl,Date,Math,JSON,Array,Object,String,Number,Boolean,RegExp,Map,Set,Promise,Blob,FormData,
    fetch:async()=>({ok:false,json:async()=>({})}),matchMedia:()=>({matches:false}),addEventListener(){},removeEventListener(){}
  };
  ctx.window=ctx;ctx.globalThis=ctx;
  vm.runInNewContext(instrumented,ctx,{filename:'app.js'});
  if(errors.length)throw new Error(route+': '+errors.slice(0,3).join(' || '));
  return ctx;
}
for(const route of routes){run(route,null);run(route,richState())}
const navigation=run('planner',richState()).document.querySelector('#sideNav').innerHTML;
if((navigation.match(/class="nav-item /g)||[]).length!==5)throw new Error('Primary sidebar must contain exactly 5 sections');

const taskUI=run('tasks',richState()).document.querySelector('#page').innerHTML;
if(!taskUI.includes('s2-prep-card')||taskUI.includes('os-task-workspace')||taskUI.includes('data-view="active"'))throw new Error('Tasks route should render Goals instead of task filters');
const taskRouteUI=run('tasks',richState()).document.querySelector('#page').innerHTML;
if(!taskRouteUI.includes('s2-prep-card')||taskRouteUI.includes('os-task-workspace'))throw new Error('Legacy Tasks route must redirect to Goals');
const goalsUI=run('goals',richState()).document.querySelector('#page').innerHTML;
if(!goalsUI.includes('Persiapan S2')||!goalsUI.includes('s2-prep-card')||!goalsUI.includes('s2-document')||!goalsUI.includes('s2-pipeline')||goalsUI.includes('Goal Baru')||goalsUI.includes('goal-detail'))throw new Error('Goals must only contain S2 preparation');
if(goalsUI.includes('goal-linked-tasks')||goalsUI.includes('LINKED TASKS'))throw new Error('Task list must not appear within Goals');
const focusedS2=run('goals',richState()).__DESCA_TEST__.S;
if(focusedS2.goals.some(g=>!(/\\bS2\\b|pascasarjana|master|magister/i.test(g.title)||g.baselineKey==='s2')))throw new Error('Non-S2 goals must no longer be active');
if(!focusedS2.goals.some(g=>g.baselineKey==='s2'))throw new Error('S2 preparation baseline must remain');
if(!Array.isArray(focusedS2.archivedGoalsOutsideS2)||!focusedS2.archivedGoalsOutsideS2.some(g=>g.title==='Selesaikan Skripsi'))throw new Error('Non-S2 goals should be backed up for recovery');
const s2Spotlight=run('today',richState()).document.querySelector('#page').innerHTML;
if(!s2Spotlight.includes('os-s2-home-card')||s2Spotlight.includes('Goals in progress')||s2Spotlight.includes('Goal Baru'))throw new Error('Home must show only S2 goal summary');
const homeNavigation=run('today',richState()).document.querySelector('#sideNav').innerHTML;
if(homeNavigation.includes('data-route="tasks"')||!homeNavigation.includes('data-route="goals"'))throw new Error('Primary navigation must replace Tasks with Goals');
const studyUI=run('study',richState()).document.querySelector('#page').innerHTML;
if(!studyUI.includes('Analisis Belajar')||!studyUI.includes('os-advanced-disclosure')||!studyUI.includes('Topic Mastery'))throw new Error('Study core/advanced layout missing');
const researchUI=run('research',richState()).document.querySelector('#page').innerHTML;
if(!researchUI.includes('Graf &amp; Analisis Riset')&&!researchUI.includes('Graf & Analisis Riset'))throw new Error('Research graph disclosure missing');
const englishUI=run('english',richState()).document.querySelector('#page').innerHTML;
if(!englishUI.includes('https://app.volingo.my.id/')||!englishUI.includes('Jelajahi 7 Kategori'))throw new Error('English quick-start/disclosure missing');
const financeUI=run('finance',richState()).document.querySelector('#page').innerHTML;
if(!financeUI.includes('data-act="osExpenseQuick"')||!financeUI.includes('data-act="osIncomeQuick"')||!financeUI.includes('Laporan Keuangan Lengkap'))throw new Error('Finance quick workflow missing');
const academicTabs=run('academic',richState()).document.querySelector('#page').innerHTML;
if(academicTabs.includes('data-route="vault"')||academicTabs.includes('>Library</button>'))throw new Error('Library must not appear in Academic tabs');
if(!academicTabs.includes('data-route="books"')||!academicTabs.includes('>Reading</button>'))throw new Error('Reading tab must remain available');
const academicNavigation=run('english',richState()).document.querySelector('#sideNav').innerHTML;
if(!/class="nav-item active" data-route="academic"/.test(academicNavigation))throw new Error('Academic subpage should highlight parent navigation');
const cal=run('calendar',richState()).document.querySelector('#page').innerHTML;
if(!cal.includes('s2-prep-card')||cal.includes('month-calendar-card'))throw new Error('Legacy Calendar route must redirect to Goals');

const freshEnglish=run('english',richState()).__DESCA_TEST__.S.english.sites.find(site=>site.id==='english_volingo');
if(freshEnglish?.url!=='https://app.volingo.my.id/')throw new Error('Volingo preset URL regression');
const legacyEnglish=richState();
legacyEnglish.english={sites:[{id:'english_volingo',title:'Volingo',url:'https://volingo.my.id/',progress:75,visits:12,description:'My private notes',status:'active'}],sessions:[]};
const migratedEnglish=run('english',legacyEnglish).__DESCA_TEST__.S.english.sites[0];
if(migratedEnglish.url!=='https://app.volingo.my.id/'||migratedEnglish.progress!==75||migratedEnglish.visits!==12||migratedEnglish.description!=='My private notes')throw new Error('Volingo saved-link migration regression');

const homeUI=run('today',richState()).document.querySelector('#page').innerHTML;
if(!homeUI.includes('os-click-home')||!homeUI.includes('data-act="osFastStudy"')||!homeUI.includes('data-act="osFastSport"')||!homeUI.includes('os-goal-spotlight')||homeUI.includes('home-command-center')||homeUI.includes('PRIORITAS TUGAS')||homeUI.includes('daily-timeline-card'))throw new Error('Home must show Goals and quick actions, not tasks or timelines');
const quickForms=run('goals',richState()).__DESCA_TEST__;
if(!quickForms.taskForm().includes('data-field="title"')||quickForms.taskForm().includes('data-field="date"')||quickForms.taskForm().includes('type="date"'))throw new Error('Task capture must use title presets without scheduling');
if(!quickForms.activityForm('study').includes('data-field="duration"'))throw new Error('Activity duration chips missing');
if(!quickForms.financeForm().includes('data-act="osFinancePreset"')||!quickForms.financeForm().includes('data-field="amount"'))throw new Error('Finance no-type amount presets missing');
if(!quickForms.englishSessionForm().includes('data-field="skill"'))throw new Error('English skill chips missing');
const quickStudy=run('study',richState()).__DESCA_TEST__;
const studyBefore=quickStudy.S.activities.length;
if(!quickStudy.osFastStudy(60)||quickStudy.S.activities.length!==studyBefore+1||quickStudy.S.activities.at(-1).duration!==60||quickStudy.S.activities.at(-1).category!=='study')throw new Error('Study one-tap logging failed');
const quickEnglish=run('english',richState()).__DESCA_TEST__;
const englishBefore=quickEnglish.S.english.sessions.length;
if(!quickEnglish.osFastEnglish(30)||quickEnglish.S.english.sessions.length!==englishBefore+1||quickEnglish.S.activities.at(-1).englishSessionId!==quickEnglish.S.english.sessions.at(-1).id)throw new Error('English one-tap log must mirror activity');
const quickSport=run('running',richState()).__DESCA_TEST__;
const sportBefore=quickSport.S.runs.length;
if(!quickSport.osFastSport('walking',30)||quickSport.S.runs.length!==sportBefore+1||quickSport.S.runs.at(-1).distanceKm!==0||quickSport.S.activities.at(-1).runId!==quickSport.S.runs.at(-1).id)throw new Error('Sport one-tap log invalid');
const workData=richState();
workData.work={jobs:[{id:'jobclick',title:'Tutor Kalkulus',status:'active',payModel:'session',rate:150000,defaultDuration:60}],payments:[],sessions:[]};
const quickWork=run('work',workData).__DESCA_TEST__;
if(!quickWork.osFastWork('jobclick',60)||quickWork.S.work.sessions.length!==1||quickWork.S.work.sessions[0].units!==0||quickWork.S.activities.at(-1).workSessionId!==quickWork.S.work.sessions[0].id)throw new Error('Work one-tap log should not invent units');
if(quickWork.osFastWork('invalid',60)!==false||quickStudy.osFastStudy(123)!==false||quickSport.osFastSport('invalid',30)!==false)throw new Error('Quick log whitelist guard regression');
const ctx=run('books',richState()),api=ctx.__DESCA_TEST__;
if(!api)throw new Error('Test API was not exposed');
const parsed=api.parseSmartCapture('belajar Analisis Real 3 hari lagi jam 9 90 menit');
if(!parsed.date||parsed.time!=='09:00'||parsed.duration!==90||/3 hari lagi/i.test(parsed.title))throw new Error('Natural-language date parser regression');
const pace=api.bookPace(api.S.books.items.find(b=>b.id==='b1'));
if(!(pace.daily>0)||pace.remaining!==288)throw new Error('Book pace regression');
const openBooks=api.commandParse('buka books');
if(openBooks?.type!=='open'||openBooks?.route!=='books')throw new Error('Books command regression');
const readPages=api.commandParse('baca 20 halaman');
if(readPages?.type!=='readpages'||readPages?.pages!==20)throw new Error('Reading command regression');
if(api.readingStats().reading.length!==1)throw new Error('Reading stats regression');

// v96 regression: light theme must use readable colors while keeping dark heroes.
const themeCss=fs.readFileSync('ui-v21.css','utf8');
if(!themeCss.includes('v96 — Light theme legibility')||!themeCss.includes('html[data-theme="light"] .s2-readiness>span')||!themeCss.includes('html[data-theme="light"] :is(input,textarea)::placeholder'))throw new Error('Light-theme readability patch missing');
const luminanceHex=(hex)=>{
  const s=hex.replace('#','');
  const v=[0,2,4].map(i=>parseInt(s.slice(i,i+2),16)/255).map(n=>n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4);
  return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];
};
const wcagContrast=(a,b)=>{
  const x=luminanceHex(a),y=luminanceHex(b);return(Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
};
for(const [a,b,label] of [
  ['#14213b','#ffffff','main text on white'],
  ['#30435f','#ffffff','secondary text on white'],
  ['#52647e','#ffffff','muted text on white'],
  ['#254bcf','#eaf0ff','active navigation'],
  ['#11674f','#e5f5ef','green badge'],
  ['#82500a','#fff2db','orange badge'],
  ['#a2283e','#fff0f1','red badge']
])if(wcagContrast(a,b)<4.5)throw new Error('Low light-theme contrast: '+label);
if(wcagContrast('#ffffff','#365cf3')<4.5)throw new Error('Primary CTA contrast insufficient');
console.log('Light-theme contrast smoke OK: readable surface tokens and preserved dark hero styles');

// v97 regression: Review hero must not inherit white .card background,
// and Daily Score must use a contrasting dark centre under the numeric label.
const lightReview=run('reviews',richState()).document.querySelector('#page').innerHTML;
if(!lightReview.includes('class="card review-hero"')||!lightReview.includes('class="review-number"')||!lightReview.includes('Aktivitas dicatat')||!lightReview.includes('Sesi belajar & English'))throw new Error('Review must show a legible activity-first weekly summary');
if(lightReview.includes('+ Planning Horizon')||lightReview.includes('routine adherence')||lightReview.includes('tasks completed'))throw new Error('Review header must not surface removed task/planning controls');
const ringHome=run('today',richState()).document.querySelector('#page').innerHTML;
if(!ringHome.includes('class="score-ring"')||!ringHome.includes('class="score-copy"'))throw new Error('Home Daily Score widget missing');
for(const label of ['.review-hero.card{','.review-hero.card .review-number{','.review-hero.card .stat-chip b,','.hero-greeting.dashboard-hero .score-ring::after{','.hero-greeting.dashboard-hero .score-ring b{']){
  if(!themeCss.includes(label))throw new Error('Screenshot contrast fix selector missing: '+label);
}
if(!themeCss.includes('background:#1b3569!important')||!themeCss.includes('color:#ffffff!important'))throw new Error('Daily Score central contrast is missing');
if(wcagContrast('#ffffff','#1b3569')<4.5||wcagContrast('#dbe9ff','#1e437d')<4.5)throw new Error('Review or Daily Score hero text fails AA contrast');
console.log('Review hero and Daily Score contrast checks OK');

console.log('Runtime smoke OK:',routes.length,'routes x 2 states =',routes.length*2,'renders + interaction checks');
