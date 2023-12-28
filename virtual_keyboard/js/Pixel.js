export default class Pixel {
    constructor(x, y, rayon, chance) {
        this.x = x;
        this.y = y;
        this.origin = { x: x, y: y };
        this.target = { x: x, y: y };
        this.rayon = rayon;
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
        if(this.shape == 0)
        {
            context.translate(this.x, this.y);
        }
        else
        {
            context.translate(this.x - this.rayon, this.y - this.rayon);
        }
        //on fait la rotation
        context.rotate(this.rotation);
        //on dessine le cercle
        //context.fillStyle = this.color;
        context.beginPath();
        context.fillStyle = this.color;
        if(this.shape == 0)
        {
            context.arc(0, 0, this.rayon, 0, 2 * Math.PI, true);
        }
        else
        {
            context.rect(0, 0, this.rayon * 2, this.rayon * 2)
        }
        context.fill();
        context.closePath();
        context.restore();
    }

    randomIntFromInterval() { // min and max included 

        let r = Math.random()
        if(r > this.chance / 100)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }
}