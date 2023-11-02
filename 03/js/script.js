var width = 800;
var height = 800;
var context;
var lineX = 5;
var colY = 5;
var circles = [];

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
}


function draw() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < circles.length; i++) {
    var rectangle = circles[i];
    rectangle.draw(context);
  }
  requestAnimationFrame(draw);
}

function setup() {
  console.log("setup");
  createCanvas(window.innerWidth, window.innerHeight);

  document.addEventListener("click", mousePressed);

  //context.translate(window.innerWidth/2 ,window.innerHeight / 2);
  initCercles()

  draw();
}

function initCercles(){
  //context.translate(-width / lineX - width / lineX *1.5,-height / colY - height / colY * 1.5);
    // INITIALISATION DES CERCLES
    for (let j = 0; j < lineX; j++) {
      for (let i = 0; i < colY; i++) {
        var gridX = width / lineX;
        var gridY = height / colY;
        var r = gridX;
        var rectangle = new rect(i * gridX, j * gridY, r, r);
        circles.push(rectangle);
      }
    }
}

function mousePressed(informations) {
  console.log("mousePressed");
  console.log("x: ", informations.x, "y: ", informations.y);

   //il faut utiliser la fonction isInMe() dans CHAQUE circle
  for (let i = 0; i < circles.length; i++) {
    var rectangle = circles[i];
    var bool = rectangle.isInMe(informations.x, informations.y);
    console.log(i, bool);
    if (bool == true) {
      rectangle.changeColor();
    }
  }
}

window.onload = function () {
  console.log("on est pret");
  setup();
};
