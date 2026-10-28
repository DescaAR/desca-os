/* Desca OS — SAT Resource Hub. No account or typing required. */
(function(){
'use strict';
const GROUPS=[
  {id:'featured',label:'Pilihan Utama'},
  {id:'all',label:'Semua Website'},
  {id:'official',label:'Resmi & Mitra'},
  {id:'learn',label:'Belajar Konsep'},
  {id:'questions',label:'Bank Soal'},
  {id:'mock',label:'Simulasi'},
  {id:'analysis',label:'Pembahasan'},
  {id:'saved',label:'Favorit'}
];
const SITES=[
  {id:'khan',name:'Khan Academy',url:'https://www.khanacademy.org/digital-sat',kind:'learn',official:true,featured:true,cost:'Gratis',skill:'Math · Reading & Writing',desc:'Kursus Digital SAT bertingkat: penjelasan konsep, video, dan latihan dari dasar hingga lanjut.',label:'Mulai dari dasar'},
  {id:'question-bank',name:'College Board Question Bank',url:'https://satsuite.collegeboard.org/practice/student-question-bank',kind:'questions',official:true,featured:true,cost:'Gratis',skill:'Math · Reading & Writing',desc:'Bank soal resmi yang bisa disaring berdasarkan domain, keterampilan, dan tingkat kesulitan.',label:'Latihan resmi'},
  {id:'bluebook',name:'Bluebook',url:'https://bluebook.collegeboard.org/students/practice',kind:'mock',official:true,featured:true,cost:'Gratis',skill:'Full-length Digital SAT',desc:'Aplikasi resmi untuk simulasi Digital SAT lengkap, termasuk pengalaman ujian adaptif.',label:'Simulasi resmi'},
  {id:'mypractice',name:'College Board My Practice',url:'https://mypractice.collegeboard.org/',kind:'analysis',official:true,cost:'Gratis',skill:'Analisis hasil',desc:'Tinjau hasil latihan Bluebook, pemetaan kemampuan, dan rekomendasi perbaikan.',label:'Evaluasi skor'},
  {id:'schoolhouse',name:'Schoolhouse.world',url:'https://schoolhouse.world/sat-bootcamp',kind:'learn',cost:'Gratis',skill:'Kelas kelompok',desc:'SAT Bootcamp dan sesi belajar kelompok kecil bersama tutor relawan, sesuai ketersediaan kelas.',label:'Belajar bersama'},
  {id:'qotd',name:'SAT Question of the Day',url:'https://qotd.collegeboard.org/',kind:'questions',official:true,cost:'Gratis',skill:'Latihan harian',desc:'Akses latihan satu soal per hari dari College Board; ketersediaan halaman dapat berubah.',label:'Soal singkat'},
  {id:'preparc',name:'PrepArc',url:'https://preparc.app/',kind:'questions',cost:'Gratis / fitur dapat berubah',skill:'Latihan bertopik',desc:'Latihan topik SAT, pembahasan soal, dan fitur latihan bergaya ujian.',label:'Latihan tambahan'},
  {id:'oneforall',name:'One for All SAT',url:'https://oneforallsat.com/',kind:'questions',cost:'Gratis / fitur dapat berubah',skill:'Math · English · Desmos',desc:'Kumpulan latihan matematika dan bahasa Inggris, serta pendekatan pemecahan dengan Desmos.',label:'Latihan tambahan'},
  {id:'kaplan',name:'Kaplan SAT',url:'https://www.kaptest.com/sat/free/sat-practice',kind:'mock',cost:'Sebagian gratis',skill:'Tryout · laporan skor',desc:'Latihan dan simulasi SAT dari penyedia persiapan ujian; sebagian program berbayar.',label:'Tryout tambahan'},
  {id:'1600io',name:'1600.io',url:'https://1600.io/',kind:'analysis',cost:'Sebagian gratis',skill:'SAT Math · Desmos',desc:'Pembahasan mendalam soal SAT Math, strategi, dan pemanfaatan kalkulator Desmos.',label:'Perdalam Math'}
];
const PATH=[
  {id:'concept',name:'01 · Pahami konsep',summary:'Pelajari Math serta Reading & Writing secara bertahap.',site:'Khan Academy',href:'https://www.khanacademy.org/digital-sat'},
  {id:'practice',name:'02 · Latihan per topik',summary:'Pilih domain dan tingkat kesulitan dari soal resmi.',site:'College Board Question Bank',href:'https://satsuite.collegeboard.org/practice/student-question-bank'},
  {id:'challenge',name:'03 · Perkuat soal sulit',summary:'Ulangi tipe soal yang sering salah dengan pembahasan tambahan.',site:'PrepArc · One for All SAT',href:'https://preparc.app/'},
  {id:'mock',name:'04 · Simulasi penuh',summary:'Kerjakan practice test Digital SAT dalam kondisi mirip ujian.',site:'Bluebook',href:'https://bluebook.collegeboard.org/students/practice'},
  {id:'review',name:'05 · Analisis dan ulangi',summary:'Lihat hasil, cari kelemahan, lalu kembali berlatih.',site:'My Practice',href:'https://mypractice.collegeboard.org/'}
];
function render({S,esc,head,filter}){
  const settings=S.settings||{},stars=new Set(Array.isArray(settings.satFavorites)?settings.satFavorites:[]);
  const done=new Set(Array.isArray(settings.satStepsDone)?settings.satStepsDone:[]);
  const selected=GROUPS.some(g=>g.id===filter)?filter:'featured';
  const visible=SITES.filter(site=>selected==='featured'?site.featured:selected==='all'?true:selected==='saved'?stars.has(site.id):selected==='official'?site.official:selected==='learn'?site.kind==='learn':site.kind===selected);
  const cards=visible.length?visible.map(site=>{
    const marked=stars.has(site.id),type={learn:'Belajar',questions:'Bank Soal',mock:'Simulasi',analysis:'Analisis'}[site.kind]||'Referensi';
    return '<article class="sat-site-card"><div class="sat-site-top"><span class="sat-site-avatar" aria-hidden="true">'+esc(site.name.slice(0,1))+'</span><button type="button" class="sat-star '+(marked?'active':'')+'" data-act="satStar" data-id="'+esc(site.id)+'" aria-label="'+esc(marked?'Hapus favorit '+site.name:'Favoritkan '+site.name)+'" aria-pressed="'+marked+'">'+(marked?'★':'☆')+'</button></div>'
      +'<h3>'+esc(site.name)+'</h3><div class="sat-tags"><span>'+esc(type)+'</span>'+(site.official?'<span class="sat-official">Resmi / Mitra</span>':'')+'</div><p>'+esc(site.desc)+'</p><div class="sat-skill">'+esc(site.skill)+'</div><div class="sat-site-bottom"><span>'+esc(site.cost)+'</span><a href="'+esc(site.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Buka '+esc(site.name)+' di tab baru">Buka website ↗</a></div></article>';
  }).join(''):'<div class="sat-empty"><b>Belum ada website favorit.</b><p>Tekan ☆ di kartu website untuk menyimpannya di sini.</p><button type="button" class="sat-chip" data-act="satFilter" data-filter="featured">Lihat pilihan utama</button></div>';
  const stages=PATH.map(step=>{
    const checked=done.has(step.id);
    return '<div class="sat-stage '+(checked?'is-done':'')+'"><button type="button" class="sat-step-check" data-act="satStep" data-id="'+esc(step.id)+'" aria-pressed="'+checked+'" aria-label="'+esc(checked?'Batalkan selesai: '+step.name:'Tandai selesai: '+step.name)+'">'+(checked?'✓':'○')+'</button><div class="sat-stage-copy"><h3>'+esc(step.name)+'</h3><p>'+esc(step.summary)+'</p><a href="'+esc(step.href)+'" target="_blank" rel="noopener noreferrer">'+esc(step.site)+' ↗</a></div></div>';
  }).join('');
  return head('SAT','Semua sumber Digital SAT dalam satu halaman. Pilih kategori dan langsung buka website — tanpa input manual.')
    +'<section class="sat-hero"><div class="sat-hero-main"><span class="sat-overline">DIGITAL SAT · RESOURCE HUB</span><h2>Belajar. Berlatih. Evaluasi.</h2><p>10 website untuk memahami konsep, melatih kemampuan, mengikuti simulasi resmi, dan menganalisis hasil. Mulai dari tiga pilihan utama sebelum mencoba sumber tambahan.</p><div class="sat-hero-actions"><a href="https://www.khanacademy.org/digital-sat" target="_blank" rel="noopener noreferrer">Mulai belajar ↗</a><a href="https://bluebook.collegeboard.org/students/practice" target="_blank" rel="noopener noreferrer">Buka simulasi ↗</a></div></div><div class="sat-hero-numbers"><div><strong>10</strong><span>Website SAT</span></div><div><strong>3</strong><span>Rekomendasi utama</span></div><div><strong>'+stars.size+'</strong><span>Favorit tersimpan</span></div></div></section>'
    +'<section class="sat-exam"><div class="sat-exam-heading"><div><span class="sat-overline">EXAM OVERVIEW</span><h2>Format Digital SAT</h2></div><span class="sat-score">Total skor 400–1600</span></div><div class="sat-exam-grid"><article><div><span>SECTION 01</span><b>Math</b></div><strong>200–800</strong><p>44 soal · 70 menit</p><small>Algebra · Advanced Math · Problem-Solving & Data Analysis · Geometry & Trigonometry</small></article><article><div><span>SECTION 02</span><b>Reading & Writing</b></div><strong>200–800</strong><p>54 soal · 64 menit</p><small>Information & Ideas · Craft & Structure · Expression of Ideas · Standard English Conventions</small></article></div></section>'
    +'<section class="sat-library"><div class="sat-section-heading"><div><span class="sat-overline">SAT TOOLKIT</span><h2>Website untuk Belajar SAT</h2><p>Tiga website utama: Khan Academy, College Board Question Bank, dan Bluebook.</p></div></div><div class="sat-filter-bar" aria-label="Filter sumber SAT">'+GROUPS.map(g=>'<button type="button" class="sat-chip '+(g.id===selected?'active':'')+'" data-act="satFilter" data-filter="'+esc(g.id)+'" aria-pressed="'+(g.id===selected?'true':'false')+'">'+esc(g.label)+(g.id==='all'?' <small>10</small>':g.id==='saved'?' <small>'+stars.size+'</small>':'')+'</button>').join('')+'</div><div class="sat-library-meta"><strong>'+esc(GROUPS.find(x=>x.id===selected).label)+'</strong><span>'+visible.length+' website</span></div><div class="sat-site-grid">'+cards+'</div></section>'
    +'<section class="sat-roadmap"><div class="sat-roadmap-head"><div><span class="sat-overline">5-STEP LEARNING PATH</span><h2>Urutan Belajar yang Disarankan</h2><p>Centang tahapan dengan sekali klik; progres tersimpan di perangkat ini.</p></div><div class="sat-roadmap-progress"><strong>'+done.size+'/5</strong><span>Tahap selesai</span></div></div><div class="sat-progress-track"><span style="width:'+(Math.min(done.size,5)*20)+'%"></span></div><div class="sat-stages">'+stages+'</div></section>'
    +'<aside class="sat-footnote"><b>Catatan:</b> SAT umumnya untuk seleksi masuk S1. Untuk persiapan S2 Matematika, periksa persyaratan program tujuan—misalnya GRE dan IELTS/TOEFL. Ketersediaan fitur gratis pihak ketiga dapat berubah; Bluebook adalah pilihan simulasi resmi.</aside>';
}
globalThis.DescaSatHub={render,sites:SITES,groups:GROUPS,steps:PATH};
})();