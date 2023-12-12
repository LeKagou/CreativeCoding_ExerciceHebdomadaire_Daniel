class App {
  constructor() {
    this.setup();
  }

  setup() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.circle = new Circle(100, 100, 10, this.ctx);
    this.allCircles = [];
    this.CirclesPos = [];
    for (let e = 0; e < 1024; e++)
    {
      //this.allCircles.push(
        //
        //A CHOIX : utiliser un cercle ou un texte
        //
      //new Circle(e * 2, window.innerHeight / 2, 1, this.ctx)
        //new Text(i * 2, window.innerHeight / 2, this.ctx)
      //);
      this.CirclesPos.push(
        {
          x: e * 2,
          y: window.innerHeight / 2,}
      );
    }
    console.log()
    for (let i = 0; i < 1024; i++) {
    }

    this.audioTool = new AudioTool();

    document.addEventListener("click", (e) => {
      this.audioTool.play(e);
    });

    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.allCircles.forEach((circle) => {
      circle.draw();
    });

    /**
     *  A CHOIX : analyser un des 3 types de data
     */
    // this.audioTool.updateWaveForm();
    // this.audioTool.updateFrequency();
    this.audioTool.updatedFloatFrequency();

    /**
     *  A CHOIX : récupérer un des 3 types de tableau
     */
    // const data = this.audioTool.dataWave;
    // const data = this.audioTool.dataFrequency;
    //var frequence = this.audioTool.biquadFilter.frequency.value
    console.log(this.audioTool.frequence);
    const data = this.audioTool.dataFloatFrequency;
    if (this.audioTool.audioContext && this.audioTool.isPlaying) {
      for (let i = 0; i < data.length - 20; i+=1) {
        /**
         * A CHOIX : modifier la position ou autre parametre
         */
        //this.allCircles[i].y = data[i] + window.innerHeight / 2 - 125;
        this.ctx.stroke();
        this.CirclesPos[i].y = (data[i] * 4) + window.innerHeight;
        this.ctx.beginPath();
        this.ctx.moveTo(this.CirclesPos[i].x, this.CirclesPos[i].y) ;
        let r = Math.random(1) * 100;
        this.ctx.lineTo(this.CirclesPos[i + 20].x, this.CirclesPos[i + 20].y);
        //this.allCircles[i].y = -data[i] + window.innerHeight / 2;
        // console.log(Math.abs(data[i] / 10));
        // this.allCircles[i].fontSize = -data[i] / 5;
        if(i > this.audioTool.frequence)
        {
          this.ctx.strokeStyle = `rgb(255,0,0,0.1)`;
        }else{
          this.ctx.strokeStyle = `rgba(0,0,0,0.5)`;
        }
      }
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  const app = new App();
  //   console.log(app);
};
