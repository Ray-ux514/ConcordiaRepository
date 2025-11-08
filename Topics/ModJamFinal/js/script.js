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

// For frog jumping
let pads = [];
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
  body: { x: 300, y: 480, size: 150 },
  tongue: {
    x: 300,
    y: 450,
    size: 10,
    speed: 15,
    state: "idle",
    offsetY: -30, // mouth offset so the tongue starts from the frog's mouth
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
  y: 370,
  width: 90,
  height: 55,
  color: "rgba(255,255,255,0)",
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
  x: 0,
  y: 200, // Will be random
  size: 10,
  speed: 3,
  //MOD: defining modes for different movement
  mode: "straight", // mode can be: straight, sine, jitter
  baseY: 200,
  angle: 0,
};

//Score
let score = 0;

//diffiulty Progression
fly.speed = 3 + score * 0.2;

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

  pads = [
    { x: 150, y: 300 },
    { x: 400, y: 260 },
    { x: 650, y: 320 },
  ];

  // Give the fly its first random position
  resetFly();
}

function draw() {
  if (state === "menu") {
    mouseHover();
    drawMenu();
  } else if (state === "game") {
    drawGame();
    drawProgressBar();
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
  text("CATCHING BUGS", width / 2, 100);

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
    "In Catching Flies, use your mouse to move and click the space bar to catch the flies with your tongue. You can also jump between lily pads by clicking on them with your mouse." +
      "if ever you want to give up click T",
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
  moveFly();
  drawFly();
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
  stroke("#ff0000");
  strokeWeight(frog.tongue.size / 2);
  line(mouthX, mouthY, frog.tongue.x, frog.tongue.y);
  fill("#ff0000");
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
  // background color
  //lily1

  //frog decoration (if you want it to stay here too)

  push();
  image(lily1, 295, 230 + sin(frameCount * 0.04) * 3, 275, 130);
  pop();

  // lotus1
  push();
  image(lotus1, 46, 170 + sin(frameCount * 0.03) * 3, 55, 50);
  pop();

  push();
  image(lotus1shadow, 35, 220, 75, 53);
  pop();

  for (let p of pads) {
    noStroke();
    fill(0, 255, 0, 50);
    ellipse(p.x, p.y, 100, 40);
  }
}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
  // Move the fly
  fly.x += fly.speed;

  //MOD: Defining all the new modes of movement
  if (fly.mode === "straight") {
  }
  //Referencing mr angry assignement with movement for the fly
  else if (fly.mode === "sine") {
    fly.angle += 0.08;
    fly.y = fly.baseY + sin(fly.angle) * 30;
  } else if (fly.mode === "jitter") {
    fly.y += random(-2, 2);
    resetFly();
  }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
  push();
  noStroke();
  fill("#000000");
  ellipse(fly.x, fly.y, fly.size);
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
  fly.x = -20;

  //MOD: using fly.baseY as reference & same room added as before
  fly.baseY = random(30, 300);
  fly.y = fly.baseY;

  //MOD: different speed for each fly
  fly.speed = random(2, 4);

  //MOD: Angle reset for the sine movement
  fly.angle = 0;

  //MOD: random picker for movement
  const modes = ["straight", "sine", "jitter"];
  fly.mode = random(modes);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
  frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  // Tongue matches the frog's x
  frog.tongue.x = frog.body.x;
  // If the tongue is idle, it doesn't do anything
  if (frog.tongue.state === "idle") {
    // Do nothing
  }
  // If the tongue is outbound, it moves up
  else if (frog.tongue.state === "outbound") {
    frog.tongue.y += -frog.tongue.speed;
    // The tongue bounces back if it hits the top
    if (frog.tongue.y <= 0) {
      frog.tongue.state = "inbound";
    }
  }
  // If the tongue is inbound, it moves down
  else if (frog.tongue.state === "inbound") {
    frog.tongue.y += frog.tongue.speed;
    // Reset when back to mouth
    if (frog.tongue.y >= frog.body.y + frog.tongue.offsetY) {
      frog.tongue.y = frog.body.y + frog.tongue.offsetY;
      frog.tongue.state = "idle";
    }
  }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;

  if (eaten) {
    // adds score and fly count
    score++;
    bugsCaught++;

    // Reset the fly
    resetFly();

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
  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textFont(font1);
  textSize(40);
  text("YOU WIN! 🐸✨", width / 2, height / 2 - 20);
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
    }
  }
}

function mousePressed() {
  if (state === "menu") {
    // Click Start
    if (
      mouseX > startbuttonR.x &&
      mouseX < startbuttonR.x + startbuttonR.width &&
      mouseY > startbuttonR.y &&
      mouseY < startbuttonR.y + startbuttonR.height
    ) {
      state = "game";
    }

    if (
      mouseX > instructionsButton.x &&
      mouseX < instructionsButton.x + instructionsButton.width &&
      mouseY > instructionsButton.y &&
      mouseY < instructionsButton.y + instructionsButton.height
    ) {
      state = "instructions";
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
    }
  }
  if (state === "win") {
    bugsCaught = 0;
    score = 0;
    gameWon = false;
    state = "menu";
  }

  if (state === "game" && !isJumping) {
    for (let p of pads) {
      let d = dist(mouseX, mouseY, p.x, p.y);
      if (d < 50) {
        // clicked on pad area
        jumpStart = { x: frog.body.x, y: frog.body.y };
        jumpTarget = { x: p.x, y: p.y - 30 }; // land slightly above pad
        isJumping = true;
        jumpProgress = 0;
      }
    }
  }
}

function keyPressed() {
  if (key === " " && frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
}
