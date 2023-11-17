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
  //context.fillRect(0, 0, width, height);
  //monCercle.draw();
  /*anneau(20 * 360,400)
  anneau(10 * 360,300)
  anneauYeux(180,200)
  oeil();
  requestAnimationFrame(draw);*/

  piece3.draw(width/2,height/2);
  piece2.draw(width/2,height/2);
  piece1.draw(width/2,height/2);
  
  requestAnimationFrame(draw);
}


function setup() {
  console.log("setup");
  createCanvas(width, height);
  //monCercle = new Circle(400, 400, 100, context);
  piece3 = new Piece(0, 0,350,"#ff6390", false,context);
  piece2 = new Piece(0, 0,250,"#ff6390", false,context);
  piece1 = new Piece(0, 0,150,"#ff6390", true,context);
  document.addEventListener("click", mousePressed);

  piece3.rot = piece3.getRandomInt(35) * 10;
  piece2.rot = piece2.getRandomInt(35) * 10;
  piece1.rot = piece1.getRandomInt(35) * 10;

  draw();
}

function mousePressed(e) {
  console.log("mousePressed", e);
  //monCercle.changeColor();
  //monCercle.definirDestination(e.x, e.y);
  //monCercle.definirRayonAleatoire();
  //console.log(e.x, e.y);
  /*if(e.x < 150 && e.y < 150){
    piece1.isInMe(e.x, e.y);
  }
  if(e.x > 150 && e.x < 250 && e.y > 150 && e.y < 250){
    piece2.isInMe(e.x, e.y);
  }*/
  if(piece3.isInMe(e.x, e.y) == true){
    console.log("true");
    piece3.addRotation();
  }

  if(piece2.isInMe(e.x, e.y) == true){
    console.log("true");
    piece2.addRotation();
  }

  if(piece1.isInMe(e.x, e.y) == true){
    console.log("true");
    piece1.addRotation();
  }

  if(piece1.rot == piece2.rot && piece1.rot == piece3.rot){
    piece3.unlockCheck = true;
    piece2.unlockCheck = true;
    piece1.unlockCheck = true;
    piece3.changeColor();
    piece2.changeColor();
    piece1.changeColor();
  }
  else
  {
    piece3.unlockCheck = false;
    piece2.unlockCheck = false;
    piece1.unlockCheck = false;
    piece3.changeColor();
    piece2.changeColor();
    piece1.changeColor();
  }

}

window.onload = function () {
  console.log("on est pret");
  setup();
};
