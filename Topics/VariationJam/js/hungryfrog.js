/**
 * Hungry Hungry Frogs – center-spawn version
 * Flies spawn in the middle and move outward.
 press Z to eat flies.
 */

"use strict";
// ===== ASSETS & GAME STATE =====

let gameState = "instructions"; // "instructions", "play", "end"

let font1;
let font2;
let startbuttonImg;
let startbuttonHoverImg;
let startbuttonCurrent;

let centerX, centerY;
let pondRadius = 120;

// frogs
let frogs = []; //

// IMAGES
let lilyPadImg;
let frogImgs = []; // one image per frog
let playerIndex = 2; // 0 = top, 1 = right, 2 = bottom (you), 3 = left
let frogRingRadius; // distance of frogs from center

// flies
let flies = [];
let winningScore = 12; // first frog to reach 6 flies wins

//star button
const startbuttonR = {
  x: 660,
  y: 380,
  width: 150,
  height: 50,
  color: "rgba(255,255,255,0)",
};

let bgColor = "#edb5ad";
let pondColor = "#4f8e3b";
function preload() {
  // assest and images
  lilyPadImg = loadImage("assets/images/lilypad.png");

  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
  startbuttonImg = loadImage("assets/images/start_default.png");
  startbuttonHoverImg = loadImage("assets/images/start_hover.png");

  frogImgs[0] = loadImage("assets/images/orangefrog.png");
  frogImgs[1] = loadImage("assets/images/bluefrog.png");
  frogImgs[2] = loadImage("assets/images/frog.png"); // player
  frogImgs[3] = loadImage("assets/images/yellowfrog.png");
}

function setup() {
  createCanvas(850, 500);
  centerX = width / 2;
  centerY = height / 2;
  startbuttonCurrent = startbuttonImg;
  imageMode(CENTER);

  setupFrogs();

  // starting flies
  for (let i = 0; i < 6; i++) {
    flies.push(makeFly());
  }
}

//fly

function setupFrogs() {
  frogs = [];
  let angles = [-HALF_PI, 0, HALF_PI, PI]; // 4 frogs

  frogRingRadius = pondRadius + 70;

  for (let i = 0; i < 4; i++) {
    frogs.push(makeFrog(angles[i], i === playerIndex));
  }
}

function makeFrog(angle, isPlayer) {
  return {
    angle: angle, // angle from center to frog
    radius: frogRingRadius, // distance from center
    isPlayer: isPlayer,
    score: 0,
    tongue: {
      length: 0,
      maxLength: 160,
      speed: 18,
      state: "idle", // "idle", "outbound", "inbound"
    },
  };
}

// Flies now spawn from the CENTER and move outward
function makeFly() {
  let angle = random(TWO_PI);
  return {
    angle: angle,
    r: 0, // start at center
    speed: random(1.5, 2.5), // move outward
    size: 10,
    alive: true,
  };
}

// drawloop

function draw() {
  if (gameState === "instructions") {
    mouseHover();
    drawInstructions();
  } else if (gameState === "play") {
    drawGame();
  } else if (gameState === "end") {
    drawEndScreen();
  }
}

function drawGame() {
  background(bgColor);

  drawPond();
  updateFlies();
  updateFrogs();
  checkTongueHits();
  drawFlies();
  drawFrogs();
  drawScoreboard();
}
function resetGame() {
  // reset scores
  for (let f of frogs) {
    f.score = 0;
    f.tongue.length = 0;
    f.tongue.state = "idle";
  }
  // reset flies
  flies = [];
  for (let i = 0; i < 6; i++) {
    flies.push(makeFly());
  }
  gameState = "play";
}
//functions

function drawPond() {
  push();
  imageMode(CENTER);

  // draw your lily pad image at the center
  image(lilyPadImg, centerX, centerY, 328, 313);

  pop();
}
//imstructions//
function drawInstructions() {
  background(bgColor);

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
    "The goal is to eat as many flies as you can, press the 'z' key to active the frogs tongue! Th first to 12 wins don't be slow. Each fly you catch brings you closer to victory.\n\n" +
      "Stay quick, stay alert, and good luck!",
    40,
    150,
    350
  );

  //bluefrog//
  push();
  image(frogImgs[2], 660, 230, 95, 90);
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

function drawFrogs() {
  for (let i = 0; i < frogs.length; i++) {
    let f = frogs[i];
    let mouth = frogMouthPosition(f);
    let tongueTip = frogTongueTip(f);

    // --- TONGUE (still works the same) ---
    if (f.tongue.length > 0) {
      stroke("#d47171");
      strokeWeight(8);
      line(mouth.x, mouth.y, tongueTip.x, tongueTip.y);
      noStroke();
      fill("#d47171");
      ellipse(tongueTip.x, tongueTip.y, 16);
    }

    // --- FROG IMAGE (simple like your flowers) ---
    let img = frogImgs[i] || frogImgs[0];

    let frogW = 110; // width of frog image on screen
    let frogH = 110; // height

    push();
    imageMode(CORNER); // top-left corner mode
    // draw image so it’s centered on the mouth position
    image(img, mouth.x - frogW / 2, mouth.y - frogH / 2, frogW, frogH);
    pop();
  }
}

//fliees//
function drawFlies() {
  noStroke();
  fill(0);
  for (let fly of flies) {
    if (!fly.alive) continue;
    let p = flyPosition(fly);
    ellipse(p.x, p.y, fly.size);
  }
}
//scoreboard//
function drawScoreboard() {
  push();
  textAlign(LEFT, TOP);
  textFont(font2);
  textSize(18);
  fill(255);

  let playerScore = frogs[playerIndex].score;
  let enemyScore = frogs[0].score + frogs[1].score + frogs[3].score;

  text("Your score: " + playerScore, 20, 30);
  text("Other frogs: " + enemyScore, 700, 30);
  pop();
}

