/**
 * Frogfrogfrog
 * Pippin Barr
 *
 * A game of catching flies with your frog-tongue
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let state = "menu";
let animatedProgress = 0;

let totalBugs = 6; // total bugs to catch
let bugsCaught = 0; // current number of bugs caught
let gameWon = false;
let bar = [];

// clickable bounds updated each frame
let bigLilyRect = { x: 285, y: 304, w: 400, h: 180 };
let lily3Rect = { x: 35, y: 294, w: 210, h: 100 };
let otherlilyRect = { x: 255, y: 154, w: 223, h: 106 };
const FROG_LAND_Y_OFFSET = -25; // sit nicely on pads

// For frog jumping
let isJumping = false;
let jumpStart;
let jumpTarget;
let jumpProgress = 0;

//images
let lily1;
let lotus;
let frog1;
let lotus1;
let lotus1shadow;
let lotus2shadow;
let font1;
let font2;
let lily2;
let lily3;
let lily4;
let frogImg;

let startbuttonImg;
let startbuttonHoverImg;
let startbuttonCurrent;
let instructionsDefault;
let instructionsHover;
let instructionsCurrent;
let backbuttondefault;
let backbuttonhover;
let backbuttonCurrent;

// Our frog
let frog = {
  body: {
    x: 485,
    y: 394 - 15, // lift up 25 px so frog sits nicely
    size: 110,
  },

  tongue: {
    x: 300,
    y: 450,
    size: 15,
    speed: 15,
    state: "idle",
    offsetY: -10, // mouth offset so the tongue starts from the frog's mouth
  },
};

const startbuttonR = {
  x: 260,
  y: 370,
  width: 150,
  height: 50,
  color: "rgba(255,255,255,0)",
};

const instructionsButton = {
  x: 440,
  y: 370,
  width: 150,
  height: 50,
  color: "rgba(255,255,255,0)",
};

const backbutton = {
  x: 40,
  y: 390,
  width: 90,
  height: 55,
  color: "rgba(255,255,255,0)",
};

// Our fly
// Has a position, size, and speed of horizontal movement
let flies = [];

/**
 * Creates the canvas and initializes the fly
 */

function preload() {
  lily1 = loadImage("assets/images/lily.png");
  frog1 = loadImage("assets/images/frog1.png");
  frogImg = loadImage("assets/images/frog.png");

  lotus1 = loadImage("assets/images/lotus1.png");
  lotus1shadow = loadImage("assets/images/lotus1shadow.png");
  lotus2shadow = loadImage("assets/images/lotus2shadow.png");

  font1 = loadFont("assets/fonts/ABCMaxiPlusVariable-Trial.ttf");
  font2 = loadFont("assets/fonts/ABCGinto-Regular-Trial.otf");
  lily2 = loadImage("assets/images/lily2.png");
  lily3 = loadImage("assets/images/lily3.png");
  lily4 = loadImage("assets/images/lily4.png");

  startbuttonImg = loadImage("assets/images/start_default.png");
  startbuttonHoverImg = loadImage("assets/images/start_hover.png");
  instructionsDefault = loadImage("assets/images/instructions_default.png");
  instructionsHover = loadImage("assets/images/instructions_hover.png");
  backbuttondefault = loadImage("assets/images/backbuttondefault.png");
  backbuttonhover = loadImage("assets/images/backbuttonhover.png");
}
function setup() {
  createCanvas(850, 500);
  startbuttonCurrent = startbuttonImg;
  instructionsCurrent = instructionsDefault;
  backbuttonCurrent = backbuttondefault;

  bar = {
    x: width / 2 - 300,
    y: 30,
    w: 600,
    h: 40,
  };
  // create multiple flies
  for (let i = 0; i < 4; i++) {
    // 4 flies (you can change this to 6, 10, etc.)
    flies.push(makeFly());
  }

  syncTongueToMouth();
}

function draw() {
  if (state === "menu") {
    mouseHover();
    drawMenu();
  } else if (state === "game") {
    drawGame();
  } else if (state === "instructions") {
    drawInstructions();
    mouseHover();
  } else if (state === "win") {
    drawWin();
  }
}

