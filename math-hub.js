/* Desca OS Mathematics Hub — curated from user's learning/research reference list. */
const MATH_RESOURCE_GROUPS=[
  {id:'featured',label:'Editor’s Picks'},
  {id:'all',label:'All Resources'},
  {id:'foundation',label:'S1–S2'},
  {id:'advanced',label:'S2–S3'},
  {id:'research',label:'Research'},
  {id:'computing',label:'Computational Mathematics'},
  {id:'ai',label:'AI'},
  {id:'saved',label:'Favourites'}
];
const MATH_LEARNING_PATH=[
  {title:'Advanced Undergraduate',focus:'Real Analysis, Algebraic Structures, Elementary Topology, Graph Theory',sources:'MIT OCW · LibreTexts',filter:'foundation'},
  {title:'Early Postgraduate',focus:'Measure Theory, Functional Analysis, Advanced Topology, Spectral Graph Theory',sources:'MIT OCW · Hatcher · Spielman',filter:'advanced'},
  {title:'Advanced Postgraduate',focus:'Category Theory, Algebraic Topology, Mathematical Research Methods',sources:'nLab · Hatcher · Mathematics in Lean',filter:'advanced'},
  {title:'Early Doctoral Study',focus:'Critical appraisal of specialised literature and identification of viable research questions',sources:'arXiv · zbMATH Open',filter:'research'},
  {title:'Doctoral Research',focus:'Formulate theorems, investigate conjectures, and develop original rigorous proofs',sources:'arXiv · MathOverflow · SageMath · Lean',filter:'research'}
];
const MATH_RESOURCES=[
  {id:'mit',name:'MIT OpenCourseWare',url:'https://ocw.mit.edu/',group:'foundation',level:'S1–S2',tag:'University Lectures',desc:'Undergraduate and graduate lecture materials spanning real analysis, algebra, topology, partial differential equations, and combinatorics.',featured:true},
  {id:'libretexts',name:'Mathematics LibreTexts',url:'https://math.libretexts.org/',group:'foundation',level:'S1–S2',tag:'Open Textbook',desc:'Open textbooks, rigorous proofs, worked exercises, and supplementary material in analysis and algebra.',featured:true},
  {id:'openlogic',name:'Open Logic Project',url:'https://openlogicproject.org/',group:'foundation',level:'S1–S2',tag:'Mathematical Logic',desc:'A systematic treatment of mathematical logic, set theory, model theory, and computability.'},
  {id:'aim',name:'AIM Open Textbook Initiative',url:'https://textbooks.aimath.org/',group:'foundation',level:'S1–S2',tag:'Open Textbook',desc:'A curated collection of open mathematics textbooks, including proof techniques and discrete mathematics.'},
  {id:'proofwiki',name:'ProofWiki',url:'https://proofwiki.org/',group:'foundation',level:'S1–S2',tag:'Proofs',desc:'An extensive reference for mathematical definitions, theorems, lemmas, and their proofs.',featured:true},
  {id:'3b1b',name:'3Blue1Brown',url:'https://www.3blue1brown.com/',group:'foundation',level:'S1–S2',tag:'Visual Explanations',desc:'Intuitive visual explanations of linear algebra, calculus, and abstract mathematical concepts.'},
  {id:'hatcher',name:'Allen Hatcher — Algebraic Topology',url:'https://pi.math.cornell.edu/~hatcher/',group:'advanced',level:'S2–S3',tag:'Algebraic Topology',desc:'Authoritative notes on fundamental groups, homology, cohomology, and homotopy theory.',featured:true},
  {id:'spielman',name:'Spectral and Algebraic Graph Theory — Spielman',url:'https://cs-www.cs.yale.edu/homes/spielman/sagt/',group:'advanced',level:'S2–S3',tag:'Graph Theory',desc:'A rigorous treatment of graph spectra, Laplacians, linear algebra, and spectral methods.',featured:true},
  {id:'stacks',name:'The Stacks Project',url:'https://stacks.math.columbia.edu/',group:'advanced',level:'S3 / Research',tag:'Algebraic Geometry',desc:'Advanced references on schemes, sheaves, algebraic spaces, and algebraic stacks; a substantial algebraic foundation is essential.'},
  {id:'nlab',name:'nLab',url:'https://ncatlab.org/nlab/show/HomePage',group:'advanced',level:'S2–S3',tag:'Higher Structures',desc:'A collaborative reference on category theory, topology, homotopy theory, and higher abstract structures.',featured:true},
  {id:'lean',name:'Mathematics in Lean',url:'https://leanprover-community.github.io/mathematics_in_lean/',group:'advanced',level:'S1 / Research',tag:'Formal Proof',desc:'Learn to formalise proofs in Lean 4 across logic, set theory, algebra, topology, and measure theory.'},
  {id:'arxiv',name:'arXiv Mathematics',url:'https://arxiv.org/archive/math',group:'research',level:'Research',tag:'Preprint',desc:'Consult current mathematical preprints while independently verifying proofs and publication or peer-review status.',featured:true},
  {id:'zbmath',name:'zbMATH Open',url:'https://zbmath.org/',group:'research',level:'Research',tag:'Bibliographic Research',desc:'Investigate publications, mathematical subject classifications, bibliographic references, and related literature.',featured:true},
  {id:'mathoverflow',name:'MathOverflow',url:'https://mathoverflow.net/',group:'research',level:'Research',tag:'Research Community',desc:'A research-level question-and-answer community addressing sophisticated mathematical problems.',featured:true},
  {id:'mathse',name:'Mathematics Stack Exchange',url:'https://math.stackexchange.com/',group:'research',level:'S1 / Research',tag:'Mathematical Discussion',desc:'Discussion of mathematical proofs, theorems, and problems from introductory to advanced levels.'},
  {id:'openalex',name:'OpenAlex',url:'https://openalex.org/',group:'research',level:'Research',tag:'Scholarly Literature',desc:'Explore scholarly publications, authorship, citation networks, and research connections.'},
  {id:'sagecell',name:'SageMathCell',url:'https://sagecell.sagemath.org/',group:'computing',level:'S1 / Research',tag:'Browser Tool',desc:'Experiment with symbolic computation, matrices, algebraic structures, and mathematical objects directly in your browser.',featured:true},
  {id:'sagemath',name:'SageMath',url:'https://www.sagemath.org/',group:'computing',level:'S1 / Research',tag:'Open Source',desc:'An open-source mathematical computing environment for rigorous calculation and experimentation.'},
  {id:'networkx',name:'NetworkX',url:'https://networkx.org/',group:'computing',level:'S1 / Research',tag:'Python & Graphs',desc:'Investigate graph algorithms and network structures using Python.'},
  {id:'mathlib',name:'Mathlib',url:'https://leanprover-community.github.io/mathlib4_docs/',group:'computing',level:'S1 / Research',tag:'Lean Library',desc:'A formal mathematics library supporting machine-checked proofs in Lean 4.'},
  {id:'chatgpt',name:'ChatGPT',url:'https://chatgpt.com/',group:'ai',level:'Supplementary',tag:'AI Tutor',desc:'Assist with proof reconstruction, counterexample exploration, and progressively challenging exercises.'},
  {id:'gemini',name:'Gemini',url:'https://gemini.google.com/',group:'ai',level:'Supplementary',tag:'Second Opinion',desc:'Compare alternative approaches and critically examine proofs; agreement between AI systems does not establish mathematical validity.'}
];
let mathFilter='featured';

