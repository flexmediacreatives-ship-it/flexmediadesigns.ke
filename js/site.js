/* FLEX MEDIA DESIGNS - site behaviour (nav, hero, work counts, gallery, contact) */
window.FMD_CONFIG = { whatsappNumber: "254724660864", email: "flexmediacreatives@gmail.com", name: "FLEX MEDIA DESIGNS" };
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* header */
  var hd = $(".site-header"), burger = $(".burger");
  var onScroll = function () { hd.classList.toggle("scrolled", window.scrollY > 40); }; onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  burger && burger.addEventListener("click", function () { var o = document.body.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", o); });
  $$(".nav a").forEach(function (a) { a.addEventListener("click", function () { document.body.classList.remove("menu-open"); }); });

  /* reveal */
  if ("IntersectionObserver" in window) { var io = new IntersectionObserver(function (e) { e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .12 }); $$(".reveal").forEach(function (el) { io.observe(el); }); }
  else $$(".reveal").forEach(function (el) { el.classList.add("in"); });

  /* hero slider */
  var hero = $(".hero");
  if (hero && window.HERO_CONFIG) {
    var C = window.HERO_CONFIG, imgs = C.images || [], i = 0, timer, slides = [], dots = $(".dots"), word = $(".word"), tag = $("#tag");
    imgs.forEach(function (f, k) { var s = document.createElement("div"); s.className = "slide"; s.style.backgroundImage = "url('" + (f.indexOf("/") > -1 ? encodeURI(f) : "assets/images/hero/" + encodeURI(f)) + "')"; hero.insertBefore(s, hero.firstChild); slides.push(s); var d = document.createElement("i"); dots.appendChild(d); });
    var dts = $$("i", dots);
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("on", k === i); }); dts.forEach(function (d, k) { d.classList.toggle("on", k === i); });
      var w = (C.words || [])[i] || "CONCEPTUALIZE"; word.style.animation = "none"; void word.offsetWidth; word.style.animation = ""; word.textContent = w;
      $("#cur").textContent = w; tag.innerHTML = esc((C.taglines || [])[i] || "").replace(/ (\S+ \S+)$/, "<br>$1");
    };
    var play = function () { clearInterval(timer); if (slides.length > 1) timer = setInterval(function () { show(i + 1); }, (C.seconds || 7) * 1000); };
    $("#prev").addEventListener("click", function () { show(i - 1); play(); }); $("#next").addEventListener("click", function () { show(i + 1); play(); });
    show(0); play();
  }

  /* shared gallery data */
  var W = window.WORK_CONFIG || { cats: {}, assign: {} };
  function classify(it) {
    if (it.cat && W.cats[it.cat]) return { cat: it.cat, service: it.service || W.cats[it.cat].title };
    var a = W.assign[it.src]; if (a) return { cat: a[0], service: a[1] };
    var t = (it.title || it.src).toLowerCase();
    if (/vote|elect|chair|secretar|treasur|nominee|candidate|campaign/.test(t)) return { cat: "campaign", service: "Flyers" };
    if (/banner/.test(t)) return { cat: "posters", service: "Banners" };
    if (/poster/.test(t)) return { cat: "posters", service: "Posters" };
    if (/logo/.test(t)) return { cat: "brand", service: "Logo Design" };
    if (/packag/.test(t)) return { cat: "brand", service: "Packaging Designs" };
    if (/label/.test(t)) return { cat: "brand", service: "Label Designs" };
    if (/certificate|brochure|card/.test(t)) return { cat: "brand", service: "Print Layouts" };
    return { cat: "promo", service: "Flyers" };
  }
  function load() {
    return fetch("gallery.json?v=" + Date.now()).then(function (r) { return r.json(); }).then(function (d) {
      return (d.images || d || []).filter(function (x) { return x && x.src; }).map(function (x) { var c = classify(x); x.cat = c.cat; x.service = c.service; x.url = "assets/images/gallery/" + encodeURI(x.src); return x; });
    });
  }

  /* work page panel pictures (chosen in /admin-tool/) */
  $$(".panels [data-count]").forEach(function (el) { var c = W.cats[el.dataset.count], p = el.closest(".panel"), b = p && $(".bg", p); if (c && c.bg && b) b.style.backgroundImage = "url('" + encodeURI(c.bg) + "')"; });

  /* work page counts */
  if ($(".panels")) load().then(function (items) { $$("[data-count]").forEach(function (el) { var n = items.filter(function (x) { return x.cat === el.dataset.count; }).length; el.textContent = n + (n === 1 ? " design" : " designs"); }); }).catch(function () { });

  /* gallery page */
  var host = $("#masonry");
  if (host) {
    var items = [], view = [], cur = 0, chips = $(".chips"), lb = $(".lb");
    var qcat = new URLSearchParams(location.search).get("cat") || "all";
    var render = function (cat) {
      view = items.filter(function (x) { return cat === "all" || x.cat === cat; });
      $$("button", chips).forEach(function (b) { b.classList.toggle("on", b.dataset.cat === cat); });
      var meta = W.cats[cat]; $("#gt").textContent = meta ? meta.title : "All Designs"; $("#gs").textContent = meta ? meta.blurb : "Everything we have designed, in one place";
      host.innerHTML = view.length ? view.map(function (x, k) { return '<button class="tile" data-k="' + k + '" style="animation-delay:' + Math.min(k * 45, 600) + 'ms" aria-label="View ' + esc(x.title) + '"><img loading="lazy" src="' + x.url + '" alt="' + esc(x.title) + '"' + (x.w ? ' width="' + x.w + '" height="' + x.h + '"' : "") + '><span class="cap">' + esc(x.title) + "<em>" + esc(x.service) + "</em></span></button>"; }).join("") : '<p class="empty">No designs in this category yet.</p>';
    };
    var open = function (k) { cur = (k + view.length) % view.length; var x = view[cur]; $("img", lb).src = x.url; $("img", lb).alt = x.title; $(".t", lb).innerHTML = esc(x.title) + "<em>" + esc(x.service) + "</em>"; $(".ord", lb).href = "contact-us.html?design=" + encodeURIComponent(x.title); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    var close = function () { lb.classList.remove("open"); document.body.style.overflow = ""; };
    load().then(function (d) {
      items = d.reverse(); // newest uploads first
      var counts = {}; items.forEach(function (x) { counts[x.cat] = (counts[x.cat] || 0) + 1; });
      chips.innerHTML = '<button data-cat="all">All (' + items.length + ")</button>" + Object.keys(W.cats).filter(function (c) { return counts[c]; }).map(function (c) { return '<button data-cat="' + c + '">' + esc(W.cats[c].title) + " (" + counts[c] + ")</button>"; }).join("");
      if (qcat !== "all" && !counts[qcat]) qcat = "all"; render(qcat);
    }).catch(function () { host.innerHTML = '<p class="empty">The gallery could not load. If you opened this file directly, please view the site through your live address or a local server.</p>'; });
    chips.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { render(b.dataset.cat); history.replaceState(null, "", b.dataset.cat === "all" ? "gallery.html" : "gallery.html?cat=" + b.dataset.cat); } });
    host.addEventListener("click", function (e) { var t = e.target.closest(".tile"); if (t) open(+t.dataset.k); });
    $(".x", lb).addEventListener("click", close); $(".pv", lb).addEventListener("click", function () { open(cur - 1); }); $(".nx", lb).addEventListener("click", function () { open(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") open(cur - 1); if (e.key === "ArrowRight") open(cur + 1); });
  }

  /* contact form */
  var form = $("#contact-form");
  if (form) {
    var q = new URLSearchParams(location.search), pre = q.get("service"), design = q.get("design");
    if (pre) $$('input[name="svc"]', form).forEach(function (c) { if (c.value === pre) c.checked = true; });
    if (design) form.elements.message.value = "I would like a design similar to \"" + design + "\".\n\n";
    var st = $("#status");
    var build = function () {
      var f = form.elements, svcs = $$('input[name="svc"]:checked', form).map(function (c) { return c.value; });
      if (!f.name.value.trim() || !f.message.value.trim()) { st.textContent = "Please add your name and a short project brief."; return null; }
      if (!svcs.length) { st.textContent = "Please choose at least one service."; return null; }
      st.textContent = "";
      return ["Hello " + FMD_CONFIG.name + ",", "", "I would like to request a quote.", "", "Name: " + f.name.value.trim(), "Services: " + svcs.join(", "), f.phone.value.trim() ? "Phone: " + f.phone.value.trim() : "", f.email.value.trim() ? "Email: " + f.email.value.trim() : "", "", "Project brief:", f.message.value.trim()].filter(function (l, k, a) { return l !== "" || a[k - 1] !== ""; }).join("\n");
    };
    form.addEventListener("submit", function (e) { e.preventDefault(); var m = build(); if (m) { window.open("https://wa.me/" + FMD_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(m), "_blank", "noopener"); st.textContent = "Opening WhatsApp. Please press Send there to reach us."; } });
    $("#mail").addEventListener("click", function () { var m = build(); if (m) location.href = "mailto:" + FMD_CONFIG.email + "?subject=" + encodeURIComponent("Quote request - " + form.elements.name.value.trim()) + "&body=" + encodeURIComponent(m); });
  }
  var y = $("#yr"); if (y) y.textContent = new Date().getFullYear();
})();
