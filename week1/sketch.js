// Worley Noise
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/004-worley-noise.html
// https://youtu.be/4066MndcyCk
// p5 port: https://editor.p5js.org/codingtrain/sketches/QsiCWVczZ

let points = [];
let worl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  worl = createGraphics(100, 100);
  pixelDensity(1);
  initPoints();
}

function draw() {
  updateWorl();
}

function initPoints() {
  for (let i = 0; i < 20; i++) {
    points[i] = createVector(random(width), random(height), random(width));
  }
}

function updateWorl() {
  worl.loadPixels();
  let w = worl.width;
  let h = worl.height;
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {

       let distances = [];
      for (let i = 0; i < points.length; i++) {
        let v = points[i];
        let z = frameCount % w;
        let d = dist(x, y, z, v.x, v.y, v.z);
        distances[i] = d;
      }
      let sorted = sort(distances);
      let r = map(sorted[0], 0, 150, 0, 255);
      let g = map(sorted[1], 0, 50, 255, 0);
      let b = map(sorted[2], 0, 200, 255, 0);
      let index = (x + y * w) * 4;
      worl.pixels[index + 0] = r;
      worl.pixels[index + 1] = g;
      worl.pixels[index + 2] = b;
      worl.pixels[index + 3] = 255;
    }
  }
  worl.updatePixels();
}