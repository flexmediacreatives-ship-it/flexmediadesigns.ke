/* Homepage only. Keeps the "idea to finished piece" steps in sync with js/hero-config.js (words + taglines). */
(function () {
  var C = window.HERO_CONFIG, steps = document.querySelectorAll(".steps li");
  if (!C || !C.words || !steps.length) return;
  steps.forEach(function (li, i) {
    if (!C.words[i]) return;
    var h = li.querySelector("h3"), p = li.querySelector("p");
    if (h) h.textContent = C.words[i].charAt(0) + C.words[i].slice(1).toLowerCase();
    if (p && C.taglines && C.taglines[i]) p.textContent = C.taglines[i];
  });
})();
