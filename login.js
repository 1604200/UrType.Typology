// login.js (no API) — stable, anti-crash
(() => {
    const el = (q) => document.querySelector(q);
  
    // Debug marker (hapus kalau mau)
    console.log("login.js loaded ✅");
  
    const card = el("#card");
    const titleSub = el("#titleSub");
    const subtitle = el("#subtitle");
    const toast = el("#toast");
  
    // Login form
    const formLogin = el("#formLogin");
    const emailInput = el("#email");
    const passInput = el("#password");
    const btnEye = el("#btnEye");
    const btnForgot = el("#btnForgot");
    const btnSaveSignin = el("#btnSaveSignin");
    const toggleDemo = el("#toggleDemo");
  
    // Saved view
    const savedView = el("#savedView");
    const avatarImg = el("#avatarImg");
    const savedUsername = el("#savedUsername");
    const savedEmail = el("#savedEmail");
    const btnContinue = el("#btnContinue");
    const btnSwitch = el("#btnSwitch");
    const btnChangePhoto = el("#btnChangePhoto");
    const fileAvatar = el("#fileAvatar");
  
    const btnEditName = el("#btnEditName");
    const editNameBox = el("#editNameBox");
    const usernameInput = el("#usernameInput");
    const btnSaveProfile = el("#btnSaveProfile");
    const btnCancelEdit = el("#btnCancelEdit");
  
    // Keys
    const K_LOGGED = "session_logged_in";
    const K_USER = "session_user";
    const K_NAME = "profile_username";
    const K_AVATAR = "profile_avatar_dataurl";
    const K_SAVED_EMAIL = "saved_email";
    const K_SAVED_PASS = "saved_password";
  
    let saveLocally = false;
  
    // ---------- helpers ----------
    function setLoading(button, isLoading) {
      if (!button) return;
      button.classList.toggle("is-loading", isLoading);
    }
  
    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  
    function showToast(type, title, detail = "") {
      if (!toast) return;
      toast.classList.add("is-show");
      toast.classList.toggle("is-ok", type === "ok");
      toast.classList.toggle("is-err", type === "err");
      toast.innerHTML = `
        <div class="toast__t">${escapeHtml(title)}</div>
        ${detail ? `<div class="toast__s">${escapeHtml(detail)}</div>` : ""}
      `;
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => {
        toast.classList.remove("is-show", "is-ok", "is-err");
      }, 3200);
    }
  
    function normalizeEmail(v) {
      return String(v || "").trim().toLowerCase();
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
    }
  
    function safeUsernameFromEmail(email) {
      const base = String(email || "").split("@")[0] || "user";
      return base.replace(/[^a-z0-9._-]/gi, "").slice(0, 16) || "user";
    }
  
    function isLoggedIn() {
      return localStorage.getItem(K_LOGGED) === "true" && !!localStorage.getItem(K_USER);
    }
  
    function defaultAvatarDataUrl(name) {
      const initials = (name || "U").slice(0, 2).toUpperCase();
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#ffffff"/>
              <stop offset="1" stop-color="#ffb7d8"/>
            </linearGradient>
          </defs>
          <rect rx="36" ry="36" width="160" height="160" fill="url(#g)"/>
          <circle cx="110" cy="48" r="10" fill="#ff5ca8" opacity="0.35"/>
          <circle cx="44" cy="112" r="14" fill="#ff5ca8" opacity="0.18"/>
          <text x="80" y="98" text-anchor="middle"
            font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
            font-size="54" font-weight="800" fill="#2b1f2a" opacity="0.92"
            style="letter-spacing:2px;">
            ${initials}
          </text>
        </svg>`;
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
    }
  
    function showSavedView() {
      if (!savedView || !formLogin) return;
      formLogin.style.display = "none";
      savedView.classList.remove("is-hidden");
  
      const email = localStorage.getItem(K_USER) || "";
      const name = localStorage.getItem(K_NAME) || safeUsernameFromEmail(email);
  
      let avatar = localStorage.getItem(K_AVATAR);
      if (!avatar) {
        avatar = defaultAvatarDataUrl(name);
        localStorage.setItem(K_AVATAR, avatar);
      }
  
      if (savedEmail) savedEmail.textContent = email;
      if (savedUsername) savedUsername.textContent = name;
      if (avatarImg) avatarImg.src = avatar;
  
      if (titleSub) titleSub.textContent = "Saved account";
      if (subtitle) subtitle.textContent = "Tap Continue untuk masuk, atau edit profil kamu.";
    }
  
    function showLoginForm() {
      if (!savedView || !formLogin) return;
      savedView.classList.add("is-hidden");
      formLogin.style.display = "";
      if (editNameBox) editNameBox.classList.add("is-hidden");
  
      if (titleSub) titleSub.textContent = "Sign in to continue";
      if (subtitle) subtitle.textContent = "Masukkan email & password untuk masuk.";
  
      const se = localStorage.getItem(K_SAVED_EMAIL);
      const sp = localStorage.getItem(K_SAVED_PASS);
      if (emailInput && se) emailInput.value = se;
      if (passInput && sp) passInput.value = sp;
    }
  
    // ---------- hearts ----------
    function spawnHeart() {
      const container = document.querySelector(".hearts");
      if (!container) return;
  
      const h = document.createElement("div");
      h.className = "heart";
  
      const left = Math.random() * 100;
      const drift = (Math.random() * 90 - 45).toFixed(1) + "px";
      const dur = (Math.random() * 3.2 + 4.2).toFixed(2) + "s";
      const delay = (Math.random() * 0.6).toFixed(2) + "s";
      const size = (Math.random() * 10 + 10).toFixed(0) + "px";
  
      h.style.left = `${left}%`;
      h.style.bottom = `-20px`;
      h.style.setProperty("--drift", drift);
      h.style.animationDuration = dur;
      h.style.animationDelay = delay;
      h.style.width = size;
      h.style.height = size;
  
      container.appendChild(h);
      setTimeout(() => h.remove(), (parseFloat(dur) + parseFloat(delay)) * 1000 + 200);
    }
  
    setInterval(() => {
      if (document.visibilityState !== "visible") return;
      spawnHeart();
      if (Math.random() > 0.55) spawnHeart();
    }, 850);
  
    // ---------- init ----------
    window.addEventListener("DOMContentLoaded", () => {
      if (isLoggedIn()) showSavedView();
      else showLoginForm();
    });
  
    // ---------- events (login form) ----------
    if (btnEye && passInput) {
      btnEye.addEventListener("click", () => {
        const isPw = passInput.type === "password";
        passInput.type = isPw ? "text" : "password";
        btnEye.textContent = isPw ? "🙈" : "👁️";
      });
    }
  
    if (toggleDemo) {
      toggleDemo.addEventListener("click", () => {
        saveLocally = !saveLocally;
        toggleDemo.setAttribute("aria-pressed", String(saveLocally));
        toggleDemo.textContent = `Save locally: ${saveLocally ? "ON" : "OFF"}`;
        showToast("ok", "Setting updated", saveLocally ? "Data login disimpan (demo)." : "Tidak menyimpan data login.");
      });
    }
  
    if (btnForgot && emailInput) {
      btnForgot.addEventListener("click", () => {
        const email = normalizeEmail(emailInput.value);
        const subject = encodeURIComponent("Reset password request");
        const body = encodeURIComponent(
          `Halo,\n\nSaya lupa password untuk akun: ${email || "(email belum diisi)"}\nTolong bantu reset.\n\nTerima kasih.`
        );
        window.location.href = `mailto:${email || ""}?subject=${subject}&body=${body}`;
      });
    }
  
    if (formLogin && emailInput && passInput && btnSaveSignin) {
      formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const email = normalizeEmail(emailInput.value);
        const password = String(passInput.value || "");
  
        if (!isValidEmail(email)) {
          showToast("err", "Email belum valid", "Pastikan format email benar.");
          emailInput.focus();
          return;
        }
        if (password.length < 6) {
          showToast("err", "Password kurang", "Minimal 6 karakter.");
          passInput.focus();
          return;
        }
  
        setLoading(btnSaveSignin, true);
  
        // Simulasi login sukses (tanpa server)
        setTimeout(() => {
          localStorage.setItem(K_USER, email);
          localStorage.setItem(K_LOGGED, "true");
  
          if (!localStorage.getItem(K_NAME)) {
            localStorage.setItem(K_NAME, safeUsernameFromEmail(email));
          }
          if (!localStorage.getItem(K_AVATAR)) {
            localStorage.setItem(K_AVATAR, defaultAvatarDataUrl(localStorage.getItem(K_NAME)));
          }
  
          if (saveLocally) {
            localStorage.setItem(K_SAVED_EMAIL, email);
            localStorage.setItem(K_SAVED_PASS, password);
          }
  
          if (subtitle) subtitle.textContent = "Saved ✓ Redirecting…";
          showToast("ok", "Saved", "Opening index.html#page1…");
  
          btnSaveSignin.classList.add("is-vanish");
  
          setTimeout(() => window.location.replace("index.html#page1"), 220);
        }, 380);
      });
    }
  
    // ---------- events (saved view) ----------
    if (btnContinue) {
      btnContinue.addEventListener("click", () => {
        setLoading(btnContinue, true);
        showToast("ok", "Welcome back", "Opening index…");
        if (card) card.classList.add("is-exit");
        setTimeout(() => window.location.replace("index.html#page2"), 180);
      });
    }
  
    if (btnSwitch) {
      btnSwitch.addEventListener("click", () => {
        localStorage.removeItem(K_LOGGED);
        localStorage.removeItem(K_USER);
        localStorage.removeItem(K_NAME);
        localStorage.removeItem(K_AVATAR);
  
        showToast("ok", "Switched", "Silakan login akun lain.");
        showLoginForm();
      });
    }
  
    if (btnEditName && editNameBox && usernameInput) {
      btnEditName.addEventListener("click", () => {
        const email = localStorage.getItem(K_USER) || "";
        const current = localStorage.getItem(K_NAME) || safeUsernameFromEmail(email);
        usernameInput.value = current;
        editNameBox.classList.remove("is-hidden");
        usernameInput.focus();
      });
    }
  
    if (btnCancelEdit && editNameBox) {
      btnCancelEdit.addEventListener("click", () => {
        editNameBox.classList.add("is-hidden");
      });
    }
  
    if (btnSaveProfile && usernameInput) {
      btnSaveProfile.addEventListener("click", () => {
        const name = String(usernameInput.value || "").trim();
        if (!name) {
          showToast("err", "Username kosong", "Isi username dulu.");
          usernameInput.focus();
          return;
        }
  
        setLoading(btnSaveProfile, true);
  
        setTimeout(() => {
          localStorage.setItem(K_NAME, name);
          if (savedUsername) savedUsername.textContent = name;
  
          // regenerate default svg avatar if still svg
          const av = localStorage.getItem(K_AVATAR) || "";
          if (av.startsWith("data:image/svg+xml")) {
            const fresh = defaultAvatarDataUrl(name);
            localStorage.setItem(K_AVATAR, fresh);
            if (avatarImg) avatarImg.src = fresh;
          }
  
          if (editNameBox) editNameBox.classList.add("is-hidden");
          setLoading(btnSaveProfile, false);
          showToast("ok", "Saved", "Profil diperbarui.");
        }, 220);
      });
    }
  
    if (btnChangePhoto && fileAvatar) {
      btnChangePhoto.addEventListener("click", () => fileAvatar.click());
    }
  
    if (fileAvatar) {
      fileAvatar.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
  
        if (!String(file.type).startsWith("image/")) {
          showToast("err", "File tidak valid", "Pilih gambar (jpg/png/webp).");
          e.target.value = "";
          return;
        }
  
        // optional size limit (avoid huge localStorage)
        const maxMB = 2.5;
        if (file.size > maxMB * 1024 * 1024) {
          showToast("err", "File terlalu besar", `Maks ${maxMB}MB biar tidak berat.`);
          e.target.value = "";
          return;
        }
  
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result || "");
          localStorage.setItem(K_AVATAR, dataUrl);
          if (avatarImg) avatarImg.src = dataUrl;
          showToast("ok", "Updated", "Foto profil diganti.");
        };
        reader.onerror = () => showToast("err", "Gagal baca file", "Coba file lain.");
        reader.readAsDataURL(file);
  
        e.target.value = "";
      });
    }
  })();
  