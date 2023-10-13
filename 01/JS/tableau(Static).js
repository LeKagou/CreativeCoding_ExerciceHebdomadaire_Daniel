var context;

var intraBar = 1;

var barColors = ["rgb(52,105,111)","rgb(58,128,130)","rgb(86,126,126)","rgb(131,186,186)","rgb(181,201,206)","rgb(205,208,211)","rgb(209,206,177)","rgb(208,195,81)","rgb(199,143,50)","rgb(197,89,40)","rgb(180,60,33)"]
var row1Colors = ["rgb(199,143,50)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(180,201,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(52,105,111)"]
var row2Colors = ["rgb(180,60,33)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(172,162,182)","rgb(211,211,211)","rgb(211,211,211)","rgb(211,211,211)","rgb(58,128,130)"]

var frameWidth = 525;
var frameHeight = 350;

function rect(x, y, w, h) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fill();
  context.closePath();
}

function circle(x, y, rayon) {
  context.beginPath();
  //PosX,PosY,Point de déèart, 2*PI = 360°, sens horaire
  context.arc(x, y, rayon, 0, 2 * Math.PI,true);
  context.fill();
  context.closePath();
}

function demiCercle(x, y, rot, rayon) {
  context.beginPath();
  context.save();
  //PosX,PosY,Point de déèart, 2*PI = 360°, sens horaire
  context.scale(0.5,1.5);
  context.translate(x, y - y/3);
  context.rotate((rot * Math.PI) / 180);
  context.arc(0, 0, rayon, 0, 1 * Math.PI,true);
  context.fill();
  context.restore();
  context.closePath();
}

function triangle(x,y,size){
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x + size, y);
    context.lineTo(x + size, y + size);
    context.fill()
    context.closePath();
}

function createCanvas(w, h) {
  var canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  canvas.height = h;
  canvas.width = w;
  document.body.appendChild(canvas);
}

function setup() {
  console.log("Setup");
  createCanvas(window.innerWidth, window.innerHeight);

  draw();

  //Déplacement du tableau
  context.translate(window.innerWidth/2,window.innerHeight/2);
  //Tableau
  ouvre();

}

function ouvre(){

  //Point d'encrage au centre
  context.translate(-frameWidth/2,-frameHeight/2);

  //Fond
  context.fillStyle = "black";
  rect(0,0,frameWidth,frameHeight);

  //Lignes Verticales
  for(let i = 0; i < 11; i++)
  {
    context.fillStyle = barColors[i];;
    rect(25 * i * 2 ,0,25,350)
  }

  //Lines Horizontales 
  for(let i = 0; i < 10; i++)
  {
    context.fillStyle = row1Colors[i];
    rect(25 * i * 2 + 25,50,25,50)
    if(i < 2 || i > 7)
    {
      if(i == 0 || i == 9)
      {
        context.fillStyle = "rgb(211,211,211)";
      }
      if(i == 1)
      {
        context.fillStyle = "rgb(208,195,81)";
      }
      if(i == 8)
      {
        context.fillStyle = "rgb(86,126,126)";
      }
      rect(25 * i * 2 + 25,150,25,50)
    }
    context.fillStyle = row2Colors[i];
    rect(25 * i * 2 + 25,250,25,50)
  }

  //Demi cercles (Gauche)
  for(let i = 0; i < 3; i++)
  {
    context.fillStyle = "rgb(205,205,205)";
    demiCercle(250+ (i * 50 * 2),175, 90,50);
  }
  
  //Demi cercles (Droite)
  for(let i = 0; i < 3; i++)
  {
    context.fillStyle = "rgb(205,205,205)";
    demiCercle(600 + (i * 50 * 2),175, -90,50);
  }
}

function draw() {
  //console.log("draw");
  //requestAnimationFrame(draw);
}

window.onload = function () {
  setup();
};

;