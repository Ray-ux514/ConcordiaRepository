// js/menu.js

window.addEventListener("DOMContentLoaded", () => {
  const collectBtn = document.getElementById("btn-collect");
  const hungryBtn = document.getElementById("btn-hungry");
  const lotusBtn = document.getElementById("btn-lotus");

  collectBtn.addEventListener("click", () => {
    window.location.href = "frogCollect.html"; // your frog collect game page
  });

  hungryBtn.addEventListener("click", () => {
    window.location.href = "hungryFrogs.html"; // hungry frogs game page
  });

  lotusBtn.addEventListener("click", () => {
    window.location.href = "lotusBloom.html"; // lotus game page
  });
});
