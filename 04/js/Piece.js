class Piece {
  constructor(x, y, r, color,main, context) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.ActualR = 0;
    this.r = r;
    this.main = main;
    this.unlockCheck = false;

    this.randomAxe = 20;
    this.rot;

    //Animation
    this.timing = 0;
    this.timing2 = 1;
    this.savedRot = this.rot;

    this.red = 255;
    this.green = 99;
    this.blue = 144;

  }

  draw(vw, vh) {
    //Placement
    this.context.save();
    let rotConverted = this.rot * (Math.PI / 180);
    this.context.translate(vw, vh);
    this.context.rotate(rotConverted);
    //Dessiner les formes + attribuer la couleur
    this.context.fillStyle = this.color;
    this.createCircle(0, 0, this.r);
    this.context.fillStyle = "rgba(0,0,0)";
    this.createRect(100, this.r * 2 - 20);
    //Dessiner les yeux
    this.oeil(60, this.main);
    this.context.restore();
    this.ActualR = this.r;

    this.animateRotation();
    this.changeColorAnimated();

  }

  addRotation(){
    this.timing = 0;
    this.savedRot += 20;
    console.log(this.rot);
  }

  animateRotation(){
    if(this.rot >= this.savedRot)
    {
      return;
    }
    const easing = Easing.circInOut(this.timing);
    this.timing += 0.01;

    this.rot = this.rot + 20 * easing;
  }

  getRandomInt(max) {
    this.rot = 0;
    let r = Math.floor(Math.random() * max);
    if(r >= 180)
    {
      r -= 180;
    }
    this.savedRot = r;
    return r
  }

  changeColor(){

    if(this.rot + 20 >= this.randomAxe -1 && this.rot + 20 <= this.randomAxe + 1)
    {
      this.unlockCheck = true;
      this.timing2 = 0;
      console.log(this.unlockCheck);
      console.log("Passe");
    }
    else
    {
      if(this.unlockCheck == true)
      {
        this.timing2 = 0;
        console.log("Zero");
      }
      this.unlockCheck = false;
      console.log("PassePAS");
    }

    /*if(this.unlockCheck == true)
    {
      this.color = "#62e379";
    }
    else
    {
      this.color = "#ff6390";
    }*/
  }

  changeColorAnimated(){
    const easing = Easing.cubicIn(this.timing2);

    //Rouge 255,99,144 Vert 98,227,121
    let diffRed = this.red - 98;
    let diffGreen = 227 - this.green;
    let diffBlue = this.blue - 121;

    //console.log(this.unlockCheck);
    
    if(this.timing2 >= 1)
    {
      //console.log("return");
      return;
    }
    this.timing2 += 0.07;
    if(this.unlockCheck == true)
    {
      this.color = `rgba(${this.red - diffRed * easing},${this.green + diffGreen * easing},${this.blue - diffBlue * easing})`;
    }
    else
    {
      this.color = `rgba(${98 + diffRed * easing},${227 - diffGreen * easing},${121 + diffBlue * easing})`;
    }
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x + window.innerWidth / 2, this.y + window.innerHeight / 2);
    // on compare cette distance au rayon
    if(!this.main){
      if (d < this.r && d >= this.r - 100) {
        return true;
      } else {
        return false;
      }
    }else{
      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
  }

  dist(x1, y1, x2, y2) {
    // calcule la distance entre deux points
    // pythagore power
    let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return d;
  }



  //#region Formes Principales
  createCircle(x, y, r) {
    //Save
    this.context.save();
    //Translate
    this.context.translate(this.x, this.y);
    //Construction
    this.context.beginPath();
    this.context.arc(x, y, r, 0, 2 * Math.PI, true);
    this.context.fill();
    this.context.lineWidth = 4;
    this.context.strokeStyle = "black";
    this.context.stroke();
    this.context.closePath();
    //Restore
    this.context.restore();
  }

  createRect(w, v) {
    //Save
    this.context.save();
    //Translate
    this.context.translate(this.x - w / 2, this.y - v / 2);
    //Construction
    this.context.beginPath();
    this.context.roundRect(0, 0, w, v, 200);
    this.context.fill();
    this.context.closePath();
    //Restore
    this.context.restore();
  }
  //#endregion

  //#region Formes Secondaires
  oeil(x, main) {
    if (main == true) {
      //Save
      this.context.save();
      //Construction
      this.context.fill();
      this.context.fillStyle = "white";
      this.createCircle(0, x, 40);
      this.context.fillStyle = "black";
      this.createCircle(0, x, 10);
      //Restore
      this.context.restore();
      //
      //Save
      this.context.save();
      //Construction
      this.context.fill();
      this.context.fillStyle = "white";
      this.createCircle(0, -x, 40);
      this.context.fillStyle = "black";
      this.createCircle(0, -x, 10);
      //Restore
      this.context.restore();
    }
  }
  //#endregion
}
