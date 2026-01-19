// ===================== homepage.js (FIXED) =====================

const DEFAULT_TRENDING = [
    "MBTI personality types",
    "self improvement habits",
    "mental health tips",
    "career roadmap for students",
    "AI tools for productivity"
  ];
  
  const LS_COUNTS = "urtype_query_counts";
  
  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".canvas");
    const bubbles = document.querySelectorAll(".bubble");
  
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
  
    const hotList = document.getElementById("hotList");
    const clearTrendingBtn = document.getElementById("clearTrending");
    const openTrendingBtn = document.getElementById("openTrending");
  
    let lastQuery = "";
  
    // ------------------------------
    // Bubble magnet proximity (ANIMASI)
    // ------------------------------
    let rafId = null;
    let mouse = { x: 0, y: 0, inside: false };
    let centers = [];
  
    function clamp01(n){ return Math.max(0, Math.min(1, n)); }
    function clamp(min, max, n){ return Math.max(min, Math.min(max, n)); }
  
    function refreshCenters() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      centers = Array.from(bubbles).map((b) => {
        const br = b.getBoundingClientRect();
        return {
          el: b,
          cx: (br.left - rect.left) + br.width / 2,
          cy: (br.top - rect.top) + br.height / 2
        };
      });
    }
  
    function resetBubbles() {
      bubbles.forEach((b) => {
        b.style.transform = "";
        b.style.boxShadow = "";
      });
    }
  
    function animateMagnet() {
      if (!mouse.inside) return;
  
      const rect = canvas.getBoundingClientRect();
      const mx = mouse.x - rect.left;
      const my = mouse.y - rect.top;
  
      centers.forEach(({ el, cx, cy }) => {
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
  
        const R = 260; // radius influence
        const t = clamp01((R - dist) / R);
  
        const scale = 1 + t * 0.16;
        const lift  = t * 10;
        const tilt  = clamp(-6, 6, (dx / R) * 6) * t;
  
        const shadowA = 0.10 + t * 0.08;
  
        el.style.transform = `translateY(${-lift}px) scale(${scale}) rotate(${tilt}deg)`;
        el.style.boxShadow = `0 18px 50px rgba(0,0,0,${shadowA})`;
      });
  
      rafId = requestAnimationFrame(animateMagnet);
    }
  
    canvas?.addEventListener("mouseenter", () => {
      mouse.inside = true;
      refreshCenters();
      if (!rafId) rafId = requestAnimationFrame(animateMagnet);
    });
  
    canvas?.addEventListener("mouseleave", () => {
      mouse.inside = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      resetBubbles();
    });
  
    canvas?.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });
  
    window.addEventListener("resize", refreshCenters, { passive: true });
    window.addEventListener("scroll", refreshCenters, { passive: true });
  
    // IMPORTANT:
    // Bubble sudah pakai <a href="..."> jadi link PASTI jalan,
    // kita TIDAK override click lagi di JS.
  
    // ------------------------------
    // ✅ GOOGLE SEARCH (WORKING)
    // ------------------------------
    function openGoogleSearch(q){
      const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  
    searchForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = (searchInput?.value || "").trim();
      if (!q) return;
  
      lastQuery = q;
      incrementQueryCount(q);
      renderTrending();
  
      openGoogleSearch(q);
    });
  
    // ------------------------------
    // Hot topic = news/articles
    // ------------------------------
    function openNewsSearch(q){
      const url = `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(q)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  
    hotList?.addEventListener("click", (e) => {
      const btn = e.target.closest(".hotItem");
      if (!btn) return;
  
      const q = (btn.dataset.q || btn.textContent || "").trim();
      if (!q) return;
  
      lastQuery = q;
      incrementQueryCount(q);
      renderTrending();
  
      openNewsSearch(q);
    });
  
    openTrendingBtn?.addEventListener("click", () => {
      const top = getTrendingList()[0];
      const q = lastQuery || top || "trending topics";
      openNewsSearch(q);
    });
  
    clearTrendingBtn?.addEventListener("click", () => {
      localStorage.removeItem(LS_COUNTS);
      lastQuery = "";
      renderTrending(true);
    });
  
    // initial render
    renderTrending();
  
    // ------------------------------
    // Trending storage helpers
    // ------------------------------
    function loadCounts() {
      try { return JSON.parse(localStorage.getItem(LS_COUNTS) || "{}"); }
      catch { return {}; }
    }
  
    function incrementQueryCount(query) {
      const counts = loadCounts();
      counts[query] = (counts[query] || 0) + 1;
      localStorage.setItem(LS_COUNTS, JSON.stringify(counts));
    }
  
    function getTrendingList() {
      const counts = loadCounts();
      const entries = Object.entries(counts);
      if (entries.length === 0) return DEFAULT_TRENDING;
  
      entries.sort((a,b) => b[1] - a[1]);
      return entries.slice(0, 6).map(([q]) => q);
    }
  
    function renderTrending(resetToDefault = false) {
      if (!hotList) return;
      const list = resetToDefault ? DEFAULT_TRENDING : getTrendingList();
  
      hotList.innerHTML = "";
      list.forEach((q) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "hotItem";
        btn.dataset.q = q;
        btn.textContent = q;
        hotList.appendChild(btn);
      });
    }
  });
  