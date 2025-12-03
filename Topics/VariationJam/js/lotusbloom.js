//=========
// Lotus Bloom
//===

"use sctrict";

let lotusimg;
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
  lotusImg = loadImage("assets/lotus.png");
  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
}

function setup() {
  createCanvas(850, 500);
  ImageMode(CENTER);
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
  background("#022f3a"); // dark pond

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
