const fs=require('fs');
const vm=require('vm');
const app=fs.readFileSync('app.js','utf8');
const instrumented=app.replace(/\}\)\(\);\s*$/,`globalThis.__DESCA_TEST__={S,bookPace,parseSmartCapture,commandParse,readingStats};})();`);
const routes=['today','inbox','tasks','calendar','deadlines','goals','academic','study','research','projects','dmath','vault','life','quran','books','running','health','finance','journal','progress','timeline','analytics','reviews','notifications','recovery','settings'];

function element(){
  return {
    innerHTML:'',textContent:'',value:'',hidden:false,title:'',dataset:{},files:[],tagName:'DIV',options:[],selectedIndex:0,nextElementSibling:null,
    style:{setProperty(){},removeProperty(){},width:''},
    classList:{add(){},remove(){},toggle(){},contains(){return false}},
    setAttribute(){},getAttribute(){return null},removeAttribute(){},
    querySelector(){return element()},querySelectorAll(){return []},
    addEventListener(){},removeEventListener(){},focus(){},closest(){return null},
    appendChild(){},remove(){},click(){},scrollIntoView(){},getContext(){return null}
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
console.log('Runtime smoke OK:',routes.length,'routes x 2 states =',routes.length*2,'renders + interaction checks');
