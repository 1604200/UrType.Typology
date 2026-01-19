/* =================================================
   Violet AI — FINAL FULL CODE (STABLE & CLICKABLE)
   HTML / CSS / JS ONLY
================================================= */

const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const profileInput = document.getElementById("profileInput");

const TEST_LINK = "https://sakinorva.net/functions?lang=id";
let userAvatarDataUrl = null;

/* ===============================
   Utils
================================ */
function uid(){ return Math.random().toString(36).slice(2); }
function normalize(s){ return (s||"").toLowerCase().trim(); }

/* ===============================
   Simple renderer (SAFE)
================================ */
function renderText(text){
  return `<div class="rt">${text
    .replace(/\n/g,"<br>")
  }</div>`;
}

/* ===============================
   Conversation state
================================ */
let conversation = [];

/* ===============================
   Render chat
================================ */
function render(){
  chatEl.innerHTML = "";

  conversation.forEach(m=>{
    const row = document.createElement("div");
    row.className = `msg ${m.role}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    if(m.role === "ai"){
      avatar.classList.add("ai-orb");
      avatar.innerHTML = `<div class="bubble-orb"></div>`;
    } else {
      avatar.title = "Klik untuk upload foto";
      avatar.onclick = ()=>profileInput.click();
      if(userAvatarDataUrl){
        const img = document.createElement("img");
        img.src = userAvatarDataUrl;
        avatar.appendChild(img);
      } else {
        avatar.textContent = "U";
      }
    }

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = m.html || renderText(m.text);

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatEl.appendChild(row);
  });

  chatEl.parentElement.scrollTop = chatEl.parentElement.scrollHeight;
}

function addMessage(role, text, html=false){
  conversation.push({
    id: uid(),
    role,
    text,
    html: html ? text : null
  });
  render();
}

/* ===============================
   Intro otomatis
================================ */
function intro(){
  addMessage("ai", `
<b>Halo, aku Violet 🌸</b><br><br>
Aku adalah AI edukatif untuk membantu memahami:<br>
• <b>MBTI</b><br>
• <b>Teori Carl Jung</b><br>
• <b>Fungsi Kognitif</b> (Ni, Ne, Si, Se, Ti, Te, Fi, Fe)<br><br>

<b>Cara pakai Violet AI:</b><br>
• Tanya teori → <i>"Ni vs Ne"</i><br>
• Ketik tipe → <i>INFJ</i>, <i>ENFP</i>, dll<br>
• Bandingkan → <i>INFJ vs INFP</i><br>
• Tes fungsi → ketik <b>mulai tes</b><br><br>

<i>Catatan: Violet AI adalah alat edukasi & refleksi diri, bukan diagnosis klinis.</i>
`, true);
}

/* ===============================
   Open test (100% WORK)
================================ */
function openTest(){
  window.open(TEST_LINK, "_blank", "noopener,noreferrer");
}

/* ===============================
   Handle "mulai tes"
================================ */
function showTestButton(){
  addMessage("ai", `
<b>Mulai Tes Fungsi Kognitif</b><br><br>
Tes ini menggunakan metode <b>Sakinorva</b> (Bahasa Indonesia).<br><br>

<button onclick="openTest()" style="
  padding:12px 18px;
  border-radius:999px;
  border:1px solid rgba(0,0,0,.2);
  background:#eef2ff;
  cursor:pointer;
  font-size:14px;
">
🚀 Buka Tes Sakinorva
</button><br><br>

Setelah selesai, kirim hasilnya ke sini (skor fungsi atau tipe)
dan aku akan jelaskan berdasarkan teori Jung & MBTI.
`, true);
}

/* ===============================
   Knowledge responses
================================ */
const KB = {
  functions: {
    ni:"Ni (Introverted Intuition) → fokus pola batin, insight, dan visi jangka panjang.",
    ne:"Ne (Extraverted Intuition) → fokus ide, kemungkinan, dan koneksi konsep.",
    si:"Si (Introverted Sensing) → fokus memori, detail, dan pengalaman masa lalu.",
    se:"Se (Extraverted Sensing) → fokus pengalaman langsung & realita saat ini.",
    ti:"Ti (Introverted Thinking) → logika internal dan konsistensi konsep.",
    te:"Te (Extraverted Thinking) → struktur, efisiensi, dan hasil.",
    fi:"Fi (Introverted Feeling) → nilai personal dan autentisitas batin.",
    fe:"Fe (Extraverted Feeling) → harmoni sosial dan kebutuhan emosional orang lain."
  },
  stacks: {
    INFJ:["Ni","Fe","Ti","Se"],
    INFP:["Fi","Ne","Si","Te"],
    INTJ:["Ni","Te","Fi","Se"],
    ENFP:["Ne","Fi","Te","Si"],
    ENTJ:["Te","Ni","Se","Fi"],
    ISFJ:["Si","Fe","Ti","Ne"],
    ISTJ:["Si","Te","Fi","Ne"]
  }
};

/* ===============================
   Main reply logic
================================ */
function reply(text){
  const low = normalize(text);

  if(low.includes("mulai tes")){
    showTestButton();
    return;
  }

  if(KB.functions[low]){
    addMessage("ai", `
<b>${low.toUpperCase()}</b><br>
${KB.functions[low]}<br><br>
Kamu paling ngerasain fungsi ini muncul di situasi apa?
`, true);
    return;
  }

  const up = text.toUpperCase();
  if(KB.stacks[up]){
    addMessage("ai", `
<b>${up}</b><br>
Function stack:<br>
• ${KB.stacks[up].join(" / ")}<br><br>
Mau bahas fungsi dominan (<b>${KB.stacks[up][0]}</b>)
atau inferior (<b>${KB.stacks[up][3]}</b>) dulu?
`, true);
    return;
  }

  if(low.includes("vs")){
    const parts = low.toUpperCase().split("VS").map(x=>x.trim());
    if(KB.stacks[parts[0]] && KB.stacks[parts[1]]){
      addMessage("ai", `
<b>${parts[0]} vs ${parts[1]}</b><br><br>
${parts[0]} → ${KB.stacks[parts[0]].join(" / ")}<br>
${parts[1]} → ${KB.stacks[parts[1]].join(" / ")}<br><br>
Perbedaan utama biasanya ada di fungsi dominan & inferior.
`, true);
      return;
    }
  }

  addMessage("ai", `
Aku fokus di <b>MBTI & fungsi kognitif</b>.<br><br>
Coba ketik:<br>
• Ni / Ne / Si / Se / Ti / Te / Fi / Fe<br>
• INFJ / ENFP / dll<br>
• INFJ vs INFP<br>
• <b>mulai tes</b>
`, true);
}

/* ===============================
   Events
================================ */
sendBtn.onclick = ()=>{
  const t = inputEl.value.trim();
  if(!t) return;
  addMessage("user", t);
  inputEl.value = "";
  setTimeout(()=>reply(t), 200);
};

inputEl.onkeydown = e => { if(e.key === "Enter") sendBtn.click(); };

profileInput.onchange = e =>{
  const f = e.target.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = ()=>{ userAvatarDataUrl = r.result; render(); };
  r.readAsDataURL(f);
};

/* ===============================
   Init
================================ */
intro();
