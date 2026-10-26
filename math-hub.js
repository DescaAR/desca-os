/* Desca OS Mathematics Hub — curated from user's learning/research reference list. */
const MATH_RESOURCE_GROUPS=[
  {id:'featured',label:'Pilihan Utama'},
  {id:'all',label:'Semua'},
  {id:'foundation',label:'S1–S2'},
  {id:'advanced',label:'S2–S3'},
  {id:'research',label:'Riset'},
  {id:'computing',label:'Komputasi'},
  {id:'ai',label:'AI'},
  {id:'saved',label:'Favorit'}
];
const MATH_LEARNING_PATH=[
  {title:'S1 Lanjutan',focus:'Analisis Riil, Struktur Aljabar, Topologi Dasar, Teori Graf',sources:'MIT OCW · LibreTexts',filter:'foundation'},
  {title:'S2 Awal',focus:'Teori Ukuran, Analisis Fungsional, Topologi Lanjutan, Teori Graf Spektral',sources:'MIT OCW · Hatcher · Spielman',filter:'advanced'},
  {title:'S2 Lanjut',focus:'Teori Kategori, Topologi Aljabar, Metode Penelitian Matematika',sources:'nLab · Hatcher · Mathematics in Lean',filter:'advanced'},
  {title:'Awal S3',focus:'Telaah paper spesialis dan pencarian masalah penelitian',sources:'arXiv · zbMATH Open',filter:'research'},
  {title:'Riset S3',focus:'Mengembangkan teorema, menguji konjektur, dan membangun pembuktian orisinal',sources:'arXiv · MathOverflow · SageMath · Lean',filter:'research'}
];
const MATH_RESOURCES=[
  {id:'mit',name:'MIT OpenCourseWare',url:'https://ocw.mit.edu/',group:'foundation',level:'S1–S2',tag:'Kuliah',desc:'Materi perkuliahan analisis riil, aljabar, topologi, PDE, kombinatorika, termasuk kursus pascasarjana.',featured:true},
  {id:'libretexts',name:'Mathematics LibreTexts',url:'https://math.libretexts.org/',group:'foundation',level:'S1–S2',tag:'Buku Terbuka',desc:'Buku teks, pembuktian, latihan, analisis, dan aljabar sebagai pendamping kuliah.',featured:true},
  {id:'openlogic',name:'Open Logic Project',url:'https://openlogicproject.org/',group:'foundation',level:'S1–S2',tag:'Logika',desc:'Logika matematika, teori himpunan, teori model, dan komputabilitas.'},
  {id:'aim',name:'AIM Open Textbook Initiative',url:'https://textbooks.aimath.org/',group:'foundation',level:'S1–S2',tag:'Buku Terbuka',desc:'Koleksi buku matematika terbuka, termasuk pembuktian dan matematika diskrit.'},
  {id:'proofwiki',name:'ProofWiki',url:'https://proofwiki.org/',group:'foundation',level:'S1–S2',tag:'Pembuktian',desc:'Ensiklopedia referensi definisi, teorema, lemma, serta pembuktiannya.',featured:true},
  {id:'3b1b',name:'3Blue1Brown',url:'https://www.3blue1brown.com/',group:'foundation',level:'S1–S2',tag:'Visualisasi',desc:'Visualisasi intuitif aljabar linear, kalkulus, dan konsep matematika abstrak.'},
  {id:'hatcher',name:'Allen Hatcher — Algebraic Topology',url:'https://pi.math.cornell.edu/~hatcher/',group:'advanced',level:'S2–S3',tag:'Topologi Aljabar',desc:'Buku dan catatan tentang fundamental group, homology, cohomology, dan homotopy theory.',featured:true},
  {id:'spielman',name:'Spectral and Algebraic Graph Theory — Spielman',url:'https://cs-www.cs.yale.edu/homes/spielman/sagt/',group:'advanced',level:'S2–S3',tag:'Teori Graf',desc:'Buku tentang spektrum graf, Laplacian, aljabar linear, dan metode spektral.',featured:true},
  {id:'stacks',name:'The Stacks Project',url:'https://stacks.math.columbia.edu/',group:'advanced',level:'S3 / Riset',tag:'Geometri Aljabar',desc:'Referensi schemes, sheaves, algebraic spaces, dan algebraic stacks; memerlukan fondasi aljabar kuat.'},
  {id:'nlab',name:'nLab',url:'https://ncatlab.org/nlab/show/HomePage',group:'advanced',level:'S2–S3',tag:'Higher Structures',desc:'Referensi kolaboratif teori kategori, topologi, homotopy theory, dan struktur abstrak.',featured:true},
  {id:'lean',name:'Mathematics in Lean',url:'https://leanprover-community.github.io/mathematics_in_lean/',group:'advanced',level:'S1 / Riset',tag:'Formal Proof',desc:'Belajar menulis pembuktian dengan Lean 4 untuk logika, himpunan, aljabar, topologi, dan teori ukuran.'},
  {id:'arxiv',name:'arXiv Mathematics',url:'https://arxiv.org/archive/math',group:'research',level:'Riset',tag:'Preprint',desc:'Membaca preprint matematika terbaru; setiap pembuktian dan status peer review perlu diperiksa.',featured:true},
  {id:'zbmath',name:'zbMATH Open',url:'https://zbmath.org/',group:'research',level:'Riset',tag:'Bibliografi',desc:'Telusuri publikasi, klasifikasi bidang matematika, referensi, dan literatur terkait.',featured:true},
  {id:'mathoverflow',name:'MathOverflow',url:'https://mathoverflow.net/',group:'research',level:'Riset',tag:'Tanya Peneliti',desc:'Forum pertanyaan dan jawaban untuk persoalan matematika tingkat penelitian.',featured:true},
  {id:'mathse',name:'Mathematics Stack Exchange',url:'https://math.stackexchange.com/',group:'research',level:'S1 / Riset',tag:'Diskusi',desc:'Diskusi pembuktian, teorema, dan persoalan matematika dari dasar hingga lanjut.'},
  {id:'openalex',name:'OpenAlex',url:'https://openalex.org/',group:'research',level:'Riset',tag:'Literatur Ilmiah',desc:'Temukan publikasi, penulis, dan keterhubungan antarpublikasi.'},
  {id:'sagecell',name:'SageMathCell',url:'https://sagecell.sagemath.org/',group:'computing',level:'S1 / Riset',tag:'Browser Tool',desc:'Uji contoh matematika melalui komputasi simbolik, matriks, aljabar, dan eksplorasi objek di browser.',featured:true},
  {id:'sagemath',name:'SageMath',url:'https://www.sagemath.org/',group:'computing',level:'S1 / Riset',tag:'Open Source',desc:'Sistem komputasi matematika open-source untuk perhitungan dan eksperimen matematis.'},
  {id:'networkx',name:'NetworkX',url:'https://networkx.org/',group:'computing',level:'S1 / Riset',tag:'Python & Graf',desc:'Eksperimen graf, algoritma graf, dan analisis jaringan menggunakan Python.'},
  {id:'mathlib',name:'Mathlib',url:'https://leanprover-community.github.io/mathlib4_docs/',group:'computing',level:'S1 / Riset',tag:'Lean Library',desc:'Pustaka matematika formal untuk Lean 4 dan pembuktian terverifikasi.'},
  {id:'chatgpt',name:'ChatGPT',url:'https://chatgpt.com/',group:'ai',level:'Pendamping',tag:'Tutor AI',desc:'Bantu merekonstruksi bukti, mencari counterexample, dan menyusun latihan bertingkat.'},
  {id:'gemini',name:'Gemini',url:'https://gemini.google.com/',group:'ai',level:'Pendamping',tag:'Second Opinion',desc:'Bandingkan pendekatan dan kritik pembuktian; jangan jadikan persetujuan dua AI sebagai bukti.'}
];
let mathFilter='featured';

