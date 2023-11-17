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
    this.rot;
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
  }

  addRotation(){
    this.rot += 10;
    if(this.rot>=360)
    {
      this.rot = 0;
    }
    console.log(this.rot);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  changeColor(){
    if(this.unlockCheck == true)
    {
      this.color = "#62e379";
    }
    else
    {
      this.color = "#ff6390";
    }
  }

  isInMe(mouseX, mouseY) {
    // on calcule la distance entre la souris et le centre
    let d = this.dist(mouseX, mouseY, this.x + window.innerWidth / 2, this.y + window.innerHeight / 2);
    console.log(d);
    console.log(this.x + window.innerWidth / 2,this.y + window.innerHeight / 2);
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
