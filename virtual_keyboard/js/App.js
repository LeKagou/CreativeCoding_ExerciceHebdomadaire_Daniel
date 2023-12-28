import Camera from "./Camera.js";
import HandDetector from "./HandDetector.js";
import Raster from "./Raster.js";

export default class App {
  constructor() {
    console.log("App.js");

    this.cam = new Camera();

    //Create canvas
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.Raster = new Raster(this.canvas,this.ctx,this.cam);

    this.handDetector = new HandDetector(this.cam.video,this.canvas,this.ctx,this.Raster);
    this.handDetector.addEventListener(
      "ready",
      this.onHandDetectorReady.bind(this)
    );
  }

  onHandDetectorReady(e) {
    //this.grid = new Grid(this.handDetector.ctx);
    this.draw();
  }

  draw() {
    this.handDetector.detect();
    this.Raster.draw();
    //this.grid.draw(this.handDetector.finger);
    requestAnimationFrame(this.draw.bind(this));
  }
}
