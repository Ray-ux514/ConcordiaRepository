/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 *
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
  x: 300,
  y: 20,
  width: 10,
  height: 10,
  velocity: {
    x: 0,
    y: 10,
  },
};

const ball2 = {
  x: 240,
  y: 20,
  width: 10,
  height: 10,
  velocity: {
    x: 2,
    y: 8,
  },
};
// Our paddle
const paddle = {
  x: 300,
  y: 280,
  width: 180,
  height: 10,
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(600, 300);
}

/**
 * Move and display the ball and paddle
 */
function draw() {
  background("#87ceeb");

  movePaddle(paddle);
  moveBall(ball);
  moveBall2(ball2);

  handleBounce(ball, paddle);
  handleBounce(ball2, paddle);

  drawPaddle(paddle);
  drawBall(ball);
  drawBall2(ball2);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {}

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
  push();
  rectMode(CENTER);
  noStroke();
  fill("pink");
  rect(paddle.x, paddle.y, paddle.width, paddle.height);
  pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {
  push();
  rectMode(CENTER);
  noStroke();
  fill("pink");
  rect(ball.x, ball.y, ball.width, ball.height);
  pop();
}
function drawBall2(ball2) {
  push();
  rectMode(CENTER);
  noStroke();
  fill("black");
  rect(ball2.x, ball2.y, ball2.width, ball2.height);
  pop();
}

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
  return (
    rectA.x + rectA.width / 2 > rectB.x - rectB.width / 2 &&
    rectA.x - rectA.width / 2 < rectB.x + rectB.width / 2 &&
    rectA.y + rectA.height / 2 > rectB.y - rectB.height / 2 &&
    rectA.y - rectA.height / 2 < rectB.y + rectB.height / 2
  );
}

function movePaddle() {
  paddle.x = mouseX;
}

function moveBall() {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

function handleBounce(ball, paddle) {
  if (checkOverlap(ball, paddle)) ball.velocity.y *= -1;
}
function handleBounce(ball, rectB) {
  if (checkOverlap(ball, rectB)) ball.velocity.y *= -1;
}
function moveBall2() {
  ball2.x += ball2.velocity.x;
  ball2.y += ball2.velocity.y;
}

function handleBounce2(ball2, paddle) {
  if (checkOverlap(ball2, paddle)) ball2.velocity.y *= -1;
}
