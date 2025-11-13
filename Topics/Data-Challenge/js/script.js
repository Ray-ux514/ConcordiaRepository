/**
 * Terrible New Car
 * Pippin Barr
 *
 * A program to generate new car model names using dinosaurs.
 *
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
  carData = loadJSN(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/transportation/car_makers.json"
  );
  dinosaurData = loadJSON(
    "https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dinosaurs.json"
  );
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
 */
function draw() {
  background(0);

  push();
  fill("pink");
  textAlign(CENTER, CENTER);
  textSize(32);
  text(carName, width / 2, height / 2);
  pop();
}

/**
 * Generate a new car name
 */

function mousePressed() {
  let car = random(carData.car_makers);
  let dino = random(dinosaurData.dinosaurs);
}
