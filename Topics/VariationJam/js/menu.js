// js/menu.js

window.addEventListener("DOMContentLoaded", () => {
  const collectBtn = document.getElementById("btn-collect");
  const hungryBtn = document.getElementById("btn-hungry");
  const lotusBtn = document.getElementById("btn-lotus");

  collectBtn.addEventListener("click", () => {
    window.location.href = "frogcollect.html"; //frog collect game page
  });

  hungryBtn.addEventListener("click", () => {
    console.log;
    window.location.href = "hungryfrogs.html"; //frogs game page
  });

  lotusBtn.addEventListener("click", () => {
    window.location.href = "lotusbloom.html"; // lotus game page
  });
});
document.body.addEventListener(
  "click",
  () => {
    const music = document.getElementById("bgmusic");
    music.volume = 0.1;
    music.play();
  },
  { once: true }
);
