/* Small runtime for the static portfolio export: concept toggle, section nav, image placeholders. */
(function () {
  var KEY = "trips-v2-concept";
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Concept A / B toggle (About, TAAP Trips)
  var root = document.querySelector("[data-concept]");
  var toggle = document.querySelector("[data-toggle]");
  if (root && toggle) {
    var btns = toggle.querySelectorAll("button");
    var hasAccent = root.style.getPropertyValue("--accent");
    var setConcept = function (c) {
      root.setAttribute("data-concept", c);
      if (hasAccent) { if (c === "a") root.style.setProperty("--accent", hasAccent); else root.style.removeProperty("--accent"); }
      [["a", btns[0]], ["b", btns[1]]].forEach(function (p) {
        var on = p[0] === c;
        p[1].setAttribute("aria-pressed", on ? "true" : "false");
        p[1].style.background = on ? "var(--paper)" : "transparent";
        p[1].style.color = on ? "var(--ink)" : "var(--paper)";
      });
    };
    btns[0].addEventListener("click", function () { setConcept("a"); store(KEY, "a"); });
    btns[1].addEventListener("click", function () { setConcept("b"); store(KEY, "b"); });
    setConcept(store(KEY) === "b" ? "b" : "a");
  }

  // Case study section nav highlight
  var links = Array.prototype.slice.call(document.querySelectorAll(".jump"));
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("data-sec")] = l; });
    var obs = new IntersectionObserver(function (entries) {
      var vis = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (vis[0] && byId[vis[0].target.id]) {
        links.forEach(function (l) { l.removeAttribute("aria-current"); });
        byId[vis[0].target.id].setAttribute("aria-current", "true");
      }
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] });
    ["overview", "challenge", "solution", "results"].forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }

  // Screenshots not added yet: show a labeled placeholder instead of a broken image
  function placeholder(img) {
    if (img.dataset.ph) return; img.dataset.ph = "1";
    var d = document.createElement("div");
    d.className = "img-placeholder"; d.setAttribute("role", "img"); d.setAttribute("aria-label", img.alt || "Image coming soon");
    d.style.cssText = img.style.cssText;
    d.textContent = img.alt || "Image coming soon";
    img.replaceWith(d);
  }
  Array.prototype.forEach.call(document.images, function (img) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) placeholder(img);
    else img.addEventListener("error", function () { placeholder(img); });
  });
})();
