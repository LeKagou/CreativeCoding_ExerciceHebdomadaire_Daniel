var a1;
var a2;
var centerX;
var centerY;
var width = window.innerWidth;
var height = window.innerHeight;
var context;

var piece;

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}

function draw() {
  // console.log("draw");
  context.fillStyle = "rgba(235,235,235)";
  //context.fillRect(0, 0, width, height);
  //monCercle.draw();
  /*anneau(20 * 360,400)
  anneau(10 * 360,300)
  anneauYeux(180,200)
  oeil();
  requestAnimationFrame(draw);*/

  piece.draw(350,90,width/2,height/2, false);
  piece.draw(250,90,width/2,height/2, false);
  piece.draw(150,90,width/2,height/2, true);
}


function setup() {
  console.log("setup");
  createCanvas(width, height);
  //monCercle = new Circle(400, 400, 100, context);
  piece = new Piece(0, 0,"#ff6390",context);
  document.addEventListener("click", mousePressed);
  draw();
}

function mousePressed(e) {
  console.log("mousePressed", e);
  //monCercle.changeColor();
  //monCercle.definirDestination(e.x, e.y);
  //monCercle.definirRayonAleatoire();
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