function drawMenu() {
  background("#06464a");
  image(lily1, 264, 175, 342, 161);
  push();
  image(frog1, -8, 330 + sin(frameCount * 0.04) * 3, 218, 108);
  pop();

  //1st lotus
  push();
  image(lotus1, 46, 170 + sin(frameCount * 0.03) * 3, 65, 60);
  pop();

  push();
  image(lotus1shadow, 35, 220, 80, 58);
  pop();

  // title
  textAlign(CENTER, CENTER); // center your text
  textFont(font1);
  textSize(36);
  fill("#ffffff");
  text("CATCHING FLIES", width / 2, 100);

  //lily2
  push();
  image(lily2, 618, 346, 190, 110);
  pop();

  //lily3
  push();
  image(lily3, 600, -6 + sin(frameCount * 0.03) * 3, 170, 90);
  pop();

  //button1start
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

  //instructionsbutton
  push();
  noStroke();
  fill(instructionsButton.color);
  image(
    instructionsCurrent,
    instructionsButton.x,
    instructionsButton.y,
    instructionsButton.width,
    instructionsButton.height
  );
  pop();
}

function drawInstructions() {
  background("#06464a");

  textAlign(LEFT);
  textFont(font1);
  textSize(32);
  fill("#ffffff");
  text("INSTRUCTIONS", 40, 50);

  textSize(20);
  textFont(font2);
  textWrap(WORD);
  text(
    "Move your frog by clicking on the open lily pads around the pond. Time your jumps carefully, the flies won’t stay in one place for long! When a fly gets close enough, press the Z key to use your tongue and grab it. Each fly you catch brings you closer to victory.\n\n" +
      "Catch all 6 flies to win the game. Stay quick, stay alert, and good luck!",
    40,
    100,
    350
  );

  //flower
  push();
  image(lily4, 380, 290 + sin(frameCount * 0.03) * 3, 410, 190);
  pop();

  //lotus
  push();
  image(lotus1, 770, 230, 55, 50);
  pop();

  push();
  image(lotus2shadow, 770, 280, 52, 32);
  pop();

  //backbutton
  push();
  noStroke();
  fill(backbutton.color);
  image(
    backbuttonCurrent,
    backbutton.x,
    backbutton.y,
    backbutton.width,
    backbutton.height
  );
  pop();
}
// next draw instructions//
//background
//text
//add button
//add title
//and lily pad

//  else if (gameState === "instructions"){showInstructions();
function drawGame() {
  background("#06464a");
  drawProgressBar();
  checkTongueFlyOverlap();
  drawEnvironment();
  moveFlies();
  drawFlies();
  updateFrogJump();
  moveFrog();
  moveTongue();
  drawFrog();

  //see the last
}
function drawFrog() {
  // Calculate mouth position (start of tongue)
  let mouthX = frog.body.x;
  let mouthY = frog.body.y + frog.tongue.offsetY;

  // Tongue movement and drawing
  push();
  stroke("#d47171");
  strokeWeight(frog.tongue.size / 2);
  line(mouthX, mouthY, frog.tongue.x, frog.tongue.y);
  fill("#d47171");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Frog image
  push();
  imageMode(CENTER);
  image(frogImg, frog.body.x, frog.body.y, frog.body.size, frog.body.size);
  pop();
}
function drawEnvironment() {
  // lily1
  push();
  image(lily1, 595, 180 + sin(frameCount * 0.04) * 3, 180, 85);
  pop();

  // lotus1 with shadow
  push();
  image(lotus1, 46, 170 + sin(frameCount * 0.03) * 3, 55, 50);
  pop();
  push();
  image(lotus1shadow, 35, 220, 75, 53);
  pop();

  // lotus on right
  push();
  image(lotus1, 770, 330 + sin(frameCount * 0.03) * 3, 55, 50);
  pop();
  push();
  image(lotus2shadow, 770, 380, 52, 32);
  pop();

  // BIG LILY (static) – keep rect synced
  bigLilyRect = { x: 285, y: 304, w: 400, h: 180 };
  push();
  image(lily4, bigLilyRect.x, bigLilyRect.y, bigLilyRect.w, bigLilyRect.h);
  pop();
  otherlilyRect = { x: 255, y: 154, w: 223, h: 106 };
  push();
  image(
    lily4,
    otherlilyRect.x,
    otherlilyRect.y,
    otherlilyRect.w,
    otherlilyRect.h
  );
  pop();

  // LILY 3 (bobbing) – update rect.y based on current bob
  const lily3Y = 294 + sin(frameCount * 0.04) * 3;
  lily3Rect = { x: 35, y: lily3Y, w: 210, h: 100 };
  push();
  image(lily3, lily3Rect.x, lily3Rect.y, lily3Rect.w, lily3Rect.h);
  pop();

  textAlign(LEFT, BOTTOM);
  textFont(font1);
  textSize(18);
  fill("#ffffff");
  text("Press Q to quit", 40, 450);
  text("Press Z to capture flies", 40, 470);
}
function jumpTo(cx, cy) {
  // Start at current frog position
  jumpStart = { x: frog.body.x, y: frog.body.y };
  // Land centered on the pad, nudged up a bit so it “sits” nicely
  jumpTarget = { x: cx, y: cy + FROG_LAND_Y_OFFSET };
  isJumping = true;
  jumpProgress = 0;
}
function moveFrog() {}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */

