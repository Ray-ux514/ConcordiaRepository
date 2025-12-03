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
const LOTUS_SIZE = {
  width: 90,
  height: 113,
};
const CLICK_RADIUS = 60; // for hit test
const GAME_TIME = 30; // seconds
//star button
const startbuttonR = {
  x: 660,
  y: 380,
  width: 150,
  height: 50,
  color: "rgba(255,255,255,0)",
};

// --- ASSETS ---
let lotusNormal;
let lotusDiffImgs = []; // 3 different lotus variations
let font1;
let font2;
let startbuttonImg;
let startbuttonHoverImg;
let startbuttonCurrent;

// --- GAME STATE ---
let lotuses = [];
let state = "instructions"; // "playing" | "won" | "lost"
let gameStartTime = 0;
let foundCount = 0;

function preload() {
  lotusNormal = loadImage("assets/images/lotus.png");
  lotusDiffImgs[0] = loadImage("assets/images/lotus_diff1.png");
  lotusDiffImgs[1] = loadImage("assets/images/lotus_diff2.png");
  lotusDiffImgs[2] = loadImage("assets/images/lotus_diff3.png");

  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
  startbuttonImg = loadImage("assets/images/start_default.png");
  startbuttonHoverImg = loadImage("assets/images/start_hover.png");
}

// =====================
// SETUP + RESET
// =====================
function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  imageMode(CENTER);
  textFont(font1);
  resetGame();
  startbuttonCurrent = startbuttonImg;
}
function draw() {
  if (state === "instructions") {
    mouseHover();
    drawInstructions();
  } else if (state === "playing") {
    drawGame();
  }
}
function resetGame() {
  foundCount = 0;
  gameStartTime = millis();
  lotuses = [];

  // grid positions
  const marginX = 180;
  const marginY = 135;
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

  // pick which indices will be the “different” ones
  let indices = [];
  for (let i = 0; i < TOTAL_LOTUSES; i++) {
    indices.push(i);
  }
  shuffle(indices, true);
  let oddIndices = indices.slice(0, DIFFERENT_COUNT);

  // create lotus objects
  let diffImgIndex = 0;
  for (let i = 0; i < TOTAL_LOTUSES; i++) {
    let pos = positions[i];
    let isOdd = oddIndices.includes(i);

    let img = lotusNormal;
    if (isOdd) {
      img = lotusDiffImgs[diffImgIndex % lotusDiffImgs.length];
      diffImgIndex++;
    }

    // start below the canvas, animate up
    let startY = height + random(40, 120);

    lotuses.push({
      x: pos.x,
      y: startY,
      targetY: pos.y,
      img: img,
      isOdd: isOdd,
      found: false,
    });
  }
}

//functions
function drawGame() {
  background("#ffc848"); // warm yellow

  drawTimerBar();
  drawHUD();

  // animate + draw lotus grid
  drawLotuses();

  if (state === "won") {
    drawEndMessage("You found all 3!");
  } else if (state === "lost") {
    drawEndMessage("Time’s up!");
  }

  // handle timer -> lost
  if (state === "playing") {
    let elapsed = (millis() - gameStartTime) / 1000;
    if (elapsed >= GAME_TIME && foundCount < DIFFERENT_COUNT) {
      state = "lost";
    }
  }
}

// LOTUSES
function drawLotuses() {
  for (let l of lotuses) {
    // easing animation
    let ease = 0.08;
    l.y += (l.targetY - l.y) * ease;

    let w = LOTUS_SIZE.width;
    let h = LOTUS_SIZE.height;

    if (l.found) {
      let pulse = 6 * sin(frameCount * 0.2);
      w += pulse;
      h += pulse * (LOTUS_SIZE.height / LOTUS_SIZE.width);
    }

    image(l.img, l.x, l.y, w, h);

    if (l.found) {
      noFill();
      stroke(255, 255, 255, 180);
      strokeWeight(3);
      ellipse(l.x, l.y + h * 0.05, w * 0.95, h * 0.95);
    }
  }
}
function drawInstructions() {
  background("#4a7636");

  textAlign(LEFT);
  textFont(font1);
  textSize(32);
  fill("#ffffff");
  text("INSTRUCTIONS", 40, 100);

  //instructions text//
  textSize(20);
  textFont(font2);
  textWrap(WORD);
  text(
    "Spot the 3 lotus flowers that look different from the rest. You have 30 seconds.\n\n" +
      "Click on a lotus to select it. If it's one of the odd ones, it will glow.\n\n" +
      "Find all 3 before time runs out!",
    40,
    150,
    350
  );

  //bluefrog//
  push();
  image(lotusNormal, 660, 230, 95, 90);
  pop();

  //backbutton
  push();
  noStroke();
  fill(startbuttonR.color);
  image(
    startbuttonCurrent,
    startbuttonR.x,
    startbuttonR.y,
    startbuttonR.width,
    startbuttonR.height
  );
  pop();
}

