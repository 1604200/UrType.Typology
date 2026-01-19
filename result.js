(() => {
    const RESULT_KEY = "urtype_last_result_v1";
    const $ = (id) => document.getElementById(id);
  
    const STACKS = {
      ENFJ:["Fe","Ni","Se","Ti"], ENTJ:["Te","Ni","Se","Fi"],
      ENFP:["Ne","Fi","Te","Si"], ENTP:["Ne","Ti","Fe","Si"],
      ESFJ:["Fe","Si","Ne","Ti"], ESTJ:["Te","Si","Ne","Fi"],
      ESFP:["Se","Fi","Te","Ni"], ESTP:["Se","Ti","Fe","Ni"],
      INFJ:["Ni","Fe","Ti","Se"], INTJ:["Ni","Te","Fi","Se"],
      INFP:["Fi","Ne","Si","Te"], INTP:["Ti","Ne","Si","Fe"],
      ISFJ:["Si","Fe","Ti","Ne"], ISTJ:["Si","Te","Fi","Ne"],
      ISFP:["Fi","Se","Ni","Te"], ISTP:["Ti","Se","Ni","Fe"],
    };
  
    const ROLE_LABELS = ["Dominant", "Auxiliary", "Tertiary", "Inferior"];
  
    const FN = {
      Fe: {
        title: "Fe — Extraverted Feeling",
        journal: [
          "Fe bekerja seperti radar sosial: ia menangkap atmosfer, kebutuhan, serta dinamika emosi orang lain secara cepat. Fe cenderung memprioritaskan ‘apa yang membuat hubungan sehat’ dan ‘apa yang membuat kelompok tetap harmonis’.",
          "Pada kondisi matang, Fe bukan sekadar menyenangkan orang. Fe matang mampu tegas demi menjaga relasi tetap jujur dan sehat, bukan sekadar damai di permukaan.",
          "Fe juga punya sisi beban: karena kamu sering merasa bertanggung jawab atas suasana. Jika tidak punya batas, Fe bisa menjadi pola ‘mengurus semua orang’ yang menguras energi."
        ],
        strengths: [
          "Peka membaca kebutuhan orang dan perubahan mood.",
          "Mudah membangun koneksi, menyatukan kelompok, dan jadi mediator.",
          "Komunikasi adaptif: tahu kapan halus, kapan direct."
        ],
        pitfalls: [
          "People-pleasing dan rasa bersalah saat mengecewakan.",
          "Menahan opini/emosi sendiri demi harmoni.",
          "Emotional labor berlebihan: menanggung beban perasaan orang lain."
        ],
        examples: [
          "Kamu menyadari ada yang tersisih di grup lalu membuka ruang agar ia ikut terlibat.",
          "Kamu mengatur cara bicara supaya konflik tidak meledak, baru masuk substansi.",
          "Kamu cepat menilai: ‘kalau aku ngomong begini, dampaknya ke orang lain gimana?’"
        ]
      },
      Ni: {
        title: "Ni — Introverted Intuition",
        journal: [
          "Ni adalah mesin makna. Ia mengumpulkan pola-pola kecil, lalu ‘mengunci’ satu insight besar tentang arah dan konsekuensi.",
          "Ni sering terasa seperti ‘tahu saja’ tanpa bisa menjelaskan prosesnya. Itu karena Ni bekerja secara internal: menyaring informasi menjadi benang merah.",
          "Ni yang sehat memberi kamu visi jangka panjang. Ni yang lelah bisa membuatmu overthinking atau mengunci satu narasi meski data baru muncul."
        ],
        strengths: [
          "Visioner: fokus pada arah hidup/tujuan jangka panjang.",
          "Mendeteksi inti masalah di balik banyak detail.",
          "Strategi dan antisipasi konsekuensi."
        ],
        pitfalls: [
          "Over-interpret sinyal kecil.",
          "Terlalu yakin pada satu narasi.",
          "Susah menjelaskan ‘kenapa’ ke orang lain."
        ],
        examples: [
          "Kamu bisa ‘membaca’ arah hubungan/kerja sama dari pola komunikasi.",
          "Kamu suka roadmap, bukan cuma to-do list harian.",
          "Kamu lebih nyaman dengan satu visi jelas daripada banyak opsi setengah matang."
        ]
      },
      Se: {
        title: "Se — Extraverted Sensing",
        journal: [
          "Se adalah kemampuan hadir di realita: menangkap apa yang terjadi sekarang dan merespons cepat.",
          "Se menyeimbangkan Ni yang sering jauh di kepala: Se mengembalikan kamu ke aksi nyata, momentum, dan pengalaman langsung.",
          "Se yang sehat membuatmu adaptif dan berani mencoba. Se yang tidak terarah bisa menjadi impulsif."
        ],
        strengths: [
          "Respons cepat dan praktis.",
          "Mudah adaptasi di situasi dinamis.",
          "Membantu eksekusi: ‘jalanin dulu’."
        ],
        pitfalls: [
          "Impulsif saat stres atau bosan.",
          "Mengejar stimulasi sebagai pelarian.",
          "Sulit konsisten kalau rutinitas terlalu datar."
        ],
        examples: [
          "Kalau ada masalah, kamu lebih tenang saat bisa melakukan langkah konkret.",
          "Kamu cepat menyesuaikan diri saat plan berubah.",
          "Kamu menikmati pengalaman yang hidup (event, aktivitas, turun lapangan)."
        ]
      },
      Ti: {
        title: "Ti — Introverted Thinking",
        journal: [
          "Ti adalah editor logika internal: konsistensi, definisi jelas, dan struktur yang rapi.",
          "Dalam stack ENFJ, Ti sering inferior: potensinya besar, tapi muncul kuat saat kamu lelah atau saat kamu perlu memutus siklus ‘mengurus semua orang’.",
          "Ti yang dilatih pelan-pelan membuatmu stabil: kamu bisa menolong tanpa kehilangan objektivitas, dan bisa memimpin tanpa menanggung semuanya sendirian."
        ],
        strengths: [
          "Analitis: memecah masalah jadi bagian-bagian kecil.",
          "Mendeteksi kontradiksi dan ketidakkonsistenan.",
          "Membantu keputusan lebih jernih."
        ],
        pitfalls: [
          "Inner critic: mengkritik diri karena ‘kurang logis’.",
          "Mode dingin mendadak saat lelah.",
          "Overthinking dan perfeksionis."
        ],
        examples: [
          "Setelah konflik, kamu menganalisis: ‘akar masalahnya apa? polanya salah di mana?’",
          "Kamu merapikan sistem kerja agar lebih logis dan jelas.",
          "Kamu merasa aman jika struktur masalahnya sudah ketemu."
        ]
      },
      Ne:{ title:"Ne — Extraverted Intuition", journal:["Ne melihat banyak kemungkinan dan ide baru, menyambungkan hal yang tampak tidak berkaitan."], strengths:["Kreatif, improvisasi cepat."], pitfalls:["Mudah terdistraksi."], examples:["Bisa menghasilkan banyak ide sekaligus."]},
      Si:{ title:"Si — Introverted Sensing", journal:["Si berakar pada pengalaman: detail, stabilitas, dan referensi yang terbukti."], strengths:["Teliti, konsisten."], pitfalls:["Terlalu nyaman di pola lama."], examples:["Ingat detail kecil yang orang lain lupa."]},
      Te:{ title:"Te — Extraverted Thinking", journal:["Te mengatur dunia luar lewat target, struktur, dan efisiensi."], strengths:["Eksekusi kuat, tegas."], pitfalls:["Terlalu keras/tergesa."], examples:["Suka SOP dan indikator jelas."]},
      Fi:{ title:"Fi — Introverted Feeling", journal:["Fi berpatokan pada nilai personal dan keaslian: ‘ini selaras dengan hatiku nggak?’"], strengths:["Autentik, loyal pada nilai."], pitfalls:["Sulit kompromi saat nilai tersentuh."], examples:["Memilih yang selaras nilai walau tidak populer."]}
    };
  
    function safeParse(s){ try { return JSON.parse(s); } catch { return null; } }
  
    // ✅ Auto load image from /images based on MBTI type, with extension fallback
    function setImage(type){
      const t = String(type || "").trim().toLowerCase();
      const img = $("typeImg");
      const hint = $("photoHint");
      if (!img) return;
  
      const candidates = [
        `images/${t}.jpg`, `images/${t}.jpeg`, `images/${t}.png`, `images/${t}.webp`,
        `images/${t}.JPG`, `images/${t}.JPEG`, `images/${t}.PNG`, `images/${t}.WEBP`,
      ];
  
      let i = 0;
      const tryNext = () => {
        if (i >= candidates.length){
          img.src = "images/enfj.jpg";
          if (hint) hint.textContent = `Gagal load images/${t}.* → fallback images/enfj.jpg (cek nama file & folder images/)`;
          return;
        }
        const src = candidates[i++];
        img.src = src;
        if (hint) hint.textContent = `Foto: ${src}`;
        img.onerror = () => tryNext();
        img.onload = () => { img.onerror = null; };
      };
      tryNext();
    }
  
    function renderCF(scores){
      const grid = $("cfGrid");
      if (!grid || !scores) return;
  
      const rows = [
        ["Ne","cf-ne"], ["Ni","cf-ni"], ["Se","cf-se"], ["Si","cf-si"],
        ["Te","cf-te"], ["Ti","cf-ti"], ["Fe","cf-fe"], ["Fi","cf-fi"]
      ];
  
      let topFn = rows[0][0];
      for (const [fn] of rows){
        if ((scores[fn] ?? 0) > (scores[topFn] ?? 0)) topFn = fn;
      }
      $("cfTopNote").textContent = `Top: ${topFn}`;
  
      grid.innerHTML = "";
      for (const [fn, cls] of rows){
        const val = scores[fn] ?? 0;
        const pct = Math.max(0, Math.min(100, (val/50)*100));
        const row = document.createElement("div");
        row.className = `cf-row ${cls}` + (fn === topFn ? " top" : "");
        row.innerHTML = `
          <div class="cf-tag">${fn}</div>
          <div class="cf-bar"><i style="width:${pct.toFixed(1)}%"></i></div>
          <div class="cf-val">${val}</div>
        `;
        grid.appendChild(row);
      }
    }
  
    function fnCard(fn, role){
      const mat = FN[fn] || { title: fn, journal:["Materi belum tersedia."], strengths:[], pitfalls:[], examples:[] };
      const journal = (mat.journal || []).map(p => `<p>${p}</p>`).join("");
      const strengths = mat.strengths?.length ? `<p><b>Kekuatan:</b></p><ul>${mat.strengths.map(x=>`<li>${x}</li>`).join("")}</ul>` : "";
      const pitfalls = mat.pitfalls?.length ? `<p><b>Potensi jebakan:</b></p><ul>${mat.pitfalls.map(x=>`<li>${x}</li>`).join("")}</ul>` : "";
      const examples = mat.examples?.length ? `<p><b>Contoh nyata:</b></p><ul>${mat.examples.map(x=>`<li>${x}</li>`).join("")}</ul>` : "";
  
      const el = document.createElement("div");
      el.className = "fn-card";
      el.innerHTML = `
        <div class="fn-head">
          <div class="fn-name">${mat.title}</div>
          <div class="fn-role">${role}</div>
        </div>
        <div class="fn-body">
          ${journal}
          ${strengths}
          ${pitfalls}
          ${examples}
        </div>
      `;
      return el;
    }
  
    function typeJournal(type){
      const t = type.toUpperCase();
      const stack = STACKS[t] || ["Fe","Ni","Se","Ti"];
  
      if (t === "ENFJ"){
        return {
          preface: `
            <p>Anggap hasil ini sebagai <b>catatan observasi</b> tentang pola: bagaimana kamu menilai, berinteraksi, dan membuat keputusan. Ini bukan vonis, tapi peta.</p>
            <blockquote>
              Kamu tidak harus “menjadi” ENFJ selamanya. Yang terjadi adalah: pola dominanmu saat ini paling mirip ENFJ.
            </blockquote>
            <p>Di bawah ini aku jelasin tipe dulu, baru fungsi kognitif satu per satu, lalu masuk ke relasi, kerja, stres, dan rencana pengembangan.</p>
          `,
          typeEssay: `
            <p><b>ENFJ</b> sering seperti “penggerak manusia”: kamu membaca emosi, menyusun kata, dan mengangkat orang agar bergerak ke arah yang lebih baik.</p>
            <p>Di inti ENFJ ada kombinasi: <b>Fe (kepedulian sosial)</b> + <b>Ni (visi)</b>. Kamu bukan sekadar hangat—kamu cenderung memiliki arah. Kamu melihat potensi orang, lalu membantu mereka “tumbuh”.</p>
            <p>ENFJ biasanya menjadi penghubung: menghubungkan orang dengan orang, orang dengan tujuan, tujuan dengan tindakan. Ketika sehat, ini membuatmu jadi mentor dan pemimpin yang kuat. Ketika lelah, kamu bisa menanggung beban emosional terlalu besar.</p>
            <p><b>Tantangan klasik ENFJ:</b> membedakan “aku peduli” dengan “aku bertanggung jawab atas semuanya”. Kamu tetap boleh peduli tanpa membakar diri.</p>
          `,
          stackEssay: `
            <p>Function stack kamu: <b>${stack.join("–")}</b>. Ini seperti alur otomatis saat kamu menghadapi dunia.</p>
            <ul>
              <li><b>Fe (Dominant):</b> mulai dari manusia: relasi, emosi, harmoni.</li>
              <li><b>Ni (Auxiliary):</b> lanjut ke makna dan arah: konsekuensi jangka panjang.</li>
              <li><b>Se (Tertiary):</b> turun ke realita: aksi, momentum, adaptasi.</li>
              <li><b>Ti (Inferior):</b> merapikan struktur: logika, definisi, batas.</li>
            </ul>
            <p>Itu sebabnya kamu bisa terasa hangat dan visioner, tapi kadang mendadak sangat kritis saat Ti muncul—biasanya saat energi sosialmu terkuras.</p>
          `,
          socialEssay: `
            <p>Dalam relasi, ENFJ menunjukkan cinta lewat <b>keterlibatan</b>: perhatian detail, mendengar, memberi rasa aman, dan memastikan orang “baik-baik saja”.</p>
            <p>Kamu peka pada perubahan energi orang. Di sisi baik, kamu suportif. Di sisi berat, kamu bisa menanggung beban emosi tanpa diminta.</p>
            <blockquote>Harmoni bukan berarti tidak ada konflik. Harmoni yang sehat adalah konflik yang dikelola dengan matang.</blockquote>
            <p>Kamu butuh orang yang jujur dan konsisten—yang bisa menghargai effort emosionalmu, bukan memanfaatkannya.</p>
          `,
          workEssay: `
            <p>Dalam kerja, kamu kuat dalam <b>orchestrating</b>: menyatukan orang, menjaga komunikasi, dan membuat tim bergerak rapi.</p>
            <p>Keputusanmu sering dimulai dari dampak ke manusia, lalu Ni masuk: “konsekuensi jangka panjangnya apa?”. Kamu suka solusi yang bukan cuma cepat, tapi punya makna dan struktur.</p>
            <p>Lingkungan kerja yang kasar/ambigu biasanya menguras Fe-mu. Kamu akan jauh lebih stabil jika ada batas peran, tujuan jelas, dan ruang untuk recharge.</p>
          `,
          stressEssay: `
            <p>Saat stres, ENFJ sering masuk mode: <b>“aku harus memperbaiki semuanya”</b>. Fe menambah beban, Ni membuat narasi besar, lalu Ti muncul sebagai kritik tajam.</p>
            <p><b>Tanda overload:</b> sensitif, merasa tidak dihargai, ingin kontrol, atau mengisolasi diri sambil mengkritik dalam kepala.</p>
            <p>Solusinya bukan “lebih keras”, tapi <b>lebih jelas</b>: batas, prioritas, dan langkah kecil (Se) sambil merapikan struktur (Ti).</p>
          `,
          growthEssay: `
            <p><b>Rencana pengembangan yang realistis:</b></p>
            <ul>
              <li><b>Boundary 2 kalimat:</b> “Aku pengen bantu, tapi aku cuma bisa di jam X.” / “Aku nggak bisa sekarang, tapi aku bisa besok.”</li>
              <li><b>Ti journaling (5 menit):</b> pisahkan “fakta” vs “interpretasi”. Ini menenangkan Ni.</li>
              <li><b>Se grounding:</b> saat kepala penuh, lakukan aksi kecil (jalan 10 menit, checklist 3 hal).</li>
              <li><b>Tanya langsung:</b> daripada menebak-nebak, “Kamu butuh apa dari aku?”</li>
              <li><b>Prioritas:</b> pilih 1–2 orang/tujuan yang paling penting dulu.</li>
            </ul>
            <blockquote>Tujuanmu bukan berhenti peduli. Tujuanmu adalah peduli tanpa membakar dirimu sendiri.</blockquote>
          `
        };
      }
  
      // Generic long-form for other types
      return {
        preface: `
          <p>Hasil ini adalah catatan pola: bagaimana kamu memproses informasi dan membuat keputusan. Ini bukan vonis, tapi peta.</p>
          <blockquote>Kamu boleh berubah. Yang penting kamu paham pola dominanmu hari ini.</blockquote>
        `,
        typeEssay: `
          <p><b>${t}</b> adalah pola preferensi. Kamu mungkin cocok di beberapa bagian dan tidak cocok di bagian lain—itu normal.</p>
          <p>Yang penting: tipe adalah bahasa untuk memahami <b>kebiasaan berpikir</b>, bukan untuk mengurung kamu.</p>
        `,
        stackEssay: `
          <p>Function stack kamu: <b>${stack.join("–")}</b>. Dominant paling otomatis bekerja, auxiliary menyeimbangkan, tertiary memberi rasa “fun/impuls”, dan inferior area yang butuh dilatih pelan-pelan.</p>
        `,
        socialEssay: `<p>Dalam relasi, tipe ${t} punya dinamika khas sesuai stack. Perhatikan pola saat konflik: menahan, meledak, atau menghindar—itu sering terkait fungsi inferior.</p>`,
        workEssay: `<p>Dalam kerja, ${t} biasanya unggul pada area tertentu. Gunakan itu sebagai kekuatan, lalu bangun sistem kecil untuk menutup sisi lemah.</p>`,
        stressEssay: `<p>Saat stres, orang sering “dibajak” fungsi yang jarang dipakai. Kembalikan diri ke langkah kecil, fakta, dan turunkan tuntutan pada diri.</p>`,
        growthEssay: `<p>Latih 1 kebiasaan kecil untuk menyeimbangkan dominant function, konsisten 2–4 minggu, lalu evaluasi perubahan.</p>`
      };
    }
  
    function exportJSON(data){
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "urtype-result.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    }
  
    // ✅ Build email content
    function buildEmailText({ grant, axis, myersFunc, myersLetter, stack, scores, timestamp }) {
      const lines = [];
      lines.push("UR TYPE! - Hasil Tes MBTI Cognitive Function");
      lines.push("");
      lines.push(`Tanggal: ${timestamp}`);
      lines.push("");
      lines.push("Ringkasan:");
      lines.push(`- Grant/Jung Function Type: ${grant}`);
      lines.push(`- Axis-based Function Type: ${axis}`);
      lines.push(`- Myers Function Type: ${myersFunc}`);
      lines.push(`- Myers Letter Type: ${myersLetter}`);
      lines.push(`- Function Stack: ${stack.join("-")}`);
      lines.push("");
  
      if (scores) {
        lines.push("Skor Fungsi (0–50):");
        const order = ["Ne","Ni","Se","Si","Te","Ti","Fe","Fi"];
        for (const k of order) lines.push(`- ${k}: ${scores[k] ?? 0}`);
        lines.push("");
      }
  
      lines.push("Catatan:");
      lines.push("Email ini dibuat otomatis dari halaman result.");
      lines.push("Silakan cek ulang isi dan klik Send di Gmail.");
      return lines.join("\n");
    }
  
    // ✅ Open Gmail Compose (uses currently logged-in Gmail in browser)
    function openGmailCompose(to, subject, body) {
      const url =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        (to ? `&to=${encodeURIComponent(to)}` : "") +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
  
      window.open(url, "_blank", "noopener,noreferrer");
    }
  
    function init(){
      const raw = localStorage.getItem(RESULT_KEY);
      const data = raw ? safeParse(raw) : null;
  
      if (!data){
        $("typeBig").textContent = "—";
        $("preface").innerHTML = `<p>Data hasil belum ditemukan. Balik ke <b>test.html</b> lalu klik <b>Lanjut</b>.</p>`;
        return;
      }
  
      const analysis = data.analysis || {};
      const grant = (analysis.grant_jung_function_type || "ENFJ").toUpperCase();
      const axis = analysis.axis_based_function_type || "—";
      const myersFunc = analysis.myers_function_type || "—";
      const myersLetter = analysis.myers_letter_type || "—";
      const scores = analysis.function_scores_0_50 || null;
  
      $("typeBig").textContent = grant;
      $("grantType").textContent = grant;
      $("axisType").textContent = axis;
      $("myersFuncType").textContent = myersFunc;
      $("myersLetterType").textContent = myersLetter;
  
      const stack = STACKS[grant] || ["Fe","Ni","Se","Ti"];
      $("stackPill").textContent = stack.join("–");
  
      setImage(grant);
      renderCF(scores);
  
      const journal = typeJournal(grant);
      $("preface").innerHTML = journal.preface;
      $("typeEssay").innerHTML = journal.typeEssay;
      $("stackEssay").innerHTML = journal.stackEssay;
      $("socialEssay").innerHTML = journal.socialEssay;
      $("workEssay").innerHTML = journal.workEssay;
      $("stressEssay").innerHTML = journal.stressEssay;
      $("growthEssay").innerHTML = journal.growthEssay;
  
      const list = $("fnList");
      list.innerHTML = "";
      stack.forEach((fn, idx) => list.appendChild(fnCard(fn, ROLE_LABELS[idx] || "Function")));
  
      // export
      $("exportBtn")?.addEventListener("click", () => exportJSON(data));
  
      // ✅ Gmail send button
      const emailToEl = $("emailTo");
      const sendBtn = $("sendGmailBtn");
      if (sendBtn) {
        sendBtn.addEventListener("click", () => {
          const to = (emailToEl?.value || "").trim();
          const subject = `UR TYPE Result — ${grant} (${stack.join("-")})`;
          const body = buildEmailText({
            grant,
            axis,
            myersFunc,
            myersLetter,
            stack,
            scores,
            timestamp: data.timestamp || new Date().toISOString()
          });
          openGmailCompose(to, subject, body);
        });
      }
    }
  
    document.addEventListener("DOMContentLoaded", init);
  })();
  