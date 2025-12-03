// ==========================
// LOTUS BLOOM – SPOT THE DIFFERENCE
// ==========================

"use strict";
// --- CONFIG ---
const CANVAS_W = 850;
const CANVAS_H = 500;
const COLS = 5;
const ROWS = 3;
const TOTAL_LOTUSES = COLS * ROWS;
const DIFFERENT_COUNT = 3;
const LOTUS_SIZE = 110; // draw size
const CLICK_RADIUS = 55; // for hit test
const GAME_TIME = 30; // seconds

// --- ASSETS ---
let lotusNormal;
let lotusDiffImgs = []; // 3 different lotus variations
let font1;

// --- GAME STATE ---
let lotuses = [];
let state = "playing"; // "playing" | "won" | "lost"
let gameStartTime = 0;
let foundCount = 0;
// =====================
// PRELOAD
// =====================
function preload() {
  // TODO: replace these file names with your actual files
  lotusNormal = loadImage("assets/images/lotus_main.png");
  lotusDiffImgs[0] = loadImage("assets/images/lotus_diff1.png");
  lotusDiffImgs[1] = loadImage("assets/images/lotus_diff2.png");
  lotusDiffImgs[2] = loadImage("assets/images/lotus_diff3.png");

  // optional font (or remove + use default)
  // font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
}

// =====================
// SETUP + RESET
// =====================
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  imageMode(CENTER);
  textFont("Inter"); // or font1 if you loaded it
  resetGame();
}

function resetGame() {
  state = "playing";
  foundCount = 0;
  gameStartTime = millis();
  lotuses = [];

  // grid positions
  const marginX = 100;
  const marginY = 110;
  const spacingX = (width - marginX * 2) / (COLS - 1);
  const spacingY = (height - marginY * 2) / (ROWS - 1);

  let positions = [];
  let idx = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let x = marginX + c * spacingX;
      let y = marginY + r * spacingY;
      positions.push({ x, y });
      idx++;
    }
  }
}
