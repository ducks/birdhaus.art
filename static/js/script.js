/* ============================================================
   BIRDHAUS - script.js
   Sole job: trigger the entrance animation after first paint by
   adding .is-loaded to <body>. CSS does all the actual animating.
   Honors prefers-reduced-motion (CSS also has a hard fallback, so
   the page is fully visible even with JS disabled).
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal() {
    document.body.classList.add("is-loaded");
  }

  if (reduce) {
    // No animation: reveal immediately, skip the rAF dance.
    reveal();
    return;
  }

  // Wait one frame past load so the pre-load (hidden) state paints
  // first, then transition to the loaded state.
  window.addEventListener("load", function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(reveal);
    });
  });
})();
