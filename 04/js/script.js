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
  console.log("draw");
  context.fillStyle = "rgba(235,235,235)";
  piece3.draw(width/2,height/2);
  piece2.draw(width/2,height/2);
  piece1.draw(width/2,height/2);
  
  requestAnimationFrame(draw);
}


function setup() {
  console.log("setup");
  createCanvas(width, height);
  piece3 = new Piece(0, 0,350,"#ff6390", false,context);
  piece2 = new Piece(0, 0,250,"#ff6390", false,context);
  piece1 = new Piece(0, 0,150,"#ff6390", true,context);
  document.addEventListener("click", mousePressed);

  draw();
}

function mousePressed(e) {
  console.log("mousePressed", e);

  if(piece3.isInMe(e.x, e.y) == true){
    piece3.addRotation();
    piece3.changeColor();
  }

  if(piece2.isInMe(e.x, e.y) == true){
    piece2.addRotation();
    piece2.changeColor();
  }

  if(piece1.isInMe(e.x, e.y) == true){
    piece1.addRotation();
    piece1.changeColor();
  }
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
