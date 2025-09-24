/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 300,
  y: 300,
  size: 100,
  fill: "#ff0000",
  fills: {
    noOverlap: "#FFC0CB", // red for no overlap
    overlap: "#00ff00", // green for overlap
  },
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000",
};

const target = {
  x: 500,
  y: 500,
  size: 25,
  fill: "#FFC0CB",
};
/**
 * Create the canvas
 */
function setup() {
  createCanvas(600, 600);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");

  // Move user circle
  moveUser();

  // Draw the user and puck
  drawUser();
  drawPuck();

  //Move puck//
  movePuck();

  //target//
  drawTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}
function movePuck() {
  const d = dist(user.x, user.y, puck.x, puck.y);
  const overlap = d < user.size / 2 + puck.size / 2;
  // Set fill based on whether they overlap
  if (overlap) {
    puck.fill = puck.fills.overlap;
  } else {
    puck.fill = puck.fills.noOverlap;
  }
}

function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}
/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}
