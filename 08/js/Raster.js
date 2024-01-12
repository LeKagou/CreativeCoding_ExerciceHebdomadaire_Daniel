import Pixel from "./Pixel";

export default class Raster{

    constructor(canvas, ctx, camera){
        this.cam = camera;
        console.log("Raster.js");
        this.canvas = canvas;
        this.context = ctx;
        this.video = this.cam.video;
        this.grille = [];

        this.definitionGrille = 6;
        this.createGrid(0);

        this.FilterID = 0;
    }

    checkPixelsPos(fx,fy){
      this.grille.forEach((Pixel) => {
        Pixel.checkAndFix(fx,fy);
        // le mouvment de chaque cercle est géré dans la fonction draw de la class Circle
    });
    }

    createGrid(chance){
        console.log("CreateGrid");
        //this.video.
        for (let j = 0; j < window.innerHeight; j += this.definitionGrille * 2 + 1) {
            for (let i = 0; i < window.innerWidth; i += this.definitionGrille * 2 + 1) {
                //let circle = new Circle(i, j, 10, context);
                let P = new Pixel(i, j, this.definitionGrille, chance);
                // on affecte un angle incrémenteal à chaque cercle
                P.angle = i * 0;
                // on stock le cercle dans le tableau
                this.grille.push(P);
            }
        }

        this.draw();
    }

    draw(){
       this.detectPixels(); 
       this.context.fillStyle = "black";
       this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
       this.grille.forEach((Pixel) => {
            Pixel.draw(this.context);
            // le mouvment de chaque cercle est géré dans la fonction draw de la class Circle
        });
    }

    detectPixels() {
        // on prépare une variable pour stocker les pixels
        let pixels = null;
        // on dessine l'image dans le contexte
        // attention si on veut l'image static, il faut remplacer video par image
        this.context.drawImage(this.video, 0, 0);
        // on récupère les pixels de l'image
        pixels = this.context.getImageData(0, 0, window.innerWidth, window.innerHeight);
      
        // on parcours tous les cercles
        this.grille.forEach((Pixel) => {
          //récupérer la couleur du pixel par l'index
          let index = (Pixel.origin.y * window.innerWidth + Pixel.origin.x) * 4;
          // on récupère les valeurs de rouge, vert et bleu

          let r = 0;
          let g = 0;
          let b = 0;

          if(Pixel.Fix == false)
          {
            r = pixels.data[index];
            g = pixels.data[index + 1];
            b = pixels.data[index + 2];
          }
          else
          {
            r = 255;
            g = 255;
            b = 255;
          }
      
          // on calcule l'intensité de la couleur
          let intensity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // on change le rayon du cercle en fonction de l'intensité (pourcentage de 0 à 1)
          Pixel.color = `rgb(${r},${g},${b})`;
          //Pixel.changeRadius(intensity / 255);
        });
      }
      
}