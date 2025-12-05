/**
 * Frog Collecting – timer bar + big score
 */

"use strict";
let state = "instructions";
// ===== GRID + CANVAS =====
const STEP_SIZE = 62;
const CANVAS_W = 850;
const CANVAS_H = 500;

// bar + grid layout
const BAR_MARGIN_X = 30;
const BAR_MARGIN_Y = 18;
const BAR_HEIGHT = 32;

// grid starts just under the bar
const GRID_TOP = BAR_MARGIN_Y + BAR_HEIGHT + 10;

// ===== TIMER =====
const TIME_LIMIT = 10; // seconds
let levelStartTime = 0;
let timeUp = false;
let gameWin = false;

// ===== ASSETS & GAME STATE =====
let bluefrog;
let font1;
let font2;
let startbuttonImg;
let startbuttonHoverImg;
let startbuttonCurrent;
let currentColor;
//sound//
let gameSound;
let eatFlySound;

let cellColor = { r: 192, g: 36, b: 209 };
let cellColor_2 = { r: 217, g: 123, b: 227 };

let player = {
  x: STEP_SIZE / 2,
  y: GRID_TOP + STEP_SIZE / 2,
  size: 60,
  angle: 0, // facing down
};

let fly = {
  x: 0,
  y: 0,
  size: 20,
};
//star button
const startbuttonR = {
  x: 660,
  y: 380,
  width: 150,
  height: 50,
  color: "rgba(255,255,255,0)",
};

let x_is_even = true;
let cols, rows;
let score = 0;

// progress bar state
let bar = {
  x: BAR_MARGIN_X,
  y: BAR_MARGIN_Y,
  w: CANVAS_W - BAR_MARGIN_X * 2,
  h: BAR_HEIGHT,
};
let animatedProgress = bar.w; // start full

function preload() {
  bluefrog = loadImage("assets/images/frogblue.png");
  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
  startbuttonImg = loadImage("assets/images/start_default.png");
  startbuttonHoverImg = loadImage("assets/images/start_hover.png");
  //sound//
  gameSound = loadSound("assets/sounds/gamesound.mp3");
  eatFlySound = loadSound("assets/sounds/eatfly.mp3");
}

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  imageMode(CENTER);
  startbuttonCurrent = startbuttonImg;

  // number of grid cells in the *usable* area under the bar
  cols = floor(width / STEP_SIZE);
  const usableHeight = height - GRID_TOP;
  rows = floor(usableHeight / STEP_SIZE);

  spawnFly();
  levelStartTime = millis();
}
function draw() {
  if (state === "instructions") {
    mouseHover();
    drawInstructions();
  } else if (state === "game") {
    drawGame();
  }
}

// ===== GRID DRAWING =====

function drawGrid_alternating_cols() {
  x_is_even = true;

  for (let x = 0; x < width; x += STEP_SIZE) {
    currentColor = x_is_even ? cellColor : cellColor_2;
    x_is_even = !x_is_even;

    for (let y = GRID_TOP; y < height; y += STEP_SIZE) {
      fill(currentColor.r, currentColor.g, currentColor.b);
      rect(x, y, STEP_SIZE, STEP_SIZE);
    }
  }
}

// ===== FROG + FLY =====

function drawFrog() {
  push();
  translate(player.x, player.y);
  rotate(player.angle);
  image(bluefrog, 0, 0, player.size, player.size);
  pop();
}

function drawFly() {
  push();
  fill(0, 0, 0);
  noStroke();
  circle(fly.x, fly.y, fly.size);
  pop();
}

// place the fly randomly on grid cells under the bar
function spawnFly() {
  const col = floor(random(cols));
  const row = floor(random(rows));

  fly.x = col * STEP_SIZE + STEP_SIZE / 2;
  fly.y = GRID_TOP + row * STEP_SIZE + STEP_SIZE / 2;
}

// ===== HUD: SCORE + BIG NUMBER + TIMER BAR =====

function drawBigScore() {
  // huge semi-transparent score at bottom-right
  push();
  textAlign(RIGHT, BOTTOM);
  textSize(180);
  fill(255, 255, 255, 40); // opacity
  text(score, width - 20, height - 20);
  pop();
}

