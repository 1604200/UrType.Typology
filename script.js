// script.js
(() => {
  // Tahun footer
  const yearNow = document.getElementById("yearNow");
  if (yearNow) yearNow.textContent = String(new Date().getFullYear());

  // Reveal animations (smooth muncul satu-satu)
  const items = Array.from(document.querySelectorAll("[data-reveal]"));

  const reveal = (el, delay = 0) => {
    el.style.transitionDelay = `${delay}ms`;
    el.classList.add("is-in");
  };

  // Pakai IntersectionObserver biar muncul pas kebaca
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const idx = items.indexOf(el);
        reveal(el, 70 * idx);
        io.unobserve(el);
      });
    }, { threshold: 0.12 });

    items.forEach((el) => io.observe(el));
  } else {
    // Fallback: langsung tampil
    items.forEach((el, i) => reveal(el, 70 * i));
  }
})();
