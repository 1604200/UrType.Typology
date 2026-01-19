document.addEventListener("DOMContentLoaded", () => {
  const s1 = document.getElementById("screen1");
  const s2 = document.getElementById("screen2");

  const btnNext = document.getElementById("btnNext");
  const backBtn = document.getElementById("backBtn");
  const moreBtn = document.getElementById("moreBtn");

  const TRANSITION_MS = 460;

  function setVisible(el, on){
    el.classList.toggle("is-active", on);
    el.classList.toggle("is-visible", on);
    el.setAttribute("aria-hidden", on ? "false" : "true");
  }

  function go(to){
    const to2 = (to === 2);
    const fromEl = to2 ? s1 : s2;
    const toEl   = to2 ? s2 : s1;

    // start leaving animation
    fromEl.classList.add("is-leaving");
    fromEl.classList.remove("is-visible");

    // ensure destination is displayed (but not visible yet)
    toEl.classList.add("is-active");
    toEl.setAttribute("aria-hidden", "false");

    // after fade out, swap
    window.setTimeout(() => {
      fromEl.classList.remove("is-active", "is-leaving");
      fromEl.setAttribute("aria-hidden", "true");

      // force reflow to restart entrance animations
      void toEl.offsetWidth;

      toEl.classList.add("is-visible");
      window.location.hash = to2 ? "#page2" : "#page1";
    }, TRANSITION_MS);
  }

  // Next ➡️ : pindah ke Screen 2
  btnNext?.addEventListener("click", (e) => {
    e.preventDefault();
    go(2);
  });

  // Back : balik ke Screen 1
  backBtn?.addEventListener("click", () => go(1));

  // Selengkapnya : scroll ke arches
  moreBtn?.addEventListener("click", () => {
    const arches = document.querySelector(".arches");
    arches?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Init state
  if (window.location.hash === "#page2") {
    // start on page2
    setVisible(s1, false);
    setVisible(s2, true);
  } else {
    setVisible(s1, true);
    setVisible(s2, false);
    window.location.hash = "#page1";
  }
});
