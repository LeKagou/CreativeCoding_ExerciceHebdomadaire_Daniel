export default class Pixel {
  constructor(x, y, rayon, chance, FilterID) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.target = { x: x, y: y };
    this.rayon = rayon;
    this.rayonOrigin = { rayon: rayon };

    // on initialise une couleur au bol
    this.color = "red";
    this.rotation = 0;

    this.chance = chance;
    this.shape = this.randomIntFromInterval();

    this.Fix = false;
  }

  draw(context) {
    //pour préparer la rotation
    context.save();
    //on translate le contexte au centre du cercle
    if (this.shape == 0) {
      context.translate(this.x, this.y);
    } else {
      context.translate(this.x - this.rayon, this.y - this.rayon);
    }
    //on fait la rotation
    context.rotate(this.rotation);
    //on dessine le cercle
    //context.fillStyle = this.color;
    context.beginPath();
    if(this.Fix){
      context.fillStyle = "white";
      console.log("white");
    }
    else
    {
      context.fillStyle = this.color;
    }
    if (this.shape == 0) {
      context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
    } else {
      context.rect(0, 0, this.rayon * 2, this.rayon * 2);
    }
    context.fill();
    context.closePath();
    context.restore();
  }

  checkAndFix(fx,fy){
      let distance = this.distance(fx * window.innerWidth,fy * window.innerHeight,this.x,this.y);
      if(distance < 20)
      {
        this.Fix = true;
        this.color = `rgb(${255},${255},${255})`;
      }
  }

  distance(x1, y1, x2, y2) 
  {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
  }

  changeColor(r, g, b) {

    if(!this.Fix){
      this.color = `rgb(${r},${g},${b})`;
    }
    else{
      this.color = "white";
    }
  }

  randomIntFromInterval() {
    // min and max included

    let r = Math.random();
    if (r > this.chance / 100) {
      return 0;
    } else {
      return 1;
    }
  }

  changeRadius(pourcentage) {
    this.rayon = this.rayonOrigin.rayon * pourcentage;
  }
}