function renderMathHub({S,esc,head,mathFilter}){
  const saved=new Set(Array.isArray(S.settings.mathFavorites)?S.settings.mathFavorites:[]);
  const groups=MATH_RESOURCE_GROUPS;
  const selected=groups.some(x=>x.id===mathFilter)?mathFilter:'featured';
  const shown=MATH_RESOURCES.filter(x=>selected==='featured'?x.featured:selected==='all'?true:selected==='saved'?saved.has(x.id):x.group===selected);
  const heading=groups.find(x=>x.id===selected)?.label||'Editor’s Picks';
  const list=shown.length?shown.map(x=>{
    const category=groups.find(y=>y.id===x.group)?.label||x.group,star=saved.has(x.id);
    return'<article class="math-resource-card"><div class="math-resource-top"><span class="math-resource-mark" aria-hidden="true">'+esc(x.name.slice(0,1))+'</span><button type="button" class="math-star '+(star?'active':'')+'" data-act="mathStar" data-id="'+esc(x.id)+'" aria-label="'+(star?'Remove '+esc(x.name)+' from favourites':'Save '+esc(x.name)+' to favourites')+'" aria-pressed="'+(star?'true':'false')+'" title="'+(star?'Remove from favourites':'Add to favourites')+'">'+(star?'★':'☆')+'</button></div><h3>'+esc(x.name)+'</h3><div class="math-resource-tags"><span>'+esc(category)+'</span><span>'+esc(x.level)+'</span></div><p>'+esc(x.desc)+'</p><div class="math-resource-foot"><span>'+esc(x.tag)+'</span><a href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+esc(x.name)+' in a new tab">Visit website <span aria-hidden="true">↗</span></a></div></article>'
  }).join(''):'<div class="math-empty"><div class="math-empty-icon">☆</div><h3>No favourite resources yet</h3><p>Select the star on any resource to keep it within easy reach.</p><button type="button" class="btn btn-secondary" data-act="mathFilter" data-filter="featured">View Editor’s Picks</button></div>';
  return head('Matematika','A curated, predominantly open-access reference collection extending from undergraduate mathematics to doctoral research.','<button class="btn btn-secondary" data-route="study">▣ Log Study Session</button>')
    +'<section class="math-hero"><div class="math-hero-main"><div class="math-eyebrow">MATHEMATICS · LEARNING & RESEARCH</div><h2>From conceptual insight to rigorous proof.</h2><p>Lectures, textbooks, theorems, scholarly literature, and computational tools brought together to cultivate mathematical depth and research fluency.</p><div class="math-hero-note">Theory <span>→</span> Problem Solving <span>→</span> Research</div></div><div class="math-hero-stats"><div><strong>'+MATH_RESOURCES.length+'</strong><span>Website & tools</span></div><div><strong>'+MATH_RESOURCES.filter(x=>x.featured).length+'</strong><span>Core References</span></div><div><strong>'+saved.size+'</strong><span>Your Favourites</span></div></div></section>'
    +'<section class="math-library" aria-label="Mathematics Resources"><div class="math-section-head"><div><div class="math-eyebrow">YOUR MATH LIBRARY</div><h2>Explore the Resources</h2><p>Editor’s Picks highlights ten recommended resources. Most scholarly materials are freely accessible; AI services may impose usage limits.</p></div></div>'
    +'<div class="math-filter-bar" aria-label="Filter mathematical resources">'+groups.map(g=>'<button type="button" class="math-filter '+(g.id===selected?'active':'')+'" data-act="mathFilter" data-filter="'+g.id+'" aria-pressed="'+(g.id===selected?'true':'false')+'">'+esc(g.label)+(g.id==='all'?' <span>'+MATH_RESOURCES.length+'</span>':g.id==='saved'?' <span>'+saved.size+'</span>':'')+'</button>').join('')+'</div>'
    +'<div class="math-library-meta"><b>'+esc(heading)+'</b><span>'+shown.length+' resources</span></div><div class="math-resource-grid">'+list+'</div></section>'
    +'<details class="math-learning-path" id="mathLearningPath"><summary><span><span class="math-eyebrow">LEARNING ROADMAP</span><b>A Pathway from Undergraduate to Doctoral Mathematics</b><small>Five stages of mathematical maturity, rather than rigid academic milestones</small></span><span class="math-disclosure-icon" aria-hidden="true">⌄</span></summary><div class="math-path-body">'+MATH_LEARNING_PATH.map((step,i)=>'<div class="math-path-step"><span class="math-path-index">0'+(i+1)+'</span><div><h3>'+esc(step.title)+'</h3><p>'+esc(step.focus)+'</p><small>'+esc(step.sources)+'</small></div><button type="button" data-act="mathFilter" data-filter="'+step.filter+'" class="math-path-open">View resources ↗</button></div>').join('')+'</div></details>'
    +'<div class="math-disclaimer"><span aria-hidden="true">ⓘ</span><p><b>Research integrity:</b> arXiv preprints are not necessarily peer-reviewed, and AI-generated reasoning can be mistaken despite apparent consensus. Verify claims against primary sources, independent proofs, and, where appropriate, formal methods or computational checks.</p></div>';
}

/* Content renderer receives app state instead of referencing private app scope. */
globalThis.DescaMathHub={render:renderMathHub,resources:MATH_RESOURCES,groups:MATH_RESOURCE_GROUPS,roadmap:MATH_LEARNING_PATH};
