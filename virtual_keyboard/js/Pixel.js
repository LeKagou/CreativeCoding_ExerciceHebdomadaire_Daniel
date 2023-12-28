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
    context.fillStyle = this.color;
    if (this.shape == 0) {
      context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
    } else {
      context.rect(0, 0, this.rayon * 2, this.rayon * 2);
    }
    context.fill();
    context.closePath();
    context.restore();
  }

  changeColor(r, g, b) {

      if (r > 35) {
        r = r - r / 2;
        g = g - r / 2;
        b = b - r / 2;
        this.rayon = 5;
      } else {
        r = 0;
        g = 0;
        b = 0;
        this.rayon = 1;
      }

      if (g > 35) {
        r = r - g / 2;
        g = g - g / 2;
        b = b - g / 2;
        this.rayon = 1;
      } else {
        r = 0;
        g = 0;
        b = 0;
        this.rayon = 20;
      }

      if (b > 35) {
        r = r - b / 4;
        g = g - b / 4;
        b = b - b / 4;
        this.rayon = 10;
      } else {
        r = 0;
        g = 0;
        b = 0;
        this.rayon = 1;
      }
      this.color = `rgb(${r},${g},${b})`;
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
