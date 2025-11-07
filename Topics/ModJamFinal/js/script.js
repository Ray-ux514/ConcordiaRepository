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

//images
let lily1;
let lotus;
let frog1;
let lotus1;
let lotus1shadow;
let font1;
let font2;
let lily2;
let lily3;
let lily4;

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
const frog = {
  // The frog's body has a position and size
  body: {
    x: 320,
    y: 520,
    size: 150,
  },
  // The frog's tongue has a position, size, speed, and state
  tongue: {
    x: undefined,
    y: 480,
    size: 20,
    speed: 20,
    // Determines how the tongue moves each frame
    state: "idle", // State can be: idle, outbound, inbound
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
  lotus1 = loadImage("assets/images/lotus1.png");
  lotus1shadow = loadImage("assets/images/lotus1shadow.png");
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

  // Give the fly its first random position
  resetFly();
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
  }
}

function drawMenu() {
  background("#06464a");
  image(lily1, 250, 175, 342, 161);
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
  text("Instructions", 40, 50);

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
  image(lily4, 410, 246 + sin(frameCount * 0.03) * 3, 410, 190);
  pop();

  //lotus
  push();
  image(lotus1, 46, 170 + sin(frameCount * 0.03) * 3, 65, 60);
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
  moveFly();
  drawFly();
  moveFrog();
  moveTongue();
  drawFrog();
  checkTongueFlyOverlap();
  drawScore();
}
/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
  // Move the fly
  fly.x += fly.speed;
  // Handle the fly going off the canvas
  if (fly.x > width) {
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
  fly.x = 0;
  fly.y = random(0, 300);
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
    // The tongue stops if it hits the bottom
    if (frog.tongue.y >= height) {
      frog.tongue.state = "idle";
    }
  }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
  // Draw the tongue tip
  push();
  fill("#ff0000");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Draw the rest of the tongue
  push();
  stroke("#ff0000");
  strokeWeight(frog.tongue.size);
  line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
  pop();

  // Draw the frog's body
  push();
  fill("#00ff00");
  noStroke();
  ellipse(frog.body.x, frog.body.y, frog.body.size);
  pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  // Get distance from tongue to fly
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  // Check if it's an overlap
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;
  if (eaten) {
    //adds score
    score++;
    // Reset the fly
    resetFly();
    // Bring back the tongue
    frog.tongue.state = "inbound";
  }
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
function mousePressed() {
  if (frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
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
}