function mouseHover() {
  if (state === "instructions") {
    const left = startbuttonR.x - startbuttonR.width / 2;
    const right = startbuttonR.x + startbuttonR.width / 2;
    const top = startbuttonR.y - startbuttonR.height / 2;
    const bottom = startbuttonR.y + startbuttonR.height / 2;

    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
      startbuttonCurrent = startbuttonHoverImg;
    } else {
      startbuttonCurrent = startbuttonImg;
    }
  } else {
    startbuttonCurrent = startbuttonImg;
  }
}
function mousePressed() {
  if (state === "instructions") {
    const left = startbuttonR.x - startbuttonR.width / 2;
    const right = startbuttonR.x + startbuttonR.width / 2;
    const top = startbuttonR.y - startbuttonR.height / 2;
    const bottom = startbuttonR.y + startbuttonR.height / 2;

    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
      resetGame();
      state = "playing";
      return;
    }
  }
  // ===== WIN SCREEN CLICK → RETURN TO MENU =====
  if (gameWin && timeUp) {
    window.location.href = "index.html";
  }
  if (state === "won" || state === "lost") {
    resetGame();
    return;
  }

  if (state !== "playing") return;

  // check clicks from top-most down
  for (let i = lotuses.length - 1; i >= 0; i--) {
    let l = lotuses[i];
    let d = dist(mouseX, mouseY, l.x, l.y);
    if (d < CLICK_RADIUS) {
      if (l.isOdd && !l.found) {
        l.found = true;
        foundCount++;
        if (foundCount >= DIFFERENT_COUNT) {
          state = "won";
        }
      }
      // no penalty for clicking normal lotus (you could add one)
      break;
    }
  }
}

// HUD & TIMER
function drawTimerBar() {
  let elapsed = (millis() - gameStartTime) / 1000;
  let remaining = constrain(GAME_TIME - elapsed, 0, GAME_TIME);
  let pct = remaining / GAME_TIME;

  let barX = 40;
  let barY = 20;
  let barW = width - 80;
  let barH = 24;

  // background bar
  noStroke();
  fill(220, 110, 80);
  rect(barX, barY, barW, barH, 20);

  // shrinking white bar
  fill(255);
  rect(barX, barY, barW * pct, barH, 20);

  // time text
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(`Time: ${remaining.toFixed(1)}s`, barX + 10, barY + barH / 2);
}
function drawHUD() {
  // instruction
  fill(0);
  textAlign(LEFT, TOP);
  textSize(18);
  text("Spot the 3 different lotus flowers", 40, 60);

  // found counter
  textAlign(RIGHT, TOP);
  textSize(18);
  text(`Found: ${foundCount} / ${DIFFERENT_COUNT}`, width - 40, 60);

  // big transparent number
  push();
  textAlign(RIGHT, BOTTOM);
  textSize(160);
  fill(255, 255, 255, 40);
  text(foundCount, width - 20, height - 10);
  pop();
}

// END MESSAGE
function drawEndMessage(msg) {
  fill(0, 0, 0, 130);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(msg, width / 2, height / 2 - 10);

  textSize(18);
  text("Click to play again or Q to quit", width / 2, height / 2 + 30);
}
function drawWin() {
  if (!gameWin) return;
  background("#06464a");
  fill("#ce2a4d");
  textAlign(CENTER, CENTER);
  textFont(font1);
  textSize(48);
  text("YOU WIN!", width / 2, height / 2 - 20);
  fill("#ffffff");

  textSize(20);
  text("Click to return to the menu", width / 2, height / 2 + 40);
}

function keyPressed() {
  if (key === "q" && state == "playing") {
    window.location.href = "index.html";
  }
}
