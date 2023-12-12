// la définition de la classe Circle c'est comme définir une function mais sans les parenthèses
// la fonction par défaul est le constructor
// on peut passer des paramètres au constructor
// dans une class on n'écrit pas "function" pour TOUTES les fonctions
// une variable globale de class s'écrit avec "this."
class Circle {
  constructor(x, y, rayon, context) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.target = { x: x, y: y };

    this.speed = 1;
    this.uniteDeTemps = 0;
    this.uniteDeTemps1 = 0;

    this.rayon = rayon;
    this.rayonOrigin = { rayon: rayon };
    this.rayonFinal = { rayon: rayon };

    this.context = context;
    // on initialise une couleur au bol
    this.color = "white";
    this.rotation = 0;
    this.angle = 0;

    this.shapeStyle = 0;
    this.tailleM = 1;
    this.isStatic = false;
  }

  changeColor(r, g, b) {

    if(r >= 252 && g >= 252 && b >= 252){
      if(this.isStatic == false){
        this.isStatic = true;
        console.log(this.isStatic);
      }
    }

    if(this.isStatic == false){
      if(r > 50)
      {
        r = r - r / 3;
        g = g - r / 3;
        b = b - r / 3;
        this.tailleM = 5;
      }
      else{
        r = 0;
        g = 0;
        b = 0;
        this.tailleM = 1;
      }
  
      if(g > 50)
      {
        r = r - g / 3;
        g = g - g / 3;
        b = b - g / 3;
        this.tailleM = 1;
      }
      else{
        r = 0;
        g = 0;
        b = 0;
        this.tailleM = -10;
      }
  
      if(b > 50)
      {
        r = r - b / 3;
        g = g - b / 3;
        b = b - b / 3;
        this.tailleM = 10;
      } 
      else{
        r = 0;
        g = 0;
        b = 0;
        this.tailleM = 1;
      }
  
      if(((r + g + b) / 3) >= 135){
        this.shapeStyle = 1;
      }
      else
      {
        this.shapeStyle = 0;
      }
      
      // on affect une couleur aléatoire
      this.color = `rgb(${r},${g},${b
      })`;
    }
    else if(this.isStatic == true)
    {
      this.color = "rgb(255,255,255)";
    }



    // this.color = `rgb(${r},${g},${b})`;

    //on change la taille du rayon
    // this.rayon = Math.random() * 100;
  }

  changeRadius(pourcentage) {
    this.rayon = this.rayonOrigin.rayon * pourcentage;
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x, this.y);
    // on compare cette distance au rayon
    if (d < this.rayon) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    //this.move();
    //pour préparer la rotation
    this.context.save();
    //on translate le contexte au centre du cercle
    this.context.translate(this.x, this.y);
    //on fait la rotation
    this.context.rotate(this.rotation);
    //on dessine le cercle
    this.context.fillStyle = this.color;
    this.context.beginPath();
    //this.context.roundRect(0,0,this.rayon * 1.5,this.rayon /1.5,3);
    //this.context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
    if(this.shapeStyle == 0)
    {
      this.context.rect(0, 0, this.rayon * this.tailleM, this.rayon * this.tailleM);
    }
    else if(this.shapeStyle == 1)
    {
      this.context.roundRect(0,0,this.rayon * 2 * this.tailleM,this.rayon * this.tailleM,10);
    }

    this.context.fill();
    this.context.closePath();

    this.context.restore();

    // this.move();
    // this.rapetisser();
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }

  definirDestination(x, y) {
    this.target = { x: x, y: y };
    this.uniteDeTemps = 0;
  }

  definirRayonAleatoire() {
    this.rayonFinal.rayon = Math.random() * 200 + 50;
    this.uniteDeTemps1 = 0;
  }

  move() {
    // //calcul la distance entre le point de départ et la destination
    // const d = this.dist(this.x, this.y, this.target.x, this.target.y);
    // if (d < 0.01) {
    //   this.origin = { x: this.target.x, y: this.target.y };
    //   return;
    // }
    // //calcul de easing simple
    // // equivalent à un pourcentage
    // const easing = Easing.bounceOut(this.uniteDeTemps); //Math.pow(this.uniteDeTemps, 5); //this.uniteDeTemps * this.speed;
    // //on incrémente le compteur de temps
    // this.uniteDeTemps += 0.01;
    // //on la distance entre le point de départ et la destination
    // let distX = this.target.x - this.origin.x;
    // let distY = this.target.y - this.origin.y;
    // this.x = this.origin.x + distX * easing;
    // this.y = this.origin.y + distY * easing;
    // console.log(Math.cos(this.angle * (Math.PI / 180)) * 100);
    this.angle++;
    this.x = this.origin.x + Math.cos(this.angle * (Math.PI / 180)) * 100;
    this.y = this.origin.y + Math.sin(this.angle * (Math.PI / 180)) * 100;
    // console.log(this.angle);
  }

  rapetisser() {
    let differenceRayon2 = this.rayonFinal.rayon - this.rayon;
    // console.log(differenceRayon2);
    if (Math.abs(differenceRayon2) < 0.01) {
      this.rayonOrigin = { rayon: this.rayonFinal.rayon };
      return;
    }

    const easing = Easing.elasticOut(this.uniteDeTemps1);
    this.uniteDeTemps1 += 0.01;
    let differenceRayon = this.rayonFinal.rayon - this.rayonOrigin.rayon;
    this.rayon = this.rayonOrigin.rayon + differenceRayon * easing;
  }
}