function makeFly() {
  return {
    x: -20,
    y: random(30, 300),
    size: 10,
    speed: random(2, 4),
    mode: random(["straight", "sine", "jitter"]),
    baseY: random(30, 300),
    angle: 0,
  };
}

function moveFlies() {
  for (let f of flies) {
    // horizontal movement
    f.x += f.speed;

    // movement modes
    if (f.mode === "straight") {
      // no change
    } else if (f.mode === "sine") {
      f.angle += 0.08;
      f.y = f.baseY + sin(f.angle) * 30;
    } else if (f.mode === "jitter") {
      f.y += random(-2, 2);
    }

    // offscreen → respawn
    if (f.x > width + 30) {
      Object.assign(f, makeFly()); // replaces fields with a new fresh fly
    }
  }
}

/**
 * Draws the fly as a black circle
 */
function drawFlies() {
  push();
  noStroke();
  fill(0);
  for (let f of flies) {
    ellipse(f.x, f.y, f.size);
  }
  pop();
}

function drawScore() {
  fill(0);
  textSize(24);
  text("Score: " + score, 10, 30);
}
/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
  // spawn slightly offscreen
  fly.x = -20;

  // random base height
  fly.baseY = random(30, 300);
  fly.y = fly.baseY;

  // random speed
  fly.speed = random(2, 4);

  // reset sine angle
  fly.angle = 0;

  // random mode (straight / sine / jitter)
  const modes = ["straight", "sine", "jitter"];
  fly.mode = random(modes);
}

/**
 * Moves the frog to the mouse position on x
 */

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  // Tongue always matches frog's x
  frog.tongue.x = frog.body.x;

  if (frog.tongue.state === "idle") {
    // keep the tip parked at the mouth when not shooting
    syncTongueToMouth();
  } else if (frog.tongue.state === "outbound") {
    frog.tongue.y -= frog.tongue.speed;
    if (frog.tongue.y <= 0) {
      frog.tongue.state = "inbound";
    }
  } else if (frog.tongue.state === "inbound") {
    frog.tongue.y += frog.tongue.speed;
    if (frog.tongue.y >= frog.body.y + frog.tongue.offsetY) {
      syncTongueToMouth(); // snap cleanly to mouth
      frog.tongue.state = "idle";
    }
  }
}

function syncTongueToMouth() {
  // mouth position
  const mouthX = frog.body.x;
  const mouthY = frog.body.y + frog.tongue.offsetY;
  frog.tongue.x = mouthX;
  frog.tongue.y = mouthY;
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  for (let f of flies) {
    const d = dist(frog.tongue.x, frog.tongue.y, f.x, f.y);
    if (d < frog.tongue.size / 2 + f.size / 2) {
      bugsCaught++;

      // respawn this fly only
      Object.assign(f, makeFly());

      // Bring back the tongue
      frog.tongue.state = "inbound";

      // Check win condition
      if (bugsCaught >= totalBugs) {
        bugsCaught = totalBugs;
        gameWon = true;
        state = "win";
      }
    }
  }
}
function drawProgressBar() {
  // Outer bar
  push();
  stroke("#ce2a4d");
  strokeWeight(12);
  fill("#ce2a4d");
  rect(bar.x, bar.y, bar.w, bar.h, 30);
  pop();

  // Fill progress
  let progress = map(bugsCaught, 0, totalBugs, 0, bar.w);

  // Smoothly move toward target
  animatedProgress = lerp(animatedProgress, progress, 0.1);

  noStroke();
  fill("##ffffff");
  rect(bar.x, bar.y, animatedProgress, bar.h, 30);

  // Optional: text above bar
}

