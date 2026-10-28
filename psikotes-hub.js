/* Desca OS — Psikotes Hub: curated aptitude test resource directory. */
(function(){
'use strict';
const GROUPS=[
 {id:'featured',label:'Pilihan Utama'},
 {id:'all',label:'Semua (10)'},
 {id:'indonesia',label:'Indonesia'},
 {id:'international',label:'Internasional'},
 {id:'numerik',label:'Numerik'},
 {id:'verbal',label:'Verbal'},
 {id:'logika',label:'Logika'},
 {id:'figural',label:'Figural'},
 {id:'kraepelin',label:'Kraepelin & Pauli'},
 {id:'ketelitian',label:'Ketelitian'},
 {id:'kepribadian',label:'Kepribadian'},
 {id:'tryout',label:'Simulasi'},
 {id:'saved',label:'Favorit'}
];
const SITES=[
 {id:'simulasi',name:'Simulasi Psikotes',url:'https://pramudya-yb.github.io/psychotest-simulation/',region:'indonesia',topics:['numerik','verbal','logika','figural','kepribadian','tryout'],access:'Gratis · tanpa login',tag:'Simulasi cepat',desc:'Simulasi penalaran numerik, verbal, logika, figural, dan gaya kerja. Cocok untuk mengenali jenis soal.'},
 {id:'psikoteskerja',name:'Psikotes Kerja',url:'https://psikoteskerja.id/',region:'indonesia',topics:['numerik','logika','kraepelin','kepribadian','tryout'],access:'Gratis terbatas + berbayar',tag:'Latihan kerja',desc:'Materi TIU, Kraepelin, Pauli, Wartegg, PAPI Kostick, dan simulasi psikotes kerja.'},
 {id:'sikotesku',name:'Sikotesku',url:'https://sikotesku.com/landing',region:'indonesia',topics:['numerik','logika','figural','kraepelin','ketelitian'],access:'Latihan awal gratis',tag:'Hitung cepat',desc:'Latihan Kraepelin, matematika dasar, TIU/CFIT, serta tes kecermatan dan konsentrasi.',featured:true},
 {id:'matchupskills',name:'MatchupSkills',url:'https://www.matchupskills.id/belajar/psikotes-online-gratis',region:'indonesia',topics:['kraepelin','ketelitian','kepribadian'],access:'Gratis dengan akun',tag:'Konsentrasi',desc:'Latihan simbol hilang, kecermatan, Kraepelin, dan tes kepribadian dengan opsi mengulang.'},
 {id:'jadibumn',name:'JadiBUMN',url:'https://app.jadibumn.id/tryout-bumn',region:'indonesia',topics:['numerik','verbal','logika','tryout'],access:'Gratis terbatas + berbayar',tag:'Persiapan BUMN',desc:'Tryout TKD, psikotes, learning agility, dan simulasi seleksi rekrutmen BUMN.'},
 {id:'123test',name:'123test',url:'https://www.123test.com/',region:'international',topics:['numerik','verbal','logika','figural','kepribadian','tryout'],access:'Ada tes gratis',tag:'Pola & abstrak',desc:'Aptitude, abstract reasoning, tes pola, dan asesmen kepribadian dengan penjelasan hasil.',featured:true},
 {id:'practiceaptitude',name:'Practice Aptitude Tests',url:'https://www.practiceaptitudetests.com/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Tes gratis tersedia',tag:'Penalaran profesional',desc:'Latihan numerical, verbal, logical, abstract, cognitive ability, dan situational judgement.',featured:true},
 {id:'assessmentday',name:'AssessmentDay',url:'https://www.assessmentday.com/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Gratis terbatas + premium',tag:'Soal menantang',desc:'Tes numerical, verbal, inductive, deductive, spatial reasoning, dan critical thinking.'},
 {id:'shl',name:'SHL Practice Tests',url:'https://www.shl.com/shldirect/en/practice-tests/',region:'international',topics:['numerik','verbal','logika','figural','tryout'],access:'Latihan gratis',tag:'Asesmen rekrutmen',desc:'Latihan contoh tes kemampuan dan pengenalan format asesmen kerja profesional.'},
 {id:'psychometricsuccess',name:'Psychometric Success',url:'https://psychometric-success.com/',region:'international',topics:['numerik','verbal','logika','figural'],access:'Latihan gratis + opsi berbayar',tag:'Panduan & latihan',desc:'Panduan, soal, dan pembahasan numerical, verbal, diagrammatic, spatial, dan mechanical reasoning.'}
];
const TOPICS=[
 {id:'numerik',label:'Numerik',caption:'Aritmetika, rasio, grafik, dan data',sites:'Practice Aptitude Tests · AssessmentDay'},
 {id:'verbal',label:'Verbal',caption:'Pemahaman bacaan dan kesimpulan',sites:'Practice Aptitude Tests · Psychometric Success'},
 {id:'logika',label:'Logika',caption:'Silogisme dan penalaran deduktif',sites:'123test · SHL'},
 {id:'figural',label:'Figural',caption:'Pola gambar dan penalaran abstrak',sites:'123test · AssessmentDay'},
 {id:'kraepelin',label:'Kraepelin & Pauli',caption:'Kecepatan berhitung berulang',sites:'Sikotesku · MatchupSkills'},
 {id:'ketelitian',label:'Ketelitian',caption:'Konsentrasi, simbol, dan kecermatan',sites:'MatchupSkills · Sikotesku'},
 {id:'kepribadian',label:'Kepribadian',caption:'Gaya kerja dan preferensi perilaku',sites:'Psikotes Kerja · 123test'},
 {id:'tryout',label:'Simulasi lengkap',caption:'Latihan dengan waktu dan evaluasi',sites:'Simulasi Psikotes · SHL'}
];
const PATH=[
 {id:'orientasi',label:'01 · Kenali pola soal',text:'Coba numerik, verbal, logika, dan figural sebelum memilih fokus.',site:'123test + Simulasi Psikotes',url:'https://www.123test.com/'},
 {id:'penalaran',label:'02 · Perkuat penalaran',text:'Latih soal lebih menantang dengan pembahasan dan evaluasi kesalahan.',site:'Practice Aptitude Tests',url:'https://www.practiceaptitudetests.com/'},
 {id:'ketelitian',label:'03 · Tingkatkan kecepatan',text:'Berlatih Kraepelin, Pauli, serta tugas kecermatan dengan durasi terbatas.',site:'Sikotesku',url:'https://sikotesku.com/landing'},
 {id:'simulasi',label:'04 · Kerjakan simulasi',text:'Kerjakan tryout sesuai konteks seleksi, lalu pelajari bagian yang lemah.',site:'Psikotes Kerja / SHL',url:'https://psikoteskerja.id/'}
];
function render({S,esc,head,filter}){
 const prefs=S.settings||{},stars=new Set(Array.isArray(prefs.psikotesFavorites)?prefs.psikotesFavorites:[]),done=new Set(Array.isArray(prefs.psikotesStepsDone)?prefs.psikotesStepsDone:[]);
 const chosen=GROUPS.some(g=>g.id===filter)?filter:'featured';
 const visible=SITES.filter(s=>chosen==='featured'?s.featured:chosen==='all'?true:chosen==='saved'?stars.has(s.id):chosen==='indonesia'||chosen==='international'?s.region===chosen:s.topics.includes(chosen));
 const label=GROUPS.find(g=>g.id===chosen).label;
 const cards=visible.length?visible.map(s=>{
  const star=stars.has(s.id);
  return '<article class="psy-site"><div class="psy-site-top"><span class="psy-mark" aria-hidden="true">'+esc(s.name.slice(0,1))+'</span><button type="button" class="psy-star '+(star?'selected':'')+'" data-act="psikotesStar" data-id="'+esc(s.id)+'" aria-label="'+esc(star?'Hapus favorit '+s.name:'Tambahkan favorit '+s.name)+'" aria-pressed="'+star+'">'+(star?'★':'☆')+'</button></div>'
    +'<h3>'+esc(s.name)+'</h3><div class="psy-tags"><span>'+esc(s.region==='indonesia'?'Bahasa Indonesia':'English')+'</span><span>'+esc(s.tag)+'</span></div><p>'+esc(s.desc)+'</p><div class="psy-caps">'+s.topics.slice(0,4).map(t=>'<span>'+esc(TOPICS.find(y=>y.id===t)?.label||t)+'</span>').join('')+'</div><div class="psy-site-bottom"><small>'+esc(s.access)+'</small><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Buka '+esc(s.name)+' di tab baru">Buka situs ↗</a></div></article>';
 }).join(''):'<div class="psy-empty"><strong>Belum ada website favorit</strong><p>Tekan ikon bintang pada website untuk menyimpannya.</p><button type="button" class="psy-filter" data-act="psikotesFilter" data-filter="featured">Lihat rekomendasi</button></div>';
 const roadmap=PATH.map(step=>{
  const checked=done.has(step.id);
  return '<div class="psy-stage '+(checked?'done':'')+'"><button type="button" class="psy-step-check" data-act="psikotesStep" data-id="'+esc(step.id)+'" aria-pressed="'+checked+'" aria-label="'+esc(checked?'Batalkan '+step.label:'Tandai selesai '+step.label)+'">'+(checked?'✓':'○')+'</button><div><h3>'+esc(step.label)+'</h3><p>'+esc(step.text)+'</p><a href="'+esc(step.url)+'" target="_blank" rel="noopener noreferrer">'+esc(step.site)+' ↗</a></div></div>';
 }).join('');
 return head('Psikotes','Kumpulan latihan psikotes kerja, BUMN, dan kemampuan umum — pilih kategori lalu buka sumber tanpa mengetik.')
  +'<section class="psy-hero"><div class="psy-hero-copy"><span class="psy-kicker">APTITUDE · REASONING · ASSESSMENT</span><h2>Latihan lebih terarah.</h2><p>10 website untuk kemampuan numerik, verbal, logika, figural, Kraepelin, kecermatan, dan simulasi psikotes. Gunakan tiga sumber utama sebagai titik awal.</p><div class="psy-hero-actions"><a href="https://pramudya-yb.github.io/psychotest-simulation/" target="_blank" rel="noopener noreferrer">Coba simulasi ↗</a><a href="https://www.practiceaptitudetests.com/" target="_blank" rel="noopener noreferrer">Latihan penalaran ↗</a></div></div><div class="psy-hero-metrics"><div><strong>10</strong><span>Website</span></div><div><strong>8</strong><span>Jenis latihan</span></div><div><strong>'+stars.size+'</strong><span>Favorit</span></div></div></section>'
  +'<section class="psy-library"><div class="psy-section-head"><div><span class="psy-kicker">RESOURCE COLLECTION</span><h2>Website Psikotes</h2><p>Pilihan awal: Practice Aptitude Tests, 123test, dan Sikotesku.</p></div></div><div class="psy-filter-wrap"><div class="psy-filter-bar" aria-label="Filter website psikotes">'+GROUPS.map(g=>'<button type="button" class="psy-filter '+(chosen===g.id?'active':'')+'" data-act="psikotesFilter" data-filter="'+esc(g.id)+'" aria-pressed="'+(chosen===g.id)+'">'+esc(g.label)+(g.id==='saved'?' <span>'+stars.size+'</span>':'')+'</button>').join('')+'</div></div><div class="psy-list-meta"><strong>'+esc(label)+'</strong><span>'+visible.length+' website</span></div><div class="psy-grid">'+cards+'</div></section>'
  +'<section class="psy-topic-section"><div class="psy-section-head"><div><span class="psy-kicker">QUICK PRACTICE</span><h2>Pilih berdasarkan jenis tes</h2><p>Sekali klik untuk melihat website yang menyediakan latihan terkait.</p></div></div><div class="psy-topic-grid">'+TOPICS.map(t=>'<button type="button" class="psy-topic" data-act="psikotesFilter" data-filter="'+esc(t.id)+'"><span class="psy-topic-arrow" aria-hidden="true">↗</span><b>'+esc(t.label)+'</b><small>'+esc(t.caption)+'</small><span>'+esc(t.sites)+'</span></button>').join('')+'</div></section>'
  +'<section class="psy-roadmap"><div class="psy-roadmap-heading"><div><span class="psy-kicker">LEARNING PATH</span><h2>4 Tahap Belajar Psikotes</h2><p>Centang tahapan yang sudah dijalankan. Tidak memerlukan jadwal atau target tanggal.</p></div><div class="psy-roadmap-counter"><strong>'+done.size+'/4</strong><small>Selesai</small></div></div><div class="psy-progress"><span style="width:'+Math.min(done.size,4)*25+'%"></span></div><div class="psy-stage-grid">'+roadmap+'</div></section>'
  +'<aside class="psy-note"><b>Catatan:</b> Hasil latihan dan tes kepribadian pada website pihak ketiga bukan diagnosis psikologis atau jaminan hasil seleksi. Paket gratis, kebutuhan akun, dan fitur masing-masing layanan dapat berubah.</aside>';
}
globalThis.DescaPsikotesHub={render,sites:SITES,groups:GROUPS,topics:TOPICS,steps:PATH};
})();