function mathPage(){
  const saved=new Set(Array.isArray(S.settings.mathFavorites)?S.settings.mathFavorites:[]);
  const groups=MATH_RESOURCE_GROUPS;
  const selected=groups.some(x=>x.id===mathFilter)?mathFilter:'featured';
  const shown=MATH_RESOURCES.filter(x=>selected==='featured'?x.featured:selected==='all'?true:selected==='saved'?saved.has(x.id):x.group===selected);
  const heading=groups.find(x=>x.id===selected)?.label||'Pilihan Utama';
  const list=shown.length?shown.map(x=>{
    const category=groups.find(y=>y.id===x.group)?.label||x.group,star=saved.has(x.id);
    return'<article class="math-resource-card"><div class="math-resource-top"><span class="math-resource-mark" aria-hidden="true">'+esc(x.name.slice(0,1))+'</span><button type="button" class="math-star '+(star?'active':'')+'" data-act="mathStar" data-id="'+esc(x.id)+'" aria-label="'+(star?'Hapus '+esc(x.name)+' dari favorit':'Simpan '+esc(x.name)+' ke favorit')+'" aria-pressed="'+(star?'true':'false')+'" title="'+(star?'Hapus favorit':'Tambah favorit')+'">'+(star?'★':'☆')+'</button></div><h3>'+esc(x.name)+'</h3><div class="math-resource-tags"><span>'+esc(category)+'</span><span>'+esc(x.level)+'</span></div><p>'+esc(x.desc)+'</p><div class="math-resource-foot"><span>'+esc(x.tag)+'</span><a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Buka '+esc(x.name)+' di tab baru">Buka situs <span aria-hidden="true">↗</span></a></div></article>'
  }).join(''):'<div class="math-empty"><div class="math-empty-icon">☆</div><h3>Belum ada website favorit</h3><p>Klik ikon bintang pada website yang ingin kamu akses lebih cepat.</p><button type="button" class="btn btn-secondary" data-act="mathFilter" data-filter="featured">Lihat Pilihan Utama</button></div>';
  $('#page').innerHTML=head('Matematika','Pusat referensi gratis dari S1 hingga riset S3. Cukup pilih kategori lalu buka sumbernya.','<button class="btn btn-secondary" data-route="study">▣ Catat Belajar</button>')
    +'<section class="math-hero"><div class="math-hero-main"><div class="math-eyebrow">MATHEMATICS · LEARNING & RESEARCH</div><h2>Dari konsep menuju pembuktian.</h2><p>Perkuliahan, buku, teorema, publikasi, dan komputasi dalam satu halaman. Referensi untuk membangun fondasi dan membaca matematika tingkat lanjut.</p><div class="math-hero-note">Teori <span>→</span> Problem Solving <span>→</span> Penelitian</div></div><div class="math-hero-stats"><div><strong>'+MATH_RESOURCES.length+'</strong><span>Website & tools</span></div><div><strong>'+MATH_RESOURCES.filter(x=>x.featured).length+'</strong><span>Referensi utama</span></div><div><strong>'+saved.size+'</strong><span>Favoritmu</span></div></div></section>'
    +'<section class="math-library" aria-label="Sumber matematika"><div class="math-section-head"><div><div class="math-eyebrow">YOUR MATH LIBRARY</div><h2>Jelajahi Referensi</h2><p>Pilihan Utama berisi 10 website rekomendasi. Semua referensi akademik terbuka, dengan batas penggunaan tertentu pada layanan AI.</p></div></div>'
    +'<div class="math-filter-bar" aria-label="Filter referensi matematika">'+groups.map(g=>'<button type="button" class="math-filter '+(g.id===selected?'active':'')+'" data-act="mathFilter" data-filter="'+g.id+'" aria-pressed="'+(g.id===selected?'true':'false')+'">'+esc(g.label)+(g.id==='all'?' <span>'+MATH_RESOURCES.length+'</span>':g.id==='saved'?' <span>'+saved.size+'</span>':'')+'</button>').join('')+'</div>'
    +'<div class="math-library-meta"><b>'+esc(heading)+'</b><span>'+shown.length+' sumber</span></div><div class="math-resource-grid">'+list+'</div></section>'
    +'<details class="math-learning-path" id="mathLearningPath"><summary><span><span class="math-eyebrow">LEARNING ROADMAP</span><b>Jalur Belajar S1 → S2 → S3</b><small>Lima tahap penguasaan materi, bukan batas kaku jenjang kuliah</small></span><span class="math-disclosure-icon" aria-hidden="true">⌄</span></summary><div class="math-path-body">'+MATH_LEARNING_PATH.map((step,i)=>'<div class="math-path-step"><span class="math-path-index">0'+(i+1)+'</span><div><h3>'+esc(step.title)+'</h3><p>'+esc(step.focus)+'</p><small>'+esc(step.sources)+'</small></div><button type="button" data-act="mathFilter" data-filter="'+step.filter+'" class="math-path-open">Lihat sumber ↗</button></div>').join('')+'</div></details>'
    +'<div class="math-disclaimer"><span aria-hidden="true">ⓘ</span><p><b>Catatan riset:</b> preprint arXiv belum tentu melalui peer review. AI dapat keliru meskipun jawabannya sama. Verifikasi teorema dan bukti melalui sumber primer, penelaahan mandiri, dan bila perlu Lean atau komputasi kasus khusus.</p></div>';
}