function drawWin() {
  background("#06464a");
  fill("#ce2a4d");
  textAlign(CENTER, CENTER);
  textFont(font1);
  textSize(48);
  text("YOU WIN!", width / 2, height / 2 - 20);
  fill("#fffff");

  textSize(20);
  text("Click to return to the menu", width / 2, height / 2 + 40);
}
//hover
function mouseHover() {
  if (
    state === "menu" &&
    mouseX > startbuttonR.x &&
    mouseX < startbuttonR.x + startbuttonR.width &&
    mouseY > startbuttonR.y &&
    mouseY < startbuttonR.y + startbuttonR.height
  ) {
    startbuttonCurrent = startbuttonHoverImg;
  } else {
    startbuttonCurrent = startbuttonImg;
  }
  if (
    state === "menu" &&
    mouseX > instructionsButton.x &&
    mouseX < instructionsButton.x + instructionsButton.width &&
    mouseY > instructionsButton.y &&
    mouseY < instructionsButton.y + instructionsButton.height
  ) {
    instructionsCurrent = instructionsHover;
  } else {
    instructionsCurrent = instructionsDefault;
  }
  if (
    state == "instructions" &&
    mouseX > backbutton.x &&
    mouseX < backbutton.x + backbutton.width &&
    mouseY > backbutton.y &&
    mouseY < backbutton.y + backbutton.height
  ) {
    backbuttonCurrent = backbuttonhover;
  } else {
    backbuttonCurrent = backbuttondefault;
  }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */

function updateFrogJump() {
  if (isJumping) {
    jumpProgress += 0.03;

    // Smooth curved motion
    frog.body.x = lerp(jumpStart.x, jumpTarget.x, jumpProgress);
    frog.body.y =
      lerp(jumpStart.y, jumpTarget.y, jumpProgress) -
      sin(jumpProgress * PI) * 60;

    // End jump
    if (jumpProgress >= 1) {
      frog.body.x = jumpTarget.x;
      frog.body.y = jumpTarget.y;
      isJumping = false;
      syncTongueToMouth(); // keep tongue tip at the mouth after landing
    }
  }
}

function mousePressed() {
  // 1) Handle WIN first and stop
  if (state === "win") {
    resetGame();
    state = "menu";
    return;
  }

  if (state === "menu") {
    if (
      mouseX > startbuttonR.x &&
      mouseX < startbuttonR.x + startbuttonR.width &&
      mouseY > startbuttonR.y &&
      mouseY < startbuttonR.y + startbuttonR.height
    ) {
      resetGame();
      state = "game";
      return;
    }
    if (
      mouseX > instructionsButton.x &&
      mouseX < instructionsButton.x + instructionsButton.width &&
      mouseY > instructionsButton.y &&
      mouseY < instructionsButton.y + instructionsButton.height
    ) {
      state = "instructions";
      return;
    }
  }

  if (state === "instructions") {
    if (
      mouseX > backbutton.x &&
      mouseX < backbutton.x + backbutton.width &&
      mouseY > backbutton.y &&
      mouseY < backbutton.y + backbutton.height
    ) {
      state = "menu";
      return;
    }
  }

  if (state === "game" && !isJumping) {
    // lily3
    if (
      mouseX >= lily3Rect.x &&
      mouseX <= lily3Rect.x + lily3Rect.w &&
      mouseY >= lily3Rect.y &&
      mouseY <= lily3Rect.y + lily3Rect.h
    ) {
      const cx = lily3Rect.x + lily3Rect.w / 2;
      const cy = lily3Rect.y + lily3Rect.h / 2;
      jumpTo(cx, cy);
      return;
    }
    // big lily
    if (
      mouseX >= bigLilyRect.x &&
      mouseX <= bigLilyRect.x + bigLilyRect.w &&
      mouseY >= bigLilyRect.y &&
      mouseY <= bigLilyRect.y + bigLilyRect.h
    ) {
      const cx = bigLilyRect.x + bigLilyRect.w / 2;
      const cy = bigLilyRect.y + bigLilyRect.h / 2;
      jumpTo(cx, cy);
      return;
    }
  }
  if (
    mouseX >= otherlilyRect.x &&
    mouseX <= otherlilyRect.x + otherlilyRect.w &&
    mouseY >= otherlilyRect.y &&
    mouseY <= otherlilyRect.y + otherlilyRect.h
  ) {
    const cx = otherlilyRect.x + otherlilyRect.w / 2;
    const cy = otherlilyRect.y + otherlilyRect.h / 2;
    jumpTo(cx, cy);
    return;
  }
}

function keyPressed() {
  if (key === "z" && frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  } else if (key === "q" && state == "game") {
    state = "menu";
  }
}
function resetGame() {
  // scores & UI
  bugsCaught = 0;
  animatedProgress = 0;
  gameWon = false;

  // respawn flies fresh
  flies = [];
  for (let i = 0; i < 4; i++) flies.push(makeFly());

  // park frog & tongue back on the big lily center
  const cx = bigLilyRect.x + bigLilyRect.w / 2;
  const cy = bigLilyRect.y + bigLilyRect.h / 2;
  frog.body.x = cx;
  frog.body.y = cy + FROG_LAND_Y_OFFSET;
  syncTongueToMouth();
}
