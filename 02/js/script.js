var a1;
var a2;
var centerX;
var centerY;
var width = window.innerWidth;
var height = window.innerHeight;
var context;
var rayon;
var color;
var bigRadius;
var smallRadius;

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
}

function circle(x, y, rayon) {
  context.beginPath();
  context.arc(x, y, rayon, 0, 2 * Math.PI, true);
  context.strokeStyle = "hsl(50%, 50%,50%)";
  context.stroke();
  context.closePath();
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  color = 0;
  a1 = 0;
  a2 = 0;
  rayon = 500;
  bigRadius = 500;
  smallRadius = 500;
  centerX = width / 2;
  centerY = height / 2;

  // document.addEventListener("click", mousePressed);
  setInterval(timing,1000);
  draw();
}

let invertor = 1;

function draw() {
  //   console.log("draw");
  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255,255,255)";
  context.fillRect(0, 0, width, height);
  //

  //Si 360 alors on revient à 0 la forme se répète
  //Joue avec la vitesse du déplacement
  a1 += rndInt;
  a2 += rndInt2;

  color += 1;
  //Mouvement Horizotale
  var posx = centerX + Math.cos(a1 * (Math.PI / 180)) * bigRadius;
  //Mouvement Vericale
  var posy = centerY + Math.sin(a2 * (Math.PI / 180)) * smallRadius;
  //Radius du cercle
  var r = Math.abs(100 * Math.cos(a1 * (Math.PI / 180)));

  circle(posx, posy, 10);

  requestAnimationFrame(draw);
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var rndInt = randomIntFromInterval(1, 6)
var rndInt2 = randomIntFromInterval(1, 6)

function timing(){
  rndInt = randomIntFromInterval(1, 6)
  rndInt2 = randomIntFromInterval(1,6)
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