function drawTimerBar() {
  // how much time left
  let elapsed = (millis() - levelStartTime) / 1500;
  let remaining = max(0, TIME_LIMIT - elapsed);

  // when it hits 0, mark timeUp
  if (!timeUp && remaining <= 0) {
    timeUp = true;
    remaining = 0;
  }

  // outer bar
  push();
  stroke("#ce2a4d");
  strokeWeight(12);
  fill("#ce2a4d");
  rect(bar.x, bar.y, bar.w, bar.h, 20);
  pop();

  // inner white fill goes DOWN as time goes down
  let targetWidth = (remaining / TIME_LIMIT) * bar.w;
  animatedProgress = lerp(animatedProgress, targetWidth, 0.2);

  noStroke();
  fill("#ffffff");
  rect(bar.x, bar.y, animatedProgress, bar.h, 30);
}

function drawTimeUpMessage() {
  if (!timeUp) return;

  push();
  fill(0, 0, 0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Time’s up!", width / 2, height / 2 - 10);
  textSize(18);
  text(
    "Press R to restart or Press Q to quit and return to the menu",
    width / 2,
    height / 2 + 24
  );
  pop();
}

// ===== INPUT / MOVEMENT =====

function keyPressed(event) {
  // restart when time is up
  if (timeUp && (key === "r" || key === "R")) {
    score = 0;
    gameWin = false;
    timeUp = false;
    levelStartTime = millis();
    animatedProgress = bar.w;
    spawnFly();
    return;
  }

  if (timeUp && key == "q") {
    window.location.href = "index.html";
  }
  if (event.key === "d") {
    player.x += STEP_SIZE;
    player.angle = -HALF_PI; // face right
  } else if (event.key === "a") {
    player.x -= STEP_SIZE;
    player.angle = HALF_PI; // face left
  } else if (event.key === "w") {
    player.y -= STEP_SIZE;
    player.angle = PI; // face up
  } else if (event.key === "s") {
    player.y += STEP_SIZE;
    player.angle = 0; // face down
  } else {
    return;
  }

  // keep frog inside grid area (under bar)
  const half = player.size / 2;
  player.x = constrain(player.x, half, width - half);
  player.y = constrain(player.y, GRID_TOP + half, height - half);

  // check if we collected the fly
  const d = dist(player.x, player.y, fly.x, fly.y);
  if (d < (player.size + fly.size) / 2) {
    score++;
    eatFlySound.setVolume(0.1); // lower this sound
    eatFlySound.play();
    // WIN CONDITION — 8 bugs before time runs out
    if (score >= 8 && !timeUp) {
      gameWin = true;
      timeUp = true; // freeze game
    } else {
      // spawn next fly normally
      spawnFly();
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
  textSize(23);
  textFont(font2);
  textWrap(WORD);
  text(
    "Move the frog by using these UP,'W', DOWN 'S', LEFT 'A', RIGHT 'D' to control the frogs movement.\n\n" +
      "Catch all 8 flies before the timer runs out to win the game. Stay quick, stay alert, and good luck!",
    40,
    150,
    350
  );

  //bluefrog//
  push();
  image(bluefrog, 660, 230, 135, 130);
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
      state = "game";
      return;
    }
  }
  // ===== WIN SCREEN CLICK → RETURN TO MENU =====
  if (gameWin && timeUp) {
    window.location.href = "index.html";
  }
}

//win message//
function drawWin() {
  if (!gameWin) return;
  background("#4a7636");
  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textFont(font1);
  textSize(48);
  text("CONGRATULATIONS YOU WIN!", width / 2, height / 2 - 20);
  fill("#ffffff");

  textSize(20);
  text("Click to return to the menu", width / 2, height / 2 + 40);
}
function resetGame() {
  score = 0;
  gameWin = false;
  timeUp = false;
  levelStartTime = millis();
  animatedProgress = bar.w;

  // reset player position
  player.x = STEP_SIZE / 2;
  player.y = GRID_TOP + STEP_SIZE / 2;

  // new fly
  spawnFly();
}

//MAIN DRAW LOOP

function drawGame() {
  background("#4a7636");
  drawTimerBar();
  //drawGrid_alternating_cols();

  drawFly();
  drawFrog();
  drawBigScore();
  drawTimeUpMessage();
  drawWin();
}
