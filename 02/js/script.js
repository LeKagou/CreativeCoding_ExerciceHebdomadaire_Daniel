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
  var r = centerX + Math.cos(5 * (Math.PI / 180)) * bigRadius;
  context.strokeStyle = `hsl(50%, 50%,50%)`;
  context.fill();
  context.stroke();
  context.closePath();
}

function rect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.strokeStyle = "hsl(50%, 50%,50%)";
  context.fillStyle = "rgb(0,0,255)"
  context.fill();
  context.closePath();
}

function triangle(x,y,size){
  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + size, y);
  context.lineTo(x + size, y + size);
  context.strokeStyle = "hsl(50%, 50%,50%)";
  context.fillStyle = "rgb(0,255,0)"
  context.fill()
  context.closePath();
}

function setup() {
  console.log("setup");
  createCanvas(width, height);
  color = 0;
  a1 = 0;
  a2 = 0;
  rayon = 500;
  bigRadius = 800;
  smallRadius = 450;
  centerX = width / 2;
  centerY = height / 2;

  // document.addEventListener("click", mousePressed);
  setInterval(timing,1000);
  draw();
}

var r = Math.abs(100 * Math.cos(a1 * (Math.PI / 180)));
var compteur = 0;

function draw() {
  //   console.log("draw");
  //context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(0,0,0)";
  //context.fillRect(0, 0, width, height);
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

  if(compteur == 0)
  {
    compteur = 1;
  }
  /*else if(compteur == 1)
  {
    rect(posx,posy,r,r)
    compteur = 2;
  }
  else if(compteur == 2){
    triangle(posx,posy,r);
        compteur = 0;
  }*/

  context.fillStyle = colorC
  circle(posx, posy, r);


  requestAnimationFrame(draw);
}

var colorC = `rgb(0,0,255)`


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var rndInt = randomIntFromInterval(1, 6)
var rndInt2 = randomIntFromInterval(1, 6)
var rInt2 = randomIntFromInterval(1, 6)

function timing(){
  rndInt = randomIntFromInterval(-6, 6)
  rndInt2 = randomIntFromInterval(1,6)
  rInt2 = randomIntFromInterval(1, 50)
  colorC = `rgb(${randomIntFromInterval(0,255)},${randomIntFromInterval(0,255)},${randomIntFromInterval(0,255)})`
  r = rInt2;
}

function mousePressed(e) {
  console.log("mousePressed");
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
