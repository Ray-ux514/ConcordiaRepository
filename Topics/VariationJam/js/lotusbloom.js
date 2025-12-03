//=========
// Lotus Bloom
//===

"use sctrict";

let lotusImg;
let font1;
let font2;

//game state
let buds = [];
let score = 0;
let lives = 3;
let gameOver = false;

const GAME_TIME = 30;
let gameStartTime = 0;

// bud spawning
let lastSpawnTime = 0;
let spawnInterval = 900; // ms – will randomize a bit

// basic bud settings
const BUD_LIFESPAN = 2500; // ms before it wilts
const BUD_RADIUS = 26;

// font
function preload() {
  lotusImg = loadImage("assets/images/lotus.png");
  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
}

function setup() {
  createCanvas(850, 500);
  imageMode(CENTER);
  textFont("Inter");
  resetGame();
}

function resetGame() {
  buds = [];
  score = 0;
  lives = 3;
  gameOver = false;
  gameStartTime = millis();
  lastSpawnTime = millis();
  spawnInterval = random(700, 1200);
}
function draw() {
  background("#06464a"); // dark pond

  drawTimer();
  drawScoreAndLives();

  if (gameOver) {
    drawGameOver();
    return; // stop drawing buds / logic
  }

  handleGlobalTimer();
  spawnBuds();
  updateBuds();
}
function drawTimer() {
  let elapsed = (millis() - gameStartTime) / 1000;
  let remaining = constrain(GAME_TIME - elapsed, 0, GAME_TIME);

  // bar background
  let barX = 40;
  let barY = 20;
  let barW = width - 80;
  let barH = 24;

  noStroke();
  fill("#c52b49");
  rect(barX, barY, barW, barH, 20);

  // inner white shrinks as time goes down
  let pct = remaining / GAME_TIME;
  fill(255);
  rect(barX, barY, barW * pct, barH, 20);

  // time text
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(`Time: ${remaining.toFixed(1)}s`, barX + 10, barY + barH / 2);
}

function handleGlobalTimer() {
  let elapsed = (millis() - gameStartTime) / 1000;
  if (!gameOver && elapsed >= GAME_TIME) {
    gameOver = true;
  }
}

function drawScoreAndLives() {
  // top-left score
  fill(255);
  textAlign(LEFT, TOP);
  textSize(18);
  text(`Score: ${score}`, 20, 60);

  // lives as hearts / dots
  textSize(18);
  textAlign(RIGHT, TOP);
  text(`Lives: ${lives}`, width - 20, 60);

  // big transparent score in bottom-right
  push();
  textAlign(RIGHT, BOTTOM);
  textSize(180);
  fill(255, 255, 255, 40);
  text(score, width - 30, height - 20);
  pop();
}
function spawnBuds() {
  // spawn new bud every spawnInterval ms
  if (millis() - lastSpawnTime > spawnInterval) {
    let bud = {
      x: random(80, width - 80),
      y: random(120, height - 80),
      createdAt: millis(),
      lifeSpan: BUD_LIFESPAN,
      bloomed: false,
      bloomTime: 0,
    };
    buds.push(bud);

    lastSpawnTime = millis();
    spawnInterval = random(700, 1400); // new random wait
  }
}

function updateBuds() {
  // go backwards so we can safely splice
  for (let i = buds.length - 1; i >= 0; i--) {
    let b = buds[i];

    // if it bloomed: draw lotus and fade out a bit
    if (b.bloomed) {
      let t = millis() - b.bloomTime;
      let alpha = map(t, 0, 600, 255, 0);
      alpha = constrain(alpha, 0, 255);

      push();
      tint(255, alpha);
      image(lotusImg, b.x, b.y, 70, 70);
      pop();

      if (t > 600) {
        buds.splice(i, 1); // remove bloomed lotus after 0.6s
      }
      continue;
    }

    // not bloomed yet → it's a bud
    let age = millis() - b.createdAt;
    let remaining = b.lifeSpan - age;

    // draw bud (circle that shrinks slightly as time passes)
    let r = map(remaining, 0, b.lifeSpan, BUD_RADIUS * 0.6, BUD_RADIUS);
    r = constrain(r, BUD_RADIUS * 0.6, BUD_RADIUS);

    noStroke();
    fill(250, 230, 120); // soft yellow bud
    circle(b.x, b.y, r * 2);

    // if it expired (not clicked in time)
    if (remaining <= 0) {
      buds.splice(i, 1);
      lives--;
      if (lives <= 0) {
        gameOver = true;
      }
    }
  }
}

// =======================
// INPUT
// =======================
function mousePressed() {
  if (gameOver) {
    // click anywhere to restart
    resetGame();
    return;
  }

  // check if we clicked a bud
  for (let i = buds.length - 1; i >= 0; i--) {
    let b = buds[i];
    if (b.bloomed) continue;

    let d = dist(mouseX, mouseY, b.x, b.y);
    if (d < BUD_RADIUS) {
      // bloom it
      b.bloomed = true;
      b.bloomTime = millis();
      score++;
      break; // one bud per click
    }
  }
}
