/* Homepage only: slide counter + slide timer length, both driven by js/hero-config.js */
(function () {
  var C = window.HERO_CONFIG || {}, d = document.querySelector(".dots"), cur = document.getElementById("cur"), n = document.getElementById("n"), t = document.getElementById("t");
  if (d) d.style.setProperty("--dur", (C.seconds || 7) + "s");
  var total = (C.images || []).length, pad = function (x) { return (x < 10 ? "0" : "") + x; };
  if (t && total) t.textContent = "/ " + pad(total);
  if (!cur || !n || !C.words) return;
  var sync = function () { var i = C.words.indexOf(cur.textContent); if (i > -1) n.textContent = pad(i + 1); };
  new MutationObserver(sync).observe(cur, { childList: true, characterData: true, subtree: true }); sync();
})();
