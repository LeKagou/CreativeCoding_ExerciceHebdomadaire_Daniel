class rect{
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.colorBack = "black";
        this.colorTriangle = "white";

        this.trigger = 0
        this.r = 0
    }

      changeColor() {
        if(this.trigger == 0)
        {
            this.colorBack = "white"
            this.colorTriangle = "Black";
            this.trigger = 1
            this.r = this.getRandomInt(this.w);
        }
        else
        {
            this.colorBack = "black";
            this.colorTriangle = "white";
            this.trigger = 0
            this.r = this.getRandomInt(this.w);
        }
      }

      isInMe(mouseX, mouseY) {
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h)
        {
            return true;
        }
        else{
            return false;
        }
      }

      draw(context) {


        context.save();

        context.translate(this.x, this.y);

        //Carré
        context.fillStyle = this.colorBack
        context.beginPath();
        context.rect(0, 0, this.w, this.h);
        context.fill();
        context.closePath();

        context.save();
        context.beginPath();
        context.fillStyle = this.colorTriangle
        context.moveTo(0, (this.h) + 0);
        context.lineTo((this.h) + 0, this.r);
        context.lineTo((this.h) + 0, (this.h) + 0);
        context.lineTo(0, (this.h) + 0);
        context.fill()
        context.closePath()
        context.restore();

        context.restore();

      }

      triangle(ctx, x, scale){
        ctx.beginPath();

        ctx.closePath();
    }

      dist(x1, y1, x2, y2) {
        let d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        return d;
      }

      getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
}