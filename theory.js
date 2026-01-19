// theory.js
document.addEventListener("DOMContentLoaded", () => {
    const leftPage = document.getElementById("leftPage");
    const rightPage = document.getElementById("rightPage");
    const spreadEl = document.getElementById("spread");
  
    const turnSheet = document.getElementById("turnSheet");
    const turnFront = turnSheet.querySelector(".turnsheet__front");
    const turnBack  = turnSheet.querySelector(".turnsheet__back");
  
    const btnNext = document.getElementById("btnNext");
    const btnPrev = document.getElementById("btnPrev");
    const progressPill = document.getElementById("progressPill");
    const hintPill = document.getElementById("hintPill");
  
    const zoneLeft = document.getElementById("zoneLeft");
    const zoneRight = document.getElementById("zoneRight");
  
    const dragNext = document.getElementById("dragNext");
    const dragPrev = document.getElementById("dragPrev");
  
    const tocModal = document.getElementById("tocModal");
    const helpModal = document.getElementById("helpModal");
    const tocList = document.getElementById("tocList");
    const btnToc = document.getElementById("btnToc");
    const btnHelp = document.getElementById("btnHelp");
  
    // Search modal
    const btnSearch = document.getElementById("btnSearch");
    const searchModal = document.getElementById("searchModal");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
  
    /* ===== Slides (30) ===== */
    const SLIDES = [
      { tag:"Intro", title:"MBTI — Peta Preferensi, Bukan Kotak",
        subtitle:"MBTI memetakan preferensi cara memproses informasi & mengambil keputusan (bukan label mutlak).",
        left:{ heading:"Definisi umum", paragraphs:["Gunakan untuk memahami pola & growth—bukan untuk membatasi diri."],
          bullets:["Instrumen populer berbasis preferensi (non-klinis).","4 huruf: E/I, S/N, T/F, J/P → 16 tipe.","Baca sebagai “cenderung”, bukan absolut."] },
        right:{ heading:"Cara pakai yang sehat",
          bullets:["Bedakan preferensi vs skill (skill bisa dilatih).","Typing terbaik: pola konsisten, bukan vibe sesaat.","Jangan jadikan MBTI alat menghakimi."],
          badge:"🎀 Drag pojok bawah = page curl" },
        footer:"Tujuan: paham diri & orang lain—bukan cari tipe ‘paling keren’." },
  
      { tag:"Fondasi", title:"4 Dikotomi (Surface Layer)",
        subtitle:"Dikotomi adalah pintu masuk. Di bawahnya ada fungsi kognitif (engine).",
        left:{ heading:"Ringkas dikotomi",
          paragraphs:["E/I bukan ukuran sosial; T/F bukan baik/jahat; J/P bukan rapi vs berantakan."],
          bullets:["E vs I: sumber energi (stimulasi luar vs refleksi).","S vs N: cara menangkap info (konkret vs pola).","T vs F: kriteria keputusan (logika vs nilai).","J vs P: preferensi closure (struktur vs fleksibel)."]},
        right:{ heading:"Kesalahan umum",
          bullets:["‘I’ = pemalu (padahal soal energi).","‘T’ = dingin (padahal kriteria).","‘P’ = malas (padahal fleksibilitas)."],
          badge:"Surface ≠ Engine"},
        footer:"Next: Jung, Myers, Axis, dan fungsi." },
  
      { tag:"Jung", title:"Jung: Fungsi Psikologis",
        subtitle:"Jung membahas cara psikis memproses dunia melalui fungsi yang berorientasi i/e.",
        left:{ heading:"Empat fungsi dasar",
          paragraphs:["Thinking, Feeling, Sensation, Intuition (T/F = judging; S/N = perceiving)."],
          bullets:["Setiap fungsi bisa introverted (i) atau extraverted (e).","Dominan sadar; inferior cenderung tak-sadar.","Psikis mencari keseimbangan (kompensasi)."]},
        right:{ heading:"Catatan penting",
          bullets:["Jung tidak menulis format 4-huruf MBTI modern.","Pendekatan Jung menekankan dinamika (tension) & growth."],
          badge:"Jung = depth"},
        footer:"MBTI mengadaptasi Jung agar lebih praktis." },
  
      { tag:"Myers", title:"Myers–Briggs: Instrumen Preferensi",
        subtitle:"MBTI menyederhanakan teori agar mudah dipakai dalam refleksi diri & komunikasi.",
        left:{ heading:"Apa yang ditambah?",
          paragraphs:["Myers menambahkan J/P untuk memetakan fungsi yang tampak ke luar."],
          bullets:["Memudahkan inferensi stack fungsi dari 4 huruf.","Tetap non-klinis: bukan diagnosis.","Hasil terbaik saat diverifikasi perilaku nyata."]},
        right:{ heading:"Cara pakai akurat",
          bullets:["Pakai MBTI untuk bahasa + self-awareness.","Cek konsistensi lintas situasi & waktu.","Gunakan fungsi kognitif untuk menghindari stereotip."],
          badge:"MBTI = tool"},
        footer:"Next: Axis (poros keseimbangan) biar makin akurat." },
  
      { tag:"Axis", title:"Teori Axis: Poros Keseimbangan",
        subtitle:"Axis = pasangan fungsi yang berlawanan dan saling menyeimbangkan.",
        left:{ heading:"4 Axis utama",
          paragraphs:["Jika satu sisi dominan, sisi lawan sering jadi blindspot/growth area."],
          bullets:["Ne–Si: eksplor kemungkinan ↔ referensi stabil (memori/standar).","Ni–Se: visi/konvergensi ↔ fakta real-time/pengalaman.","Te–Fi: efektivitas objektif ↔ nilai/integritas personal.","Fe–Ti: harmoni sosial ↔ presisi logika internal."]},
        right:{ heading:"Kenapa berguna?",
          bullets:["Mengurangi ‘typing by stereotype’.","Menjelaskan konflik batin (tarik-menarik kutub).","Mengarah ke growth: integrasi fungsi lawan."],
          badge:"Axis = balance"},
        footer:"Next: 8 fungsi kognitif (detail & akurat)." },
  
      { tag:"Functions", title:"8 Fungsi Kognitif (Overview)",
        subtitle:"Fungsi = mekanisme preferensi proses info & keputusan.",
        left:{ heading:"Perceiving vs Judging",
          paragraphs:["Perceiving: S/N (info). Judging: T/F (keputusan)."],
          bullets:["Extraverted (e): respons pada objek/lingkungan.","Introverted (i): referensi kerangka internal.","Total: Se Si Ne Ni Te Ti Fe Fi."]},
        right:{ heading:"Stack fungsi",
          bullets:["Dominant: default otomatis.","Auxiliary: penyeimbang & lebih sadar.","Tertiary: comfort/play.","Inferior: sensitif tapi pintu growth besar."],
          badge:"Stack matters"},
        footer:"Sekarang kita bedah fungsi satu per satu." },
  
      { tag:"Function", title:"Se — Extraverted Sensation",
        subtitle:"Se menangkap realitas sekarang: detail sensorik, timing, respons cepat.",
        left:{ heading:"Se fokus pada...",
          paragraphs:["Learning by doing, presence, dan adaptasi real-time."],
          bullets:["Apa yang terjadi SEKARANG.","Detail visual/auditori/taktile.","Momentum & action." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: tanggap, pragmatis, berani action.","Jebakan: impulsif, chase stimulasi.","Growth: latih Ni (arah & makna)."],
          badge:"Se: NOW"},
        footer:"Se bukan dangkal—dia membaca fakta resolusi tinggi." },
  
      { tag:"Function", title:"Si — Introverted Sensation",
        subtitle:"Si memakai referensi internal: memori, standar, konsistensi.",
        left:{ heading:"Si fokus pada...",
          paragraphs:["Menjaga kualitas & stabilitas lewat pengalaman yang sudah terbukti."],
          bullets:["‘Ini mirip yang dulu...’","Standar & prosedur.","Reliability." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: teliti, stabil, disiplin.","Jebakan: terlalu nyaman cara lama.","Growth: latih Ne (opsi baru)."],
          badge:"Si: REFERENCE"},
        footer:"Si bukan kaku—dia quality-control." },
  
      { tag:"Function", title:"Ne — Extraverted Intuition",
        subtitle:"Ne menghubungkan ide: alternatif, kemungkinan, eksplorasi pola lintas konteks.",
        left:{ heading:"Ne fokus pada...",
          paragraphs:["Brainstorm cepat, koneksi ide, reframing."],
          bullets:["Banyak opsi sekaligus.","Asosiasi lintas bidang.","Peluang & tren." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: kreatif, adaptif.","Jebakan: kebanyakan opsi → buyar.","Growth: latih Si (filter bukti & prioritas)."],
          badge:"Ne: POSSIBILITIES"},
        footer:"Ne = radar peluang, bukan berarti ngawang." },
  
      { tag:"Function", title:"Ni — Introverted Intuition",
        subtitle:"Ni mengompres data jadi insight: benang merah, makna, prediksi konvergen.",
        left:{ heading:"Ni fokus pada...",
          paragraphs:["Aha moment, visi, sense-making dalam."],
          bullets:["Satu insight inti.","Implikasi jangka panjang.","Makna di balik pola." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: fokus, depth, strategi.","Jebakan: terlalu yakin visi, lupa data.","Growth: latih Se (cek realita)."],
          badge:"Ni: CONVERGENCE"},
        footer:"Ni bukan mistis—pattern compression yang dalam." },
  
      { tag:"Function", title:"Te — Extraverted Thinking",
        subtitle:"Te mengoptimalkan hasil: struktur eksternal, metrik, efisiensi.",
        left:{ heading:"Te fokus pada...",
          paragraphs:["Outcome, sistem, keputusan praktis."],
          bullets:["KPI / target.","SOP & struktur kerja.","Eksekusi efisien." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: tegas, organized, decisive.","Jebakan: mengabaikan nilai personal.","Growth: latih Fi (integritas)."],
          badge:"Te: RESULTS"},
        footer:"Te bukan bossy—dia fokus output & koordinasi." },
  
      { tag:"Function", title:"Ti — Introverted Thinking",
        subtitle:"Ti mengejar koherensi internal: definisi presisi, model mental, akurasi konsep.",
        left:{ heading:"Ti fokus pada...",
          paragraphs:["Merapikan logika dan membongkar konsep sampai ‘click’."],
          bullets:["Definisi → prinsip → implikasi.","Bebas kontradiksi.","Debug argumen." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: presisi, independen, tajam.","Jebakan: over-analyze, sulit eksekusi.","Growth: latih Fe (konteks sosial)."],
          badge:"Ti: PRECISION"},
        footer:"Ti bukan sok—dia menuntut ketepatan." },
  
      { tag:"Function", title:"Fe — Extraverted Feeling",
        subtitle:"Fe membaca emosi sosial: harmoni, kebutuhan relasi, norma kelompok.",
        left:{ heading:"Fe fokus pada...",
          paragraphs:["Koordinasi sosial, empati kontekstual, menjaga ‘atmosfer’."],
          bullets:["Apa yang dibutuhkan orang/kelompok?","Tone, timing, care.","Menyatukan orang." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: suportif, diplomatis, memfasilitasi.","Jebakan: people-pleasing, kabur logika.","Growth: latih Ti (jernih)."],
          badge:"Fe: HARMONY"},
        footer:"Fe bukan pencitraan—dia mengelola relasi." },
  
      { tag:"Function", title:"Fi — Introverted Feeling",
        subtitle:"Fi berakar pada nilai personal: integritas, autentisitas, kompas moral internal.",
        left:{ heading:"Fi fokus pada...",
          paragraphs:["Apa yang selaras dengan nilai inti diri?"],
          bullets:["Nilai/prinsip personal.","Emosi mendalam & personal.","Batas (acceptable vs tidak)." ]},
        right:{ heading:"Kekuatan & jebakan",
          bullets:["Kuat: autentik, berprinsip.","Jebakan: terlalu subjektif/defensif.","Growth: latih Te (struktur & eksekusi)."],
          badge:"Fi: INTEGRITY"},
        footer:"Fi bukan egois—dia menjaga kompas moral." },
  
      { tag:"Stack", title:"Dom–Aux–Ter–Inf (Cara Baca)",
        subtitle:"Stack menjelaskan pola sehat vs stres. Inferior sering muncul ekstrem saat stres.",
        left:{ heading:"Makna tiap posisi",
          paragraphs:["Dominan otomatis; Aux menyeimbangkan; Tertiary comfort; Inferior sensitif/growth."],
          bullets:["Jangan samakan ‘dom’ = paling jago.","Tertiary bisa terlihat ‘childish’.","Inferior bisa meledak saat stres."]},
        right:{ heading:"Growth yang realistis",
          bullets:["Latih axis lawan perlahan (porsi kecil).","Cari kebiasaan yang meng-ground fungsi inferior.","Bangun ‘bridge’ via auxiliary."],
          badge:"Healthy = flexible"},
        footer:"Tipe sehat = bisa pakai fungsi tanpa kehilangan inti diri." },
  
      { tag:"Myers", title:"Aturan Praktis J/P → Fungsi",
        subtitle:"Heuristik klasik untuk menebak fungsi dari 4 huruf.",
        left:{ heading:"E-types",
          paragraphs:["Untuk E, huruf terakhir sering menunjuk fungsi dominan yang ekstravert."],
          bullets:["EJ: dominan Te/Fe.","EP: dominan Se/Ne.","Contoh: ENFJ Fe-dom, ENFP Ne-dom."]},
        right:{ heading:"I-types",
          bullets:["Untuk I, huruf terakhir sering menunjuk fungsi auxiliary yang ekstravert.","IJ: aux Te/Fe; IP: aux Se/Ne.","Contoh: INFJ Fe-aux, INFP Ne-aux."],
          badge:"Heuristic"},
        footer:"Kunci: tetap cocokkan dengan perilaku nyata." },
  
      { tag:"Jung", title:"Dinamika Jung: Kompensasi & Individuasi",
        subtitle:"Psikis mencari keseimbangan. Growth = integrasi sisi yang tertolak.",
        left:{ heading:"Kompensasi",
          paragraphs:["Dominan sadar cenderung ‘berlebihan’; inferior menyeimbangkan dari tak-sadar."],
          bullets:["Saat stres, inferior muncul ekstrem.","Individuasi = integrasi bayangan.","Tujuan: utuh, bukan ‘sempurna’." ]},
        right:{ heading:"Praktik aman",
          bullets:["Cek pola keputusan nyata & konsisten.","Pisahkan persona vs preferensi.","Jangan pakai MBTI untuk menghakimi."],
          badge:"Depth"},
        footer:"Jung paling berguna untuk growth dan refleksi." },
  
      { tag:"Groups", title:"16 Tipe (4 Kelompok Populer)",
        subtitle:"Pembagian: Diplomats, Analysts, Sentinels, Explorers.",
        left:{ heading:"Pembagian",
          paragraphs:["Ini pengelompokan populer, bukan hukum ilmiah. Pakai untuk ringkas."],
          bullets:[
            "1) DIPLOMATS: ENFJ, ENFP, INFJ, INFP",
            "2) ANALYST : ENTJ, ENTP, INTJ, INTP",
            "3) SENTINELS: ESFJ, ESTJ, ISFJ, ISTJ",
            "4) EXPLORERS: ESTP, ESFP, ISTP, ISFP"
          ]},
        right:{ heading:"Cara baca akurat",
          bullets:["Lihat fungsi/axis, bukan stereotype grup.","Orang bisa punya skill lintas domain.","Konteks hidup memengaruhi ekspresi."],
          badge:"Map, not destiny"},
        footer:"Next: Diplomats → detail." },
  
      { tag:"Diplomats", title:"DIPLOMATS — Makna & Manusia",
        subtitle:"Peka pada nilai, visi, dan relasi; fokus pada growth dan dampak.",
        left:{ heading:"Ciri umum",
          paragraphs:["Fe/Fi dan Ni/Ne membentuk gaya yang berbeda."],
          bullets:["Purpose & human impact.","Empati & potensi orang.","Inspirasi & refleksi nilai."]},
        right:{ heading:"Anggota + stack",
          bullets:["ENFJ (Fe–Ni–Se–Ti)","ENFP (Ne–Fi–Te–Si)","INFJ (Ni–Fe–Ti–Se)","INFP (Fi–Ne–Si–Te)"],
          badge:"soft power 🎀"},
        footer:"Next: ENFJ, ENFP, INFJ, INFP." },
  
      { tag:"Type", title:"ENFJ — Fe–Ni–Se–Ti",
        subtitle:"Menggerakkan orang lewat harmoni (Fe) + arah makna (Ni).",
        left:{ heading:"Kekuatan",
          paragraphs:["Bagus di leadership people-centered & mentoring."],
          bullets:["Fe: peka kebutuhan sosial.","Ni: menyatukan arah & makna.","Se: presence & responsif."]},
        right:{ heading:"Blindspot & growth",
          bullets:["Ti inferior: kabur logika saat emosi tinggi.","Over-caretaking / people-pleasing.","Latih Ti: definisi masalah + cek asumsi."],
          badge:"warm + clear"},
        footer:"ENFJ sehat: hangat + tegas + jernih." },
  
      { tag:"Type", title:"ENFP — Ne–Fi–Te–Si",
        subtitle:"Kemungkinan (Ne) disaring nilai (Fi) → diwujudkan (Te).",
        left:{ heading:"Kekuatan",
          paragraphs:["Bersinar saat ada ruang eksplorasi + misi."],
          bullets:["Ne: ide & peluang.","Fi: meaningful & autentik.","Te: produktif jika tujuan jelas."]},
        right:{ heading:"Blindspot & growth",
          bullets:["Si inferior: konsistensi drop saat bosan.","Overcommit karena kebanyakan opsi.","Latih Si: sistem kecil + review rutin."],
          badge:"ideas → anchors"},
        footer:"Kunci: pilih sedikit yang bernilai, lalu konsisten." },
  
      { tag:"Type", title:"INFJ — Ni–Fe–Ti–Se",
        subtitle:"Visi (Ni) + harmoni (Fe) → insight terarah.",
        left:{ heading:"Kekuatan",
          paragraphs:["Tajam, mendalam, dan suportif saat sehat."],
          bullets:["Ni: foresight & insight.","Fe: komunikasi empatik.","Ti: merapikan logika bila dilatih."]},
        right:{ heading:"Blindspot & growth",
          bullets:["Se inferior: lupa tubuh/realita sekarang.","Overthinking → menunda action.","Latih Se: grounding + prototyping cepat."],
          badge:"vision must land"},
        footer:"INFJ sehat: visi + empati + realisme." },
  
      { tag:"Analyst", title:"ANALYST — Sistem & Strategi",
        subtitle:"Mengutamakan model mental, analisis, dan struktur konsep.",
        left:{ heading:"Ciri umum",
          paragraphs:["NTJ cenderung strategis-eksekutif; NTP eksploratif-konseptual."],
          bullets:["Suka problem-solving kompleks.","Fokus koherensi (Ti) atau efektivitas (Te).","Skeptis, ingin bukti/struktur."]},
        right:{ heading:"Anggota + stack",
          bullets:["ENTJ (Te–Ni–Se–Fi)","ENTP (Ne–Ti–Fe–Si)","INTJ (Ni–Te–Fi–Se)","INTP (Ti–Ne–Si–Fe)"],
          badge:"big brain 🎀"},
        footer:"Next: ringkas tiap tipe Analyst." },
  
      { tag:"Type", title:"ENTJ — Te–Ni–Se–Fi",
        subtitle:"Outcome (Te) + strategi (Ni) → eksekusi tegas.",
        left:{ heading:"Kekuatan",
          paragraphs:["Kuat dalam keputusan, struktur, dan scaling."],
          bullets:["Te: prioritas & sistem.","Ni: arah jangka panjang.","Se: action cepat & berani."]},
        right:{ heading:"Blindspot & growth",
          bullets:["Fi inferior: nilai personal terabaikan → hampa.","Menilai orang hanya dari performa.","Latih Fi: nilai, empati personal, meaning."],
          badge:"Te with heart"},
        footer:"ENTJ sehat: tegas + visioner + manusiawi." },
  
      { tag:"Type", title:"ENTP — Ne–Ti–Fe–Si",
        subtitle:"Eksplorasi ide (Ne) + logika (Ti) → mengguncang asumsi.",
        left:{ heading:"Kekuatan",
          paragraphs:["Kuat di ideation, debat, negosiasi, reframing."],
          bullets:["Ne: inovasi & peluang.","Ti: argumen tajam.","Fe: komunikasi adaptif."]},
        right:{ heading:"Blindspot & growth",
          bullets:["Si inferior: kurang sabar detail rutin.","Sulit komit karena opsi banyak.","Latih Si: dokumentasi + follow-through."],
          badge:"finish what you start"},
        footer:"ENTP sehat: playful + akurat + bertanggung jawab." },
  
      { tag:"Sentinels", title:"SENTINELS — Stabilitas & Kualitas",
        subtitle:"Kuat di konsistensi, duty, dan menjaga standar.",
        left:{ heading:"Ciri umum",
          paragraphs:["SJ: Si kuat + judging (Te/Fe) untuk struktur & reliability."],
          bullets:["Reliability & detail.","Menjaga ritme sistem.","Sering jadi tulang punggung." ]},
        right:{ heading:"Anggota + stack",
          bullets:["ESFJ (Fe–Si–Ne–Ti)","ESTJ (Te–Si–Ne–Fi)","ISFJ (Si–Fe–Ti–Ne)","ISTJ (Si–Te–Fi–Ne)"],
          badge:"steady 🎀"},
        footer:"Next: ringkas tiap tipe Sentinel." },
  
      { tag:"Sentinels", title:"ESFJ • ESTJ • ISFJ • ISTJ (Ringkas)",
        subtitle:"Fokus: fungsi dominan + growth, tanpa stereotip.",
        left:{ heading:"ESFJ & ESTJ",
          paragraphs:["Kunci sehat: fleksibel pada Ne tanpa kehilangan Si."],
          bullets:["ESFJ: Fe+Si; growth Ti (kejelasan).","ESTJ: Te+Si; growth Fi (nilai & empati).","Harmoni vs struktur hasil."]},
        right:{ heading:"ISFJ & ISTJ",
          bullets:["ISFJ: Si+Fe; growth Ne (cara baru).","ISTJ: Si+Te; growth Ne (adaptasi).","Unggul: konsistensi, kualitas, duty."],
          badge:"Si + (Fe/Te)"},
        footer:"Sentinel sehat: kuat standar, tidak anti-perubahan." },
  
      { tag:"Explorers", title:"EXPLORERS — Real-time & Experience",
        subtitle:"Responsif, praktis, dan kuat membaca realita sekarang (Se tinggi).",
        left:{ heading:"Anggota + stack",
          paragraphs:["Benang merah SP: Se tinggi → action; tantangan: arah jangka panjang (Ni)."],
          bullets:["ESTP (Se–Ti–Fe–Ni)","ESFP (Se–Fi–Te–Ni)","ISTP (Ti–Se–Ni–Fe)","ISFP (Fi–Se–Ni–Te)"]},
        right:{ heading:"Ciri & growth",
          bullets:["Kuat: adaptif, action-oriented, grounded.","Jebakan: impulsif / lupa arah jauh.","Latih Ni: tujuan, makna, strategi."],
          badge:"Se + Ni growth"},
        footer:"Next: rekomendasi komunitas typing (PDB)." },
  
      { tag:"Community", title:"Saran: Typology Community di PDB",
        subtitle:"Biar typing kamu makin akurat lewat diskusi & koreksi komunitas.",
        left:{ heading:"Kenapa PDB berguna?",
          paragraphs:["Personality Database (PDB) punya komunitas yang suka debat typology."],
          bullets:["Latih argumentasi berbasis fungsi/axis (bukan vibe).","Kamu bisa posting analisis & minta kritik.","Lihat perbedaan pendapat → belajar nuansa."]},
        right:{ heading:"Cara pakai biar berguna",
          bullets:["Bikin ‘case’: bukti perilaku → mapping fungsi.","Tulis counterexample (biar gak bias).","Revisi typing jika bukti lebih kuat."],
          badge:"learn by debating 🎀"},
        footer:"Reminder: MBTI paling berguna untuk growth, bukan label." }
    ];
  
    // pad to 30
    while (SLIDES.length < 30) {
      const n = SLIDES.length + 1;
      SLIDES.push({
        tag:"Recap",
        title:`Recap ${n} — Latihan Akurasi Typing`,
        subtitle:"Gunakan fungsi + axis: bukti perilaku → mapping → cek lawan axis → revisi.",
        left:{ heading:"Checklist", paragraphs:["Halaman tambahan agar total 30."],
          bullets:["Apa fungsi dominan terlihat dari keputusan nyata?","Axis lawan muncul kapan?","Inferior muncul saat stres seperti apa?"]},
        right:{ heading:"Latihan cepat", bullets:["Tulis 3 bukti perilaku.","Tulis 2 alternatif tipe.","Pilih yang paling konsisten lintas waktu."], badge:"♡ practice"},
        footer:"Konsistensi > vibe."
      });
    }
    if (SLIDES.length > 30) SLIDES.length = 30;
  
    const TOTAL = SLIDES.length;
  
    // ===== Helpers =====
    function el(tag, className){
      const n = document.createElement(tag);
      if (className) n.className = className;
      return n;
    }
    function escapeHtml(str){
      return String(str)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
    }
  
    function renderSlide(slide, number){
      const root = el("div","sheet");
  
      const ribbon = el("div","ribbonline");
      const tag = el("div","tag"); tag.textContent = slide.tag || "Slide";
      const pg = el("div","pageno"); pg.textContent = `${number} / ${TOTAL}`;
      ribbon.append(tag, pg);
  
      const h1 = el("h1","title"); h1.textContent = slide.title;
      const sub = el("p","subtitle"); sub.textContent = slide.subtitle;
      const hr = el("div","hr");
  
      const grid = el("div","grid");
  
      const c1 = el("div","card");
      const h3a = el("h3"); h3a.textContent = slide.left.heading;
      c1.appendChild(h3a);
      (slide.left.paragraphs || []).forEach(t => { const p = el("p"); p.textContent = t; c1.appendChild(p); });
      if (slide.left.bullets?.length){
        const ul = document.createElement("ul");
        slide.left.bullets.forEach(b => { const li = document.createElement("li"); li.textContent = b; ul.appendChild(li); });
        c1.appendChild(ul);
      }
  
      const c2 = el("div","card");
      const h3b = el("h3"); h3b.textContent = slide.right.heading;
      c2.appendChild(h3b);
      (slide.right.paragraphs || []).forEach(t => { const p = el("p"); p.textContent = t; c2.appendChild(p); });
      if (slide.right.bullets?.length){
        const ul = document.createElement("ul");
        slide.right.bullets.forEach(b => { const li = document.createElement("li"); li.textContent = b; ul.appendChild(li); });
        c2.appendChild(ul);
      }
      if (slide.right.badge){
        const p = el("p");
        const badge = el("span","badge");
        badge.textContent = slide.right.badge;
        p.appendChild(badge);
        c2.appendChild(p);
      }
  
      grid.append(c1, c2);
  
      const footer = el("div","footer");
      const fn = el("div","footer__note"); fn.textContent = slide.footer || "";
      const hearts = el("div","footer__hearts"); hearts.textContent = "♡ ♡ ♡";
      footer.append(fn, hearts);
  
      root.append(ribbon, h1, sub, hr, grid, footer);
      return root;
    }
  
    function renderBlankLeft(){
      const slide = {
        tag:"Start",
        title:"⋆｡°✩ Welcome ✩°｡⋆",
        subtitle:"Ini buku MBTI coquette. Tap kanan atau drag pojok kanan bawah untuk mulai.",
        left:{ heading:"Hint", paragraphs:[], bullets:["Tap kanan: Next", "Tap kiri: Prev", "Drag pojok: curl realistis"] },
        right:{ heading:"Enjoy", paragraphs:[], bullets:["Klik ‘Cari’ untuk cari materi cepat", "TOC untuk lompat halaman"], badge:"♡ flip me" },
        footer:"Have fun!"
      };
      return renderSlide(slide, 0);
    }
  
    // ===== State =====
    let idx = 0;
    let busy = false;
  
    function setSpread(index){
      rightPage.innerHTML = "";
      leftPage.innerHTML = "";
  
      rightPage.appendChild(renderSlide(SLIDES[index], index+1));
      if (index-1 >= 0) leftPage.appendChild(renderSlide(SLIDES[index-1], index));
      else leftPage.appendChild(renderBlankLeft());
  
      progressPill.textContent = `Halaman ${index+1} / ${TOTAL}`;
      btnPrev.disabled = index === 0;
      btnNext.disabled = index === TOTAL - 1;
      btnPrev.style.opacity = btnPrev.disabled ? .55 : 1;
      btnNext.style.opacity = btnNext.disabled ? .55 : 1;
  
      // Reset scroll per page supaya rapih saat pindah
      leftPage.scrollTop = 0;
      rightPage.scrollTop = 0;
    }
  
    // ===== Curl overlay mechanics =====
    const drag = {
      active:false,
      mode:null,  // "next" | "prev"
      p:0,
      rect:null,
      lastX:0,
      lastY:0
    };
  
    function setTurnVars(p, mx, my){
      const cp = Math.max(0, Math.min(1, p));
      const cmx = Math.max(0, Math.min(1, mx));
      const cmy = Math.max(0, Math.min(1, my));
  
      const shine = 0.10 + cp * 0.55;
      const shade = 0.12 + cp * 0.55;
  
      turnSheet.style.setProperty("--p", String(cp));
      turnSheet.style.setProperty("--mx", String(cmx));
      turnSheet.style.setProperty("--my", String(cmy));
      turnSheet.style.setProperty("--shine", String(shine));
      turnSheet.style.setProperty("--shade", String(shade));
  
      if (drag.mode === "next"){
        turnSheet.style.transform = `rotateY(${-180*cp}deg)`;
      } else {
        turnSheet.style.transform = `rotateY(${180*(1-cp)}deg)`;
      }
    }
  
    function openTurnSheet(mode){
      drag.mode = mode;
      turnFront.innerHTML = "";
      turnBack.innerHTML = "";
  
      if (mode === "next"){
        if (idx >= TOTAL-1) return false;
        turnSheet.classList.remove("mode-prev");
        turnSheet.classList.add("mode-next","is-on");
        turnFront.appendChild(renderSlide(SLIDES[idx], idx+1));
        turnBack.appendChild(renderSlide(SLIDES[idx], idx+1));
        setTurnVars(0, 0.92, 0.90);
        return true;
      }
  
      if (idx <= 0) return false;
      const returning = idx-1;
      turnSheet.classList.remove("mode-next");
      turnSheet.classList.add("mode-prev","is-on");
      turnFront.appendChild(renderSlide(SLIDES[returning], returning+1));
      turnBack.appendChild(renderSlide(SLIDES[returning], returning+1));
      setTurnVars(0, 0.08, 0.90);
      return true;
    }
  
    function closeTurnSheet(){
      turnSheet.classList.remove("is-on","mode-next","mode-prev");
      turnSheet.style.transform = "";
      drag.mode = null;
      setTurnVars(0, 0.5, 0.85);
    }
  
    function computeProgress(clientX, clientY){
      const r = drag.rect;
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
  
      let p;
      if (drag.mode === "next") p = (1 - x) / 0.68;
      else p = (x) / 0.68;
  
      p = Math.max(0, Math.min(1, p));
      return { p, mx:x, my:y };
    }
  
    function snapTo(target, done){
      const start = drag.p;
      const end = target;
      const t0 = performance.now();
      const dur = 220;
      const easeOut = (t) => 1 - Math.pow(1-t,3);
  
      function step(now){
        const t = Math.min(1, (now - t0)/dur);
        const v = start + (end-start)*easeOut(t);
        drag.p = v;
  
        const r = drag.rect || spreadEl.getBoundingClientRect();
        const mx = (drag.lastX - r.left)/r.width;
        const my = (drag.lastY - r.top)/r.height;
        setTurnVars(v, mx, my);
  
        if (t < 1) requestAnimationFrame(step);
        else done?.();
      }
      requestAnimationFrame(step);
    }
  
    function commitFlip(){
      if (drag.mode === "next") idx++;
      else idx--;
      setSpread(idx);
      closeTurnSheet();
    }
  
    function cancelFlip(){
      closeTurnSheet();
    }
  
    function startDrag(mode, e){
      if (busy) return;
      if (mode === "next" && idx >= TOTAL-1) return;
      if (mode === "prev" && idx <= 0) return;
  
      const ok = openTurnSheet(mode);
      if (!ok) return;
  
      drag.active = true;
      drag.rect = spreadEl.getBoundingClientRect();
      drag.p = 0;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
  
      try { e.target.setPointerCapture(e.pointerId); } catch {}
  
      hintPill.style.opacity = 0.55;
      clearTimeout(window.__hintTimer);
      window.__hintTimer = setTimeout(() => (hintPill.style.opacity = 1), 700);
  
      e.preventDefault();
    }
  
    function onDragMove(e){
      if (!drag.active) return;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
  
      const {p, mx, my} = computeProgress(e.clientX, e.clientY);
      drag.p = p;
      setTurnVars(p, mx, Math.max(0.05, Math.min(0.98, my)));
      e.preventDefault();
    }
  
    function endDrag(e){
      if (!drag.active) return;
  
      drag.active = false;
      busy = true;
  
      const commit = drag.p > 0.45;
      if (commit){
        snapTo(1, () => { commitFlip(); busy = false; });
      } else {
        snapTo(0, () => { cancelFlip(); busy = false; });
      }
  
      e.preventDefault();
    }
  
    dragNext.addEventListener("pointerdown", (e)=>startDrag("next", e));
    dragPrev.addEventListener("pointerdown", (e)=>startDrag("prev", e));
  
    window.addEventListener("pointermove", onDragMove, { passive:false });
    window.addEventListener("pointerup", endDrag, { passive:false });
    window.addEventListener("pointercancel", endDrag, { passive:false });
  
    // Tap flip
    function tapNext(){
      if (busy || idx >= TOTAL-1) return;
      busy = true;
      if (!openTurnSheet("next")) { busy = false; return; }
  
      drag.rect = spreadEl.getBoundingClientRect();
      drag.lastX = drag.rect.left + drag.rect.width * 0.85;
      drag.lastY = drag.rect.top + drag.rect.height * 0.82;
      drag.p = 0;
  
      snapTo(1, () => { commitFlip(); busy = false; });
    }
  
    function tapPrev(){
      if (busy || idx <= 0) return;
      busy = true;
      if (!openTurnSheet("prev")) { busy = false; return; }
  
      drag.rect = spreadEl.getBoundingClientRect();
      drag.lastX = drag.rect.left + drag.rect.width * 0.15;
      drag.lastY = drag.rect.top + drag.rect.height * 0.82;
      drag.p = 0;
  
      snapTo(1, () => { commitFlip(); busy = false; });
    }
  
    zoneRight.addEventListener("click", (e)=>{ tapNext(); e.preventDefault(); });
    zoneLeft.addEventListener("click", (e)=>{ tapPrev(); e.preventDefault(); });
    btnNext.addEventListener("click", tapNext);
    btnPrev.addEventListener("click", tapPrev);
  
    // Keyboard
    window.addEventListener("keydown", (e)=>{
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
  
      if (e.key === "ArrowRight") tapNext();
      if (e.key === "ArrowLeft") tapPrev();
      if (e.key === "Home") { idx = 0; setSpread(idx); }
      if (e.key === "End") { idx = TOTAL-1; setSpread(idx); }
      if (e.key === "/") { // shortcut search
        e.preventDefault();
        openModal("search");
        setTimeout(()=>searchInput.focus(), 50);
      }
    });
  
    // ===== Modals =====
    function openModal(which){
      const m = which === "toc" ? tocModal : which === "help" ? helpModal : searchModal;
      m.classList.add("is-open");
      m.setAttribute("aria-hidden","false");
    }
    function closeModal(which){
      const m = which === "toc" ? tocModal : which === "help" ? helpModal : searchModal;
      m.classList.remove("is-open");
      m.setAttribute("aria-hidden","true");
    }
  
    btnToc.addEventListener("click", ()=>openModal("toc"));
    btnHelp.addEventListener("click", ()=>openModal("help"));
    btnSearch.addEventListener("click", ()=>{ openModal("search"); setTimeout(()=>searchInput.focus(), 50); });
  
    document.querySelectorAll("[data-close='toc']").forEach(n=>n.addEventListener("click", ()=>closeModal("toc")));
    document.querySelectorAll("[data-close='help']").forEach(n=>n.addEventListener("click", ()=>closeModal("help")));
    document.querySelectorAll("[data-close='search']").forEach(n=>n.addEventListener("click", ()=>closeModal("search")));
  
    window.addEventListener("keydown", (e)=>{
      if (e.key === "Escape"){ closeModal("toc"); closeModal("help"); closeModal("search"); }
    });
  
    function buildTOC(){
      const wrap = document.createElement("div");
      wrap.className = "toc";
  
      SLIDES.forEach((s,i)=>{
        const item = document.createElement("div");
        item.className = "toc__item";
        item.tabIndex = 0;
        item.innerHTML = `
          <div class="toc__k">#${String(i+1).padStart(2,"0")} • ${escapeHtml(s.tag || "Slide")}</div>
          <div class="toc__t">${escapeHtml(s.title)}</div>
          <div class="toc__s">${escapeHtml(s.subtitle)}</div>
        `;
        item.addEventListener("click", ()=>{
          closeModal("toc");
          idx = i;
          setSpread(idx);
        });
        item.addEventListener("keydown",(ev)=>{
          if (ev.key === "Enter" || ev.key === " "){
            closeModal("toc");
            idx = i;
            setSpread(idx);
          }
        });
        wrap.appendChild(item);
      });
  
      tocList.innerHTML = "";
      tocList.appendChild(wrap);
    }
  
    // ===== Search =====
    function slideSearchText(slide){
      const parts = [
        slide.tag, slide.title, slide.subtitle,
        slide.left?.heading, ...(slide.left?.paragraphs || []), ...(slide.left?.bullets || []),
        slide.right?.heading, ...(slide.right?.paragraphs || []), ...(slide.right?.bullets || []),
        slide.right?.badge, slide.footer
      ].filter(Boolean);
      return parts.join(" ").toLowerCase();
    }
  
    const SEARCH_INDEX = SLIDES.map(slideSearchText);
  
    function renderSearchResults(query){
      searchResults.innerHTML = "";
      if (!query) return;
  
      const q = query.toLowerCase().trim();
      if (!q) return;
  
      let count = 0;
      for (let i=0; i<TOTAL; i++){
        if (SEARCH_INDEX[i].includes(q)){
          count++;
          const s = SLIDES[i];
          const item = document.createElement("div");
          item.className = "toc__item";
          item.innerHTML = `
            <div class="toc__k">Halaman ${i+1} • ${escapeHtml(s.tag || "Slide")}</div>
            <div class="toc__t">${escapeHtml(s.title)}</div>
            <div class="toc__s">${escapeHtml(s.subtitle)}</div>
          `;
          item.onclick = ()=>{
            idx = i;
            setSpread(idx);
            closeModal("search");
          };
          searchResults.appendChild(item);
        }
      }
  
      if (count === 0){
        const empty = document.createElement("div");
        empty.className = "toc__item";
        empty.style.opacity = "0.8";
        empty.innerHTML = `
          <div class="toc__t">Tidak ada hasil</div>
          <div class="toc__s">Coba kata lain, misalnya: <b>Ni</b>, <b>Se</b>, <b>Axis</b>, <b>Diplomats</b>, <b>Jung</b>.</div>
        `;
        searchResults.appendChild(empty);
      }
    }
  
    searchInput.addEventListener("input", ()=>renderSearchResults(searchInput.value));
  
    // ===== Init =====
    buildTOC();
    setSpread(idx);
  });
  