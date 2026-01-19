(() => {
  const STORAGE_KEY = "urtype_answers_v3";
  const LANG_KEY = "urtype_lang_v1";
  const RESULT_KEY = "urtype_last_result_v1";
  const $ = (id) => document.getElementById(id);

  // 96 Questions (EN + ID) — (ini sama seperti yang terakhir aku kasih)
  const QUESTIONS = [
    { en: "You have an uncanny ability of recognizing others’ needs.", id: "Kamu memiliki kemampuan luar biasa dalam mengenali kebutuhan orang lain." },
    { en: "You have a strong tendency to see things as either good or bad.", id: "Kamu cenderung melihat sesuatu secara hitam-putih (baik atau buruk)." },
    { en: "You like to organize things for pleasure.", id: "Kamu senang mengatur sesuatu hanya karena menikmatinya." },
    { en: "You frequently have hunches or insights about the future that turn out to be correct.", id: "Kamu sering punya firasat/intuisi tentang masa depan yang ternyata benar." },
    { en: "You dislike change.", id: "Kamu tidak menyukai perubahan." },
    { en: "You exude charisma and are usually viewed as charming by others.", id: "Kamu memancarkan karisma dan sering dianggap menawan oleh orang lain." },
    { en: "You live in the present, not the past or the future.", id: "Kamu hidup di masa kini, bukan di masa lalu atau masa depan." },
    { en: "You follow a consistent routine.", id: "Kamu menjalani rutinitas yang konsisten." },
    { en: "You would rather sugarcoat a problem than upset someone.", id: "Kamu lebih memilih menghaluskan masalah daripada membuat seseorang tersinggung." },
    { en: "You see so many possibilities that you have trouble committing to a single one.", id: "Kamu melihat terlalu banyak kemungkinan sampai sulit berkomitmen pada satu pilihan." },
    { en: "You greatly value tradition and duty.", id: "Kamu sangat menghargai tradisi dan tanggung jawab." },
    { en: "You start many different projects, but you finish few.", id: "Kamu memulai banyak proyek, tapi hanya sedikit yang kamu selesaikan." },
    { en: "You easily sympathize with others’ struggles.", id: "Kamu mudah bersimpati terhadap perjuangan orang lain." },
    { en: "You are unnerved by uncertainty and the unknown.", id: "Kamu merasa gelisah dengan ketidakpastian dan hal-hal yang tidak diketahui." },
    { en: "You see the world as a bundle of possibilities waiting to be explored.", id: "Kamu melihat dunia sebagai kumpulan kemungkinan yang menunggu untuk dijelajahi." },
    { en: "You have trouble communicating your ideas with people.", id: "Kamu kesulitan mengomunikasikan ide-idemu kepada orang lain." },
    { en: "You would question anything.", id: "Kamu cenderung mempertanyakan apa pun." },
    { en: "You are hesitant to strictly conform to social roles.", id: "Kamu enggan untuk patuh ketat pada peran sosial." },
    { en: "You may be seen as reckless and unknowingly hurt those around you.", id: "Kamu bisa dianggap ceroboh dan tanpa sadar menyakiti orang di sekitarmu." },
    { en: "You consider yourself an organized person and take control of situations before they get out of hand.", id: "Kamu menganggap dirimu terorganisir dan suka mengambil kendali sebelum situasi jadi kacau." },
    { en: "You express yourself honestly and authentically.", id: "Kamu mengekspresikan diri dengan jujur dan apa adanya." },
    { en: "You are often the first to react to a question.", id: "Kamu sering jadi orang pertama yang bereaksi terhadap sebuah pertanyaan." },
    { en: "You may be viewed as “meddling” or “controlling” to others.", id: "Kamu bisa dipandang sebagai orang yang “ikut campur” atau “mengontrol” oleh orang lain." },
    { en: "You explore things in depth for purely for the sake of exploring them in depth.", id: "Kamu suka menggali sesuatu secara mendalam hanya demi menggali sedalam itu." },
    { en: "You relate present experiences back to past experiences.", id: "Kamu sering mengaitkan pengalaman saat ini dengan pengalaman masa lalu." },
    { en: "You feel as though you are one of the only truly nice people left in this world.", id: "Kamu merasa seolah kamu termasuk sedikit orang yang benar-benar baik yang tersisa di dunia ini." },
    { en: "You imagine things that aren’t directly connected to the real world.", id: "Kamu membayangkan hal-hal yang tidak berhubungan langsung dengan dunia nyata." },
    { en: "You see the big picture in a sea of details.", id: "Kamu bisa melihat gambaran besar di tengah lautan detail." },
    { en: "You stay true to yourself.", id: "Kamu tetap setia pada dirimu sendiri." },
    { en: "You come up with internal logical frameworks, theories, and systems to describe the world around you.", id: "Kamu membangun kerangka logika/teori/sistem internal untuk menjelaskan dunia di sekitarmu." },
    { en: "You may be described as ditzy or scatterbrained.", id: "Kamu mungkin dianggap ceroboh, pelupa, atau mudah buyar." },
    { en: "You place a lot of value on details and past experiences.", id: "Kamu sangat menghargai detail dan pengalaman masa lalu." },
    { en: "You are extremely objective and “tell it as it is.”", id: "Kamu sangat objektif dan cenderung berkata apa adanya." },
    { en: "You often feel awkward and aimless during leisure time.", id: "Kamu sering merasa canggung dan bingung mau ngapain saat waktu luang." },
    { en: "You prefer living in your dreams to living in the real world.", id: "Kamu lebih suka hidup dalam angan-angan daripada hidup di dunia nyata." },
    { en: "You are an excellent problem solver and have an incredible ability to analyze things in depth.", id: "Kamu pemecah masalah yang hebat dan punya kemampuan luar biasa untuk menganalisis secara mendalam." },
    { en: "Fake people bother you.", id: "Orang yang palsu/berpura-pura membuatmu terganggu." },
    { en: "You value inclusion and try your best to involve everyone in a group.", id: "Kamu menghargai inklusi dan berusaha melibatkan semua orang dalam kelompok." },
    { en: "You are blunt and straight-to-the-point in communication.", id: "Kamu blak-blakan dan langsung ke inti saat berkomunikasi." },
    { en: "You are a brainstormer: you offer a multitude of different ideas in a given situation.", id: "Kamu tipe brainstormer: bisa menawarkan banyak ide berbeda dalam suatu situasi." },
    { en: "You are fiercely individualistic and pride yourself on your uniqueness.", id: "Kamu sangat individualis dan bangga dengan keunikanmu." },
    { en: "You may be viewed as whiny and/or depressive.", id: "Kamu bisa dipandang cengeng dan/atau depresif oleh orang lain." },
    { en: "You have a tendency to go off-topic in conversation.", id: "Kamu cenderung melebar/keluar topik saat ngobrol." },
    { en: "You believe your presence is greatly felt in a room.", id: "Kamu merasa kehadiranmu sangat terasa dalam sebuah ruangan." },
    { en: "You value truth and logic more than anything else.", id: "Kamu menghargai kebenaran dan logika lebih dari apa pun." },
    { en: "You have been consistently logical throughout your life.", id: "Sepanjang hidupmu, kamu cenderung konsisten bersikap logis." },
    { en: "You understand a concept by logically recognizing and drawing patterns between different, already known concepts.", id: "Kamu memahami konsep dengan mengenali pola secara logis antara konsep-konsep yang sudah kamu kenal." },
    { en: "You work through problems by yourself and detach yourself from other people to arrive at a conclusion.", id: "Kamu menyelesaikan masalah sendiri dan cenderung menjauh dari orang lain untuk mencapai kesimpulan." },
    { en: "You thrive on new and exciting experiences.", id: "Kamu berkembang saat mengalami hal-hal baru dan seru." },
    { en: "You become stubborn and resolute in the face of opposition when it comes to your personal beliefs.", id: "Kamu menjadi keras kepala dan teguh saat keyakinan pribadimu ditentang." },
    { en: "You often use analogies and similes to communicate new ideas.", id: "Kamu sering memakai analogi atau perumpamaan untuk menyampaikan ide baru." },
    { en: "You tend to express sympathy only after you empathize with someone.", id: "Kamu cenderung menunjukkan simpati setelah kamu benar-benar bisa berempati pada seseorang." },
    { en: "You try to help people to the point where you begin to forget taking care of your own needs.", id: "Kamu membantu orang sampai-sampai mulai lupa merawat kebutuhanmu sendiri." },
    { en: "You are skilled at recognizing whether the details in front of you match what you are used to.", id: "Kamu terampil mengenali apakah detail di depanmu cocok dengan yang biasa kamu temui." },
    { en: "You streamline existing systems for the sake of efficiency and productivity.", id: "Kamu menyederhanakan sistem yang ada demi efisiensi dan produktivitas." },
    { en: "You trust hard facts and data more than anything else.", id: "Kamu lebih percaya fakta dan data daripada apa pun." },
    { en: "You often use metaphors to communicate new ideas.", id: "Kamu sering memakai metafora untuk menyampaikan ide baru." },
    { en: "You cannot help but get hung up on small details.", id: "Kamu sering tidak bisa lepas dari detail-detail kecil." },
    { en: "You are attracted to symbolism, mysticism and the unknown.", id: "Kamu tertarik pada simbolisme, hal mistis, dan yang tidak diketahui." },
    { en: "You feel as though your insights often go misunderstood.", id: "Kamu merasa wawasanmu sering disalahpahami." },
    { en: "You are able to manipulate conversations by reading others’ body language.", id: "Kamu bisa mengarahkan percakapan dengan membaca bahasa tubuh orang lain." },
    { en: "You consider yourself a practical and realistic person, free from imagination.", id: "Kamu menganggap dirimu praktis dan realistis, tidak banyak berimajinasi." },
    { en: "You rely on external sources to support your argument.", id: "Kamu mengandalkan sumber eksternal untuk mendukung argumenmu." },
    { en: "You often arrive at conclusions that seem to come out of nowhere; you relate to “realizing” answers.", id: "Kamu sering sampai pada kesimpulan yang terasa muncul begitu saja; kamu relate dengan ‘tiba-tiba sadar’ jawabannya." },
    { en: "You have an eye for aesthetics and “enjoy the finer things in life.”", id: "Kamu peka terhadap estetika dan ‘menikmati hal-hal yang lebih berkelas’." },
    { en: "You are described as “stuck in your ways.”", id: "Kamu sering dianggap ‘terjebak dalam cara lama’." },
    { en: "You rely only on past experiences to guide yourself through the present.", id: "Kamu hanya mengandalkan pengalaman masa lalu untuk menuntunmu di masa kini." },
    { en: "You modify internal logical frameworks to account for new data, and you sometimes find yourself re-evaluating them when new data is incompatible with it.", id: "Kamu menyesuaikan kerangka logika internalmu untuk data baru, dan kadang mengevaluasi ulang jika data baru tidak cocok." },
    { en: "You are drawn toward the abstract and often obsess over meanings.", id: "Kamu tertarik pada hal abstrak dan sering terobsesi pada makna." },
    { en: "You have an excellent sense of direction and instantly know your way around a new place.", id: "Kamu punya orientasi arah yang bagus dan cepat paham jalan di tempat baru." },
    { en: "You easily recognize internal bodily sensations and act to suit your body’s needs.", id: "Kamu mudah mengenali sensasi tubuh dan bertindak sesuai kebutuhan tubuhmu." },
    { en: "Generally, you would prefer a solution be thorough before putting it into action (at the cost of time).", id: "Secara umum, kamu lebih memilih solusi benar-benar matang sebelum dijalankan (meski memakan waktu)." },
    { en: "You constantly set yourself on goals and objectives.", id: "Kamu terus-menerus menetapkan tujuan dan target untuk dirimu." },
    { en: "You “just know” things without being able to consciously put them into words.", id: "Kamu ‘tahu saja’ sesuatu tanpa bisa menjelaskannya dengan kata-kata secara sadar." },
    { en: "You are drawn to the new, novel, and original.", id: "Kamu tertarik pada hal baru, unik, dan orisinal." },
    { en: "You always try to communicate tactfully with people.", id: "Kamu selalu berusaha berkomunikasi dengan penuh taktik/sopan." },
    { en: "You are aware of your surroundings and aren’t likely to miss something right in front of you.", id: "Kamu sadar dengan lingkungan sekitar dan jarang melewatkan sesuatu yang ada tepat di depanmu." },
    { en: "You greatly value social harmony and often go out of your way to maintain it.", id: "Kamu sangat menghargai keharmonisan sosial dan sering berusaha ekstra untuk menjaganya." },
    { en: "You would do whatever it takes to win a debate.", id: "Kamu akan melakukan apa pun untuk memenangkan debat." },
    { en: "You find yourself agreeing with those who claim that the ends justify the means.", id: "Kamu cenderung setuju dengan pandangan bahwa tujuan membenarkan cara." },
    { en: "You absorb information from the outside world without additional processing.", id: "Kamu menyerap informasi dari luar tanpa banyak pemrosesan tambahan." },
    { en: "You take on subjects with a burning interest only to drop them once they no longer feel new to you.", id: "Kamu menekuni topik dengan antusias, tapi meninggalkannya saat sudah tidak terasa baru lagi." },
    { en: "You have a strict internal moral code that comes from within regardless of any external standards.", id: "Kamu punya kode moral internal yang ketat dari dalam diri, terlepas dari standar eksternal." },
    { en: "You can easily think of something random to say.", id: "Kamu mudah memikirkan sesuatu yang random untuk diucapkan." },
    { en: "You find it difficult to concentrate on a single subject.", id: "Kamu sulit berkonsentrasi pada satu topik saja." },
    { en: "You live in the “here and now.”", id: "Kamu hidup di ‘di sini dan saat ini’." },
    { en: "You place a great amount of trust in the mysterious and unconscious world.", id: "Kamu menaruh banyak kepercayaan pada hal misterius dan dunia bawah sadar." },
    { en: "You become upset when your care for others goes unappreciated.", id: "Kamu kesal saat kepedulianmu pada orang lain tidak dihargai." },
    { en: "You generally work through problems with others and involve yourself with other people to arrive at a conclusion.", id: "Kamu umumnya menyelesaikan masalah bersama orang lain dan melibatkan orang lain untuk sampai pada kesimpulan." },
    { en: "You believe that arriving at a truth is more important than winning an argument.", id: "Kamu percaya menemukan kebenaran lebih penting daripada memenangkan argumen." },
    { en: "You sometimes fail to adapt to new data because it is not consistent with your personal understanding of an idea.", id: "Kamu kadang gagal menyesuaikan diri dengan data baru karena tidak sesuai dengan pemahaman pribadimu." },
    { en: "You are a risk-taker.", id: "Kamu berani mengambil risiko." },
    { en: "You have trouble communicating with those who do not think like you.", id: "Kamu kesulitan berkomunikasi dengan orang yang cara berpikirnya tidak seperti kamu." },
    { en: "You feel a strong sense of unity when communicating with others in a group.", id: "Kamu merasakan rasa kebersamaan yang kuat saat berkomunikasi dengan orang lain dalam kelompok." },
    { en: "You may be viewed as selfish or self-centered.", id: "Kamu bisa dipandang egois atau terlalu berpusat pada diri sendiri." },
    { en: "You may be viewed as “fake” or “manipulative” to others.", id: "Kamu bisa dipandang ‘palsu’ atau ‘manipulatif’ oleh orang lain." }
  ];

  const UI = {
    en: { qLabel:"QUESTION", left:"Disagree", right:"Agree", bottomTitle:"Save & Analyze", bottomSub:"Click Continue to view result.", lanjut:"Continue", reset:"Reset all answers?", must:"Please answer question ", robot:"Auto-fill random answers (Robot)?" },
    id: { qLabel:"PERTANYAAN", left:"Tidak Setuju", right:"Setuju", bottomTitle:"Simpan & Analisis", bottomSub:"Klik Lanjut untuk lihat hasil.", lanjut:"Lanjut", reset:"Reset semua jawaban?", must:"Tolong jawab pertanyaan ", robot:"Isi jawaban random otomatis (Robot)?" }
  };

  const state = { lang: loadLang(), answers: loadAnswers() };

  function loadLang(){
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "id") return saved;
    const nav = (navigator.language || "").toLowerCase();
    return nav.startsWith("id") ? "id" : "en";
  }
  function saveLang(){ localStorage.setItem(LANG_KEY, state.lang); }

  function loadAnswers(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const fixed = new Array(QUESTIONS.length).fill(null);
      if (Array.isArray(arr)) for (let i=0;i<fixed.length;i++) fixed[i] = (arr[i] ?? null);
      return fixed;
    }catch{
      return new Array(QUESTIONS.length).fill(null);
    }
  }
  function saveAnswers(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers)); }

  function answeredCount(){ return state.answers.filter(v => v !== null).length; }
  function updateProgress(){
    const a = answeredCount();
    const total = QUESTIONS.length;
    const pct = Math.round((a/total)*100);
    $("answeredCount").textContent = String(a);
    $("totalCount").textContent = String(total);
    $("progressLabel").textContent = `${pct}%`;
    $("progressBar").style.width = `${pct}%`;
  }

  function applyUI(){
    const t = UI[state.lang];
    $("langToggle").textContent = state.lang.toUpperCase();
    $("bottomTitle").textContent = t.bottomTitle;
    $("bottomSub").textContent = t.bottomSub;
    $("lanjutBtn").textContent = t.lanjut;
  }

  function buildCard(i){
    const selected = state.answers[i];
    const sec = document.createElement("section");
    sec.className = "qsection";
    sec.dataset.index = String(i);

    const head = document.createElement("div");
    head.className = "qsection-head";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = `${UI[state.lang].qLabel} ${i+1}`;

    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = `#${i+1}`;

    head.appendChild(title);
    head.appendChild(chip);

    const body = document.createElement("div");
    body.className = "qsection-body";

    const q = document.createElement("div");
    q.className = "qtext";
    q.textContent = QUESTIONS[i][state.lang];

    const box = document.createElement("div");
    box.className = "answer-bar";

    const top = document.createElement("div");
    top.className = "answer-bar-top";

    const hearts = document.createElement("div");
    hearts.className = "hearts";

    for (let v=1; v<=5; v++){
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "heart-btn" + (selected === v ? " selected" : "");
      btn.innerHTML = `<span class="heart">❤</span><span class="n">${v}</span>`;

      btn.addEventListener("click", () => {
        state.answers[i] = v;
        saveAnswers();
        hearts.querySelectorAll(".heart-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateProgress();
      });

      hearts.appendChild(btn);
    }

    const labels = document.createElement("div");
    labels.className = "scale-labels";
    labels.innerHTML = `<span>${UI[state.lang].left}</span><span>${UI[state.lang].right}</span>`;

    box.appendChild(top);
    box.appendChild(hearts);

    body.appendChild(q);
    body.appendChild(box);
    body.appendChild(labels);

    sec.appendChild(head);
    sec.appendChild(body);
    return sec;
  }

  function renderQuestions(){
    const wrap = $("questions");
    wrap.innerHTML = "";
    for (let i=0;i<QUESTIONS.length;i++) wrap.appendChild(buildCard(i));
  }

  function revealAnim(){
    const cards = document.querySelectorAll(".qsection");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add("inview");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    cards.forEach(c => io.observe(c));
  }

  function showLanding(){
    $("landing").classList.remove("hidden");
    $("test").classList.add("hidden");
  }

  function showTest(){
    $("landing").classList.add("hidden");
    $("test").classList.remove("hidden");
    renderQuestions();
    revealAnim();

    document.querySelectorAll(".qsection").forEach(sec => {
      const idx = Number(sec.dataset.index);
      const v = state.answers[idx];
      const btns = sec.querySelectorAll(".heart-btn");
      btns.forEach(b=>b.classList.remove("selected"));
      if (v && btns[v-1]) btns[v-1].classList.add("selected");
    });

    applyUI();
    updateProgress();
    $("test").scrollIntoView({behavior:"smooth", block:"start"});
  }

  function robotFill(){
    for (let i=0;i<state.answers.length;i++) state.answers[i] = Math.floor(Math.random()*5)+1;
    saveAnswers();
    showTest();
  }

  function requireAll(){
    const idx = state.answers.findIndex(v => v === null);
    if (idx !== -1){
      alert(UI[state.lang].must + (idx+1));
      document.querySelector(`.qsection[data-index="${idx}"]`)?.scrollIntoView({behavior:"smooth", block:"start"});
      return false;
    }
    return true;
  }

  // ---- Analysis (heuristik ringan) ----
  const STACKS = {
    ENFJ: ["Fe","Ni","Se","Ti"], ENTJ: ["Te","Ni","Se","Fi"],
    ENFP: ["Ne","Fi","Te","Si"], ENTP: ["Ne","Ti","Fe","Si"],
    ESFJ: ["Fe","Si","Ne","Ti"], ESTJ: ["Te","Si","Ne","Fi"],
    ESFP: ["Se","Fi","Te","Ni"], ESTP: ["Se","Ti","Fe","Ni"],
    INFJ: ["Ni","Fe","Ti","Se"], INTJ: ["Ni","Te","Fi","Se"],
    INFP: ["Fi","Ne","Si","Te"], INTP: ["Ti","Ne","Si","Fe"],
    ISFJ: ["Si","Fe","Ti","Ne"], ISTJ: ["Si","Te","Fi","Ne"],
    ISFP: ["Fi","Se","Ni","Te"], ISTP: ["Ti","Se","Ni","Fe"],
  };

  const CF_MAP = {
    Ne: [10,12,15,40,43,75,82,84],
    Ni: [4,28,60,64,69,74,87],
    Se: [7,49,70,77,81,86,92],
    Si: [5,8,11,25,32,54,58,66,67],
    Te: [20,33,39,55,56,73,79,80],
    Ti: [30,36,45,46,47,48,68,90],
    Fe: [1,6,9,13,38,76,78,88,94],
    Fi: [21,29,41,50,52,83,95],
  };

  function clampScore(v){ return v == null ? 0 : (v - 3); } // -2..+2

  function computeFunctionScores(){
    const out = {};
    for (const fn of Object.keys(CF_MAP)){
      const idxs = CF_MAP[fn].map(n => n-1);
      let sum=0, count=0;
      for (const idx of idxs){
        const v = state.answers[idx];
        sum += clampScore(v);
        count++;
      }
      const min = -2*count, max = 2*count;
      const norm = (sum - min) / (max - min); // 0..1
      out[fn] = Math.round((norm * 50) * 10) / 10; // 0..50
    }
    return out;
  }

  function isExtFn(fn){ return fn === "Ne" || fn === "Se" || fn === "Te" || fn === "Fe"; }

  function scoreGrant(scores, type){
    const st = STACKS[type];
    const w = [4,3,2,1];
    return w[0]*scores[st[0]] + w[1]*scores[st[1]] + w[2]*scores[st[2]] + w[3]*scores[st[3]];
  }

  function scoreMyers(scores, type){
    const st = STACKS[type];
    const base = scoreGrant(scores, type);
    const bonus =
      (isExtFn(st[0]) ? 1.2 : 0) * scores[st[0]] +
      (isExtFn(st[1]) ? 0.9 : 0) * scores[st[1]] +
      (isExtFn(st[2]) ? 0.4 : 0) * scores[st[2]];
    return base + bonus;
  }

  function bestType(scores, model){
    let best=null, bestScore=-Infinity;
    for (const t of Object.keys(STACKS)){
      const s = (model === "myers") ? scoreMyers(scores, t) : scoreGrant(scores, t);
      if (s > bestScore){ bestScore = s; best = t; }
    }
    return best;
  }

  function axisBased(scores){
    const ext = scores.Ne + scores.Se + scores.Te + scores.Fe;
    const intr = scores.Ni + scores.Si + scores.Ti + scores.Fi;
    const EI = ext >= intr ? "E" : "I";
    const SN = (scores.Ne + scores.Ni) >= (scores.Se + scores.Si) ? "N" : "S";
    const TF = (scores.Te + scores.Ti) >= (scores.Fe + scores.Fi) ? "T" : "F";
    let JP = "J";
    if (EI === "E") JP = (scores.Te + scores.Fe) >= (scores.Ne + scores.Se) ? "J" : "P";
    else JP = (scores.Ti + scores.Fi) >= (scores.Ni + scores.Si) ? "J" : "P";
    return `${EI}${SN}${TF}${JP}`;
  }

  function myersLetters(scores){
    const EI = (scores.Fe + scores.Te + scores.Ne + scores.Se) >= (scores.Fi + scores.Ti + scores.Ni + scores.Si) ? "E" : "I";
    const SN = (scores.Ne + scores.Ni) >= (scores.Se + scores.Si) ? "N" : "S";
    const TF = (scores.Te + scores.Ti) >= (scores.Fe + scores.Fi) ? "T" : "F";
    const JP = (EI === "E")
      ? ((scores.Te + scores.Fe) >= (scores.Ne + scores.Se) ? "J" : "P")
      : ((scores.Ti + scores.Fi) >= (scores.Ni + scores.Si) ? "J" : "P");
    return `${EI}${SN}${TF}${JP}`;
  }

  function exportJSON(){
    const scores = computeFunctionScores();
    const payload = {
      test: "UR TYPE - 96 items (answers + analysis)",
      language: state.lang,
      timestamp: new Date().toISOString(),
      answers: state.answers,
      analysis: {
        function_scores_0_50: scores,
        grant_jung_function_type: bestType(scores,"grant"),
        axis_based_function_type: axisBased(scores),
        myers_function_type: bestType(scores,"myers"),
        myers_letter_type: myersLetters(scores)
      }
    };
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "urtype-result.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }

  function resetAll(){
    if (!confirm(UI[state.lang].reset)) return;
    state.answers = new Array(QUESTIONS.length).fill(null);
    saveAnswers();
    updateProgress();
    renderQuestions();
    revealAnim();
  }

  // ------------------ init ------------------
  document.addEventListener("DOMContentLoaded", () => {
    applyUI();
    showLanding();
    updateProgress();

    $("startBtn").addEventListener("click", showTest);

    $("langToggle").addEventListener("click", () => {
      state.lang = (state.lang === "id") ? "en" : "id";
      saveLang();
      applyUI();
      if (!$("test").classList.contains("hidden")){
        renderQuestions();
        revealAnim();
        document.querySelectorAll(".qsection").forEach(sec => {
          const idx = Number(sec.dataset.index);
          const v = state.answers[idx];
          const btns = sec.querySelectorAll(".heart-btn");
          btns.forEach(b=>b.classList.remove("selected"));
          if (v && btns[v-1]) btns[v-1].classList.add("selected");
        });
      }
    });

    $("resetBtn").addEventListener("click", resetAll);
    $("robotBtn").addEventListener("click", () => { if (confirm(UI[state.lang].robot)) robotFill(); });
    $("exportBtn").addEventListener("click", exportJSON);

    // ✅ FIX: Lanjut -> simpan hasil -> redirect result.html
    $("lanjutBtn").addEventListener("click", () => {
      saveAnswers();
      if (!requireAll()) return;

      const scores = computeFunctionScores();
      const grant = bestType(scores, "grant");
      const axis = axisBased(scores);
      const myersFunc = bestType(scores, "myers");
      const myersLet = myersLetters(scores);

      const payload = {
        timestamp: new Date().toISOString(),
        answers: state.answers,
        analysis: {
          function_scores_0_50: scores,
          grant_jung_function_type: grant,
          axis_based_function_type: axis,
          myers_function_type: myersFunc,
          myers_letter_type: myersLet
        }
      };

      localStorage.setItem(RESULT_KEY, JSON.stringify(payload));
      window.location.href = "result.html";
    });
  });
})();
