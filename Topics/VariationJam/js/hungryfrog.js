/**
 * Hungry Hungry Frogs – center-spawn version
 * Flies spawn in the middle and move outward.
 * You are the bottom frog – press Z to eat flies.
 */

"use strict";

let gameState = "play"; // "play" or "end"

let centerX, centerY;
let pondRadius = 120;

// frogs
let frogs = []; // 👈 ADD THIS LINE

// IMAGES
let lilyPadImg;
let frogImgs = []; // one image per frog (or reuse the same one)
let playerIndex = 2; // 0 = top, 1 = right, 2 = bottom (you), 3 = left
let frogRingRadius; // distance of frogs from center

// flies
let flies = [];
let winningScore = 12; // first frog to reach 6 flies wins

let bgColor = "#edb5ad";
let pondColor = "#4f8e3b";
function preload() {
  // change these paths to match your project
  lilyPadImg = loadImage("assets/images/lilypad.png");

  frogImgs[0] = loadImage("assets/images/orangefrog.png");
  frogImgs[1] = loadImage("assets/images/bluefrog.png");
  frogImgs[2] = loadImage("assets/images/frog.png"); // player
  frogImgs[3] = loadImage("assets/images/yellowfrog.png");
}

function setup() {
  createCanvas(850, 500);
  centerX = width / 2;
  centerY = height / 2;

  setupFrogs();

  // starting flies
  for (let i = 0; i < 6; i++) {
    flies.push(makeFly());
  }
}

//fly

function setupFrogs() {
  frogs = [];
  let angles = [-HALF_PI, 0, HALF_PI, PI]; // top, right, bottom, left

  frogRingRadius = pondRadius + 70;

  for (let i = 0; i < 6; i++) {
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
  background(bgColor);

  if (gameState === "play") {
    drawPond();
    updateFlies();
    updateFrogs();
    checkTongueHits();
    drawFlies();
    drawFrogs();
    drawScoreboard();
  }
}

//functions

function drawPond() {
  push();
  imageMode(CENTER);

  // draw your lily pad image at the center
  image(lilyPadImg, centerX, centerY, 328, 313);

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

function drawFlies() {
  noStroke();
  fill(0);
  for (let fly of flies) {
    if (!fly.alive) continue;
    let p = flyPosition(fly);
    ellipse(p.x, p.y, fly.size);
  }
}

function drawScoreboard() {
  push();
  textAlign(LEFT, TOP);
  textSize(18);
  fill(255);

  text("Hungry Frogs – first to " + winningScore + " wins", 20, 20);
  text("Press Z to use your tongue", 20, 45);

  let playerScore = frogs[playerIndex].score;
  let enemyScore = frogs[0].score + frogs[1].score + frogs[3].score;

  text("Your score: " + playerScore, 20, 80);
  text("Other frogs: " + enemyScore, 20, 105);
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

// IMPORTANT CHANGE: tongue always aims from frog TOWARD the lily pad (center)
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
      checkWin(frog); // see if this made them win
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

function mousePressed() {
  if (gameState === "end") {
    flies = [];
    setupFrogs();
    for (let i = 0; i < 6; i++) {
      flies.push(makeFly());
    }
    gameState = "play";
  }
}
