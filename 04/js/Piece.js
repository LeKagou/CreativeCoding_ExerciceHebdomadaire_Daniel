class Piece {
  constructor(x, y, color, context) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(r, rot, vw, vh, main) {
    //Placement
    this.context.save();
    rot = rot * (Math.PI / 180);
    this.context.translate(vw, vh);
    this.context.rotate(rot);
    //Dessiner les formes + attribuer la couleur
    this.context.fillStyle = this.color;
    this.createCircle(0, 0, r);
    this.context.fillStyle = "rgba(0,0,0)";
    this.createRect(100, r * 2 - 20);
    //Dessiner les yeux
    this.oeil(60, main);
    this.context.restore();
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
