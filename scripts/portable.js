(function () {
  var header = document.querySelector("header.sticky");
  var menuButton = header
    ? header.querySelector("button[aria-haspopup='dialog']")
    : null;
  var menuDialog = header ? header.querySelector("[role='dialog']") : null;
  var menuPanel = menuDialog ? menuDialog.closest(".grid") : null;
  var menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    if (!menuButton || !menuPanel || !menuDialog) return;

    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuDialog.setAttribute("aria-modal", open ? "true" : "false");
    if (open) {
      menuDialog.removeAttribute("inert");
      menuPanel.classList.remove("pointer-events-none", "grid-rows-[0fr]");
      menuPanel.classList.add("grid-rows-[1fr]");
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (header) header.style.transform = "";
    } else {
      menuDialog.setAttribute("inert", "");
      menuPanel.classList.add("pointer-events-none", "grid-rows-[0fr]");
      menuPanel.classList.remove("grid-rows-[1fr]");
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      setMenu(!menuOpen);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuOpen) {
      setMenu(false);
      if (menuButton) menuButton.focus();
    }
  });

  if (window.matchMedia) {
    var desktop = window.matchMedia("(min-width: 640px)");
    desktop.addEventListener("change", function () {
      if (desktop.matches) setMenu(false);
    });
  }

  if (header) {
    var reduceMotion = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : { matches: false };
    var lastY = Math.max(0, window.scrollY);
    var offset = 0;
    var ticking = false;
    var bar = header.querySelector("div.flex.items-center.justify-between");

    function maxOffset() {
      return bar ? bar.getBoundingClientRect().height : header.offsetHeight;
    }

    function apply(next) {
      offset = Math.min(maxOffset(), Math.max(0, next));
      header.style.transform = offset ? "translateY(-" + offset + "px)" : "";
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          ticking = false;
          if (reduceMotion.matches || menuOpen) {
            apply(0);
            lastY = Math.max(0, window.scrollY);
            return;
          }
          var y = Math.max(0, window.scrollY);
          var delta = y - lastY;
          lastY = y;
          if (y < 8) {
            apply(0);
            return;
          }
          apply(offset + delta);
        });
      },
      { passive: true }
    );
  }
})();