function drawEndScreen() {
  let playerScore = frogs[playerIndex].score;
  let enemyScore = frogs[0].score + frogs[1].score + frogs[3].score;

  push();
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(40);
  text("ROUND OVER", width / 2, height / 2 - 40);

  textSize(22);
  text(
    "You: " + playerScore + "   •   Other frogs: " + enemyScore,
    width / 2,
    height / 2 + 5
  );

  let result =
    playerScore > enemyScore
      ? "You win!"
      : playerScore === enemyScore
      ? "It's a tie!"
      : "The other frogs ate more…";

  text(result, width / 2, height / 2 + 40);
  text("Click to play again", width / 2, height / 2 + 80);
  pop();
}

// ------------------------- POSITION HELPERS -------------------------

function frogMouthPosition(frog) {
  // frog sits outside the pond
  return {
    x: centerX + cos(frog.angle) * frog.radius,
    y: centerY + sin(frog.angle) * frog.radius,
  };
}

function frogTongueTip(frog) {
  let mouth = frogMouthPosition(frog);
  let dirToCenter = atan2(centerY - mouth.y, centerX - mouth.x);
  return {
    x: mouth.x + cos(dirToCenter) * frog.tongue.length,
    y: mouth.y + sin(dirToCenter) * frog.tongue.length,
  };
}

function flyPosition(fly) {
  return {
    x: centerX + cos(fly.angle) * fly.r,
    y: centerY + sin(fly.angle) * fly.r,
  };
}

// ------------------------- UPDATES -------------------------

function updateFrogs() {
  for (let i = 0; i < frogs.length; i++) {
    let f = frogs[i];

    // tongue animation
    if (f.tongue.state === "outbound") {
      f.tongue.length += f.tongue.speed;
      if (f.tongue.length >= f.tongue.maxLength) {
        f.tongue.state = "inbound";
      }
    } else if (f.tongue.state === "inbound") {
      f.tongue.length -= f.tongue.speed;
      if (f.tongue.length <= 0) {
        f.tongue.length = 0;
        f.tongue.state = "idle";
      }
    }

    //  non-player frogs: chomp when a fly passes in front of them
    if (!f.isPlayer && f.tongue.state === "idle") {
      let closeFly = nearestFlyForFrog(f, 25); // 25 px radial window
      if (closeFly && random() < 0.3) {
        f.tongue.state = "outbound";
      }
    }
  }
}

// Flies move outward from center
function updateFlies() {
  for (let fly of flies) {
    if (!fly.alive) continue;

    fly.r += fly.speed; // outwards

    let maxR = frogRingRadius + 60; // a bit past the frogs

    // If a fly passes all the frogs, it's "missed" and an enemy frog gets it
    if (fly.r > maxR) {
      fly.alive = false;

      // give to a random non-player frog
      let idx = floor(random(frogs.length - 1));
      if (idx >= playerIndex) idx++; // skip player index

      let frog = frogs[idx];
      frog.score++;
      checkWin(frog);
    }
  }

  // respawn flies while game is still going
  for (let i = 0; i < flies.length; i++) {
    if (!flies[i].alive && gameState === "play") {
      flies[i] = makeFly();
    }
  }
}

function checkTongueHits() {
  for (let fly of flies) {
    if (!fly.alive) continue;

    let flyPos = flyPosition(fly);

    for (let f of frogs) {
      if (f.tongue.length <= 0) continue;

      let tip = frogTongueTip(f);
      let d = dist(flyPos.x, flyPos.y, tip.x, tip.y);
      if (d < 15) {
        fly.alive = false;
        f.score++;
        checkWin(f); // check if this frog wins
        break;
      }
    }
  }
}

// find a fly roughly along this frog's angle and near its radius
function nearestFlyForFrog(frog, radialWindow) {
  let bestFly = null;
  let bestAngDiff = Infinity;

  for (let fly of flies) {
    if (!fly.alive) continue;

    // fly must be near the frog's distance from center
    if (abs(fly.r - frogRingRadius) > radialWindow) continue;

    // check angle difference
    let dA = angleDifference(fly.angle, frog.angle);
    if (dA < radians(25) && dA < bestAngDiff) {
      bestAngDiff = dA;
      bestFly = fly;
    }
  }
  return bestFly;
}

function angleDifference(a, b) {
  let d = abs(a - b) % TWO_PI;
  return d > PI ? TWO_PI - d : d;
}
function checkWin(frog) {
  if (frog.score >= winningScore && gameState === "play") {
    gameState = "end";
    drawEndScreen();
  }
}

//input
function keyPressed() {
  if (gameState !== "play") return;

  // player frog tongue
  let player = frogs[playerIndex];
  if (key === "z" || key === "Z") {
    if (player.tongue.state === "idle") {
      player.tongue.state = "outbound";
    }
  }
}
function checkWin(frog) {
  if (frog.score >= winningScore && gameState === "play") {
    gameState = "end";
  }
}

function mouseHover() {
  if (gameState === "instructions") {
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
  // from instructions → start game
  if (gameState === "instructions") {
    const left = startbuttonR.x - startbuttonR.width / 2;
    const right = startbuttonR.x + startbuttonR.width / 2;
    const top = startbuttonR.y - startbuttonR.height / 2;
    const bottom = startbuttonR.y + startbuttonR.height / 2;

    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
      resetGame();
      gameState = "play";
    }
    return;
  }

  // from end screen → restart
  if (gameState === "end") {
    resetGame();
    return;
  }
}
