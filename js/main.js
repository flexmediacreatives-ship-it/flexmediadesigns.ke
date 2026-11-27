document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (menuButton && nav) {
    const closeMenu = () => { nav.classList.remove("is-open"); menuButton.setAttribute("aria-expanded","false"); menuButton.setAttribute("aria-label","Open navigation"); };
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => { if(e.key === "Escape") closeMenu(); });
  }
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});

/* ===== Scroll-reveal animations (adds fade-up on first view; see .fmd-reveal in css/style.css) ===== */
(() => {
  "use strict";
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window) || !("MutationObserver" in window)) return;

  const STEP = 100;      // ms between related elements
  const MAX_STEPS = 4;   // cap so long groups never feel slow
  const DURATION = 650;  // keep in sync with .fmd-in in css/style.css
  const pending = new Set();
  const seenKeys = new Set(); // dynamic items (service cards re-render on every selection) animate only once
  let io = null;

  const clear = (el) => {
    el.classList.remove("fmd-reveal", "fmd-in");
    el.style.removeProperty("--fmd-delay");
    pending.delete(el);
  };

  const play = (el) => {
    if (!pending.has(el)) return;
    pending.delete(el);
    el.classList.add("fmd-in");
    const done = () => clear(el);
    el.addEventListener("animationend", (e) => { if (e.target === el) done(); }, { once: true });
    setTimeout(done, DURATION + 700 + parseInt(el.style.getPropertyValue("--fmd-delay") || 0, 10));
  };

  const setup = () => {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) { io.unobserve(el); play(el); }
        else if (entry.boundingClientRect.top < 0) { io.unobserve(el); clear(el); } // already scrolled past: just show it
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0 });

    const add = (el, index, key) => {
      if (!(el instanceof HTMLElement) || el.hidden || pending.has(el) || el.classList.contains("fmd-reveal")) return;
      if (key) { if (seenKeys.has(key)) return; seenKeys.add(key); }
      el.style.setProperty("--fmd-delay", Math.min(index, MAX_STEPS) * STEP + "ms");
      el.classList.add("fmd-reveal");
      pending.add(el);
      io.observe(el);
    };

    const kids = (sel, offset = 0) =>
      document.querySelectorAll(sel).forEach((parent) =>
        Array.from(parent.children).forEach((el, i) => add(el, i + offset)));
    const each = (sel, perRow) =>
      document.querySelectorAll(sel).forEach((el, i) => add(el, perRow ? i % perRow : 0));

    // Hero (animates on load)
    kids(".hero-copy");
    kids(".hero-art", 2);
    // Section headings and intros
    kids(".section-heading");
    kids(".gallery-heading");
    each(".about-title");
    // Blocks
    each(".selection-bar");
    each(".about-visual");
    kids(".about-copy", 1);
    each(".process-grid article", 4);
    kids(".contact-copy");
    each(".contact-form");
    // Inner pages
    kids("main.subpage");
    kids("main.policy-page");

    // Items that are rendered by other scripts (service cards, customer gallery)
    const dynamic = (id, perRow, keyOf) => {
      const grid = document.getElementById(id);
      if (!grid) return;
      const scan = () => Array.from(grid.children).forEach((el, i) => add(el, i % perRow, keyOf(el, i)));
      new MutationObserver(scan).observe(grid, { childList: true });
      scan();
    };
    dynamic("service-grid", 3, (el, i) => "service:" + (el.dataset.service || i));
    dynamic("gallery-grid", 4, (el, i) => "gallery:" + i);
  };

  // Safety net: anything scrolled past (e.g. by a #link jump) is shown at once, and at the
  // very bottom of the page nothing that is on screen may stay hidden.
  let ticking = false;
  const flush = () => {
    ticking = false;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    Array.from(pending).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0) { io.unobserve(el); clear(el); }
      else if (atBottom && r.top < window.innerHeight) { io.unobserve(el); play(el); }
    });
  };
  const schedule = () => { if (!ticking) { ticking = true; requestAnimationFrame(flush); } };

  document.addEventListener("DOMContentLoaded", () => {
    try {
      setup();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("load", schedule);
      window.addEventListener("hashchange", schedule);
    } catch (err) {
      // If anything goes wrong, reveal everything so no content can stay hidden.
      document.querySelectorAll(".fmd-reveal").forEach(clear);
    }
  });
})();

/* ===== On refresh, always start at the top of the page (and drop any #section from the address) ===== */
(() => {
  "use strict";
  try {
    const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    const isReload = nav ? nav.type === "reload" : (performance.navigation && performance.navigation.type === 1);
    if (!isReload) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
    window.addEventListener("load", () => window.scrollTo(0, 0), { once: true });
  } catch (e) { /* never block the page */ }
})();

/* ===== Homepage hero: rotating blurred background pictures =====
   No pictures are listed in this file. The list and timing come from js/hero-config.js.
   With an empty list nothing is added and the hero keeps its plain cream background. */
(() => {
  "use strict";

  const config = window.HERO_CONFIG || {};
  const FOLDER = "assets/images/hero/";
  const INTERVAL = (Number(config.seconds) > 0 ? Number(config.seconds) : 10) * 1000;

  // Bare file names are looked up in FOLDER; full paths (assets/...) and URLs are used as given.
  const images = (Array.isArray(config.images) ? config.images : [])
    .filter(Boolean)
    .map((name) => (/^(https?:)?\/\/|^assets\//.test(name) ? name : FOLDER + name));

  document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (!hero || !images.length) return;

    const wrap = document.createElement("div");
    wrap.className = "hero-bg-slides";
    wrap.setAttribute("aria-hidden", "true");

    // Two stacked layers let us cross-fade from one picture to the next.
    const layers = [document.createElement("div"), document.createElement("div")];
    layers.forEach((layer) => {
      layer.className = "hero-bg-slide";
      wrap.appendChild(layer);
    });

    const loaded = [];   // indexes of pictures that loaded successfully, in list order
    let current = -1;    // index currently on screen
    let front = 0;       // which of the two layers is visible

    const show = (index) => {
      const incoming = layers[1 - front];
      const outgoing = layers[front];
      incoming.style.backgroundImage = 'url("' + encodeURI(images[index]) + '")';
      void incoming.offsetWidth;                 // register the new picture before fading it in
      incoming.classList.add("is-active");
      outgoing.classList.remove("is-active");
      front = 1 - front;
      current = index;
    };

    const advance = () => {
      if (document.hidden || loaded.length < 2) return;
      const later = loaded.filter((i) => i > current);
      show(later.length ? later[0] : loaded[0]);
    };

    images.forEach((src, index) => {
      const probe = new Image();
      probe.onload = () => {
        loaded.push(index);
        loaded.sort((a, b) => a - b);
        if (current === -1) {                    // first picture to load is shown immediately
          hero.prepend(wrap);
          show(index);
          setInterval(advance, INTERVAL);
        }
      };
      probe.src = src;                           // missing files simply never load and are skipped
    });
  });
})();
