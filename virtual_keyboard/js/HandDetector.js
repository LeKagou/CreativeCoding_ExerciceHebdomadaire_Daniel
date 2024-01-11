import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import EventEmitter from "@onemorestudio/eventemitterjs";

export default class HandDetector extends EventEmitter {
  constructor(videoElement, canvas, ctx,Raster) {

    super();

    this.videoElement = videoElement;
    console.log("HandDetector.js");

    this.finger = { x: null, y: null };
    this.finger2 = { x: null, y: null };

    this.createHandLandmarker();

    this.timingId;
    this.requestTimer;

    this.timerActiv = false;

    this.ctx = ctx;
    this.canvas = canvas;
    this.Raster = Raster;

    this.waiting = false;
    this.previousPos = 0;
    this.passages = "";

    this.gesture = false;
    this.gestureAnulaires = false;
    this.gestureHand = true;

    this.filtre = 0;
    this.chance = 0;

    this.mains;
    this.drawing = false;

  }

  async createHandLandmarker() {
    const vision = await FilesetResolver.forVisionTasks("./tasks/wasm");

    this._handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `./tasks/hand_landmarker.task`,
        delegate: "GPU",
      },
      runningMode: "VIDEO", // this.runningMode,
      numHands: 2,
      minHandDetectionConfidence: 0.8,
      minHandPresenceConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });

    // this.detect();
    this.emit("ready", []);
  }

  detect() {
    let startTimeMs = performance.now();
    const results = this._handLandmarker.detectForVideo(
      this.videoElement,
      startTimeMs
    );
    //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (results.landmarks.length > 0) {
      //   console.log(results.landmarks);
      if(this.gesture == false && this.gestureAnulaires == false)
      {
        results.landmarks.forEach((pointsDeLaMain) => {
          drawLandmarks(this.ctx, pointsDeLaMain, { color: "grey", radius: 10 });
        });
      }

      // je peux stocker les coordonnées du bout du doigt

      this.finger = results.landmarks[0][4];
      this.finger2 = results.landmarks[0][8];
      if(this.gesture == false && this.gestureAnulaires == false)
      {
        this.mains = 1;
        drawLandmarks(this.ctx, [this.finger], { color: "red", radius: 10 });
        drawLandmarks(this.ctx, [this.finger2], { color: "red", radius: 10 });
      }
      if(results.landmarks.length > 1)
      {
        this.finger3 = results.landmarks[1][8];
        this.mains = 2;
        if(this.gesture == false && this.gestureAnulaires == false)
        {
          drawLandmarks(this.ctx, [this.finger3], { color: "red", radius: 10 });
        }
        this.detectionGestureAnnulaire();

      }
      else
      {
        this.gestureAnulaires = false;
        this.waiting = false;
        this.finger3 = null;
      }

      if(this.drawing == true)
      {
        this.startDrawing();
      }

      //console.log(this.finger.x + " " + this.finger.y);
      //console.log(this.finger2.x + " " + this.finger2.y);


      this.securiteMauvaiseDetectionGesture();
      
      if(this.gesture == true && this.gestureAnulaires == false || this.drawing == true && this.gestureAnulaires == false)
      {
        drawLandmarks(this.ctx, [this.finger], { color: "green", radius: 10 });
        drawLandmarks(this.ctx, [this.finger2], { color: "green", radius: 10 });
        //console.log(((this.finger.y - 1) * -1) * 100)

      }

      if(this.gestureAnulaires == true && this.gesture == false)
      {
        drawLandmarks(this.ctx, [this.finger2], { color: "green", radius: 10 });
        drawLandmarks(this.ctx, [this.finger3], { color: "green", radius: 10 });
      }

      console.log(this.mains)

      this.gestureHand = false;

    } else {
      this.finger = { x: null, y: null };
      /*if(this.gestureHand == false)
      {
        this.filtre++;
        if(this.filtre > 4)
        {
          this.filtre = 0;
          this.chance = 50;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.resetGrid();
        }
        this.Raster.FilterID = this.filtre;
        console.log(this.filtre)
        this.gestureHand = true;
      }*/
    }
  }

  resetGrid(){
    this.Raster.grille = [];
    this.Raster.createGrid(this.chance);
  }

  detectionGestureAnnulaire(){

    let distance = this.distance(this.finger2.x, this.finger2.y,this.finger3.x, this.finger3.y);

    if(this.gestureAnulaires != true && this.gesture != true)
    {
      if(distance <= 0.025)
      {
        drawLandmarks(this.ctx, [this.finger2], { color: "green", radius: 10 });
        drawLandmarks(this.ctx, [this.finger3], { color: "green", radius: 10 });
        this.gestureAnulaires = true;
      }
    }
    else if(this.gestureAnulaires == true){

      if(distance >= 0 && distance < 0.2)
      {
        //console.log("Filtre 1")
        //Definir Bool Raster
        this.Raster.definitionGrille = 5;
      }
      else if(distance >= 0.2 && distance < 0.4){
        //Console.log("Filtre 2")
        //Definir Bool Raster
      }
      else if(distance >= 0.4){
        //console.log("Filtre 3")
        //Definir Bool Raster
      }
      if(this.waiting != true)
      {
        this.waiting = true;
        setTimeout(() => {
          let differenciel = this.distance(this.finger2.x, this.finger2.y,this.finger3.x, this.finger3.y) - this.previousPos
          if(differenciel < 0)
          {
            differenciel *= -1;
          }
          if(this.distance(this.finger2.x, this.finger2.y,this.finger3.x, this.finger3.y) > 0.05)
          {
            this.Raster.definitionGrille = Math.floor((10 * this.distance(this.finger2.x, this.finger2.y,this.finger3.x, this.finger3.y)) * 6.4);
            console.log(this.Raster.definitionGrille)
            this.resetGrid()

            if(differenciel > 0.02){
              console.log("moving")
              this.passages = ""
            }
            else
            {
              console.log("static")
              if(this.passages == "static")
              {
                console.log("SET FILTER")
                //! mettre le filtre && arreter le mouvement
                this.GestuelleValeurReset();
              }
              else
              {
                this.passages = "static"
              }
            }
          }
          this.previousPos = distance;
          this.waiting = false;
        }, 200);
      }

    }
  }

  startDrawing(){
    console.log("StartDrawing")
    this.Raster.checkPixelsPos(this.finger.x,this.finger.y);
  }

  securiteMauvaiseDetectionGesture(){
    if(this.gestureAnulaires != true)
    {
      if(this.distance(this.finger.x, this.finger.y,this.finger2.x, this.finger2.y) <= 0.05)
      {
        //Proche
        if(this.mains == 2)
        {
          this.gesture = true;
          this.chance = ((this.finger.y - 1) * -1) * 100;
          this.resetGrid();
        }
        else if(this.mains == 1)
        {
          this.drawing = true;
        }

        if(this.timerActiv)
        {
          this.stopTimer();
        }
      }
      else if(this.distance(this.finger.x, this.finger.y,this.finger2.x, this.finger2.y) < 0.1)
      {
        //Loin
        if(this.timerActiv != true && this.gesture == true || this.timerActiv != true && this.drawing == true  )
        {
          this.startTimer(500);
        }
      }
      else if(this.distance(this.finger.x, this.finger.y,this.finger2.x, this.finger2.y) > 0.2){
        this.gesture = false;
        this.drawing = false;
      }
    }
  }

  //Timing OnOff gestuelle
  startTimer(temps){
      console.log("Start")
      this.timingId = 0;
      this.timerActiv = true;
      this.updateInfo(temps);
  }

  stopTimer(){
      console.log("Stop")
      this.timerActiv = false;
  }

  updateInfo(temps){
      if(this.timerActiv)
      {
          this.timingId+=1;
          if(this.timingId == 2)
          {
              console.log("LOIN");
              this.GestuelleValeurReset();
              this.stopTimer();
          }
          setTimeout(() => {
              this.updateInfo();
          }, temps);
      }
      else
      {
          //
      }
  }
  //---

  GestuelleValeurReset(){
    this.gesture = false;
    this.gestureAnulaires = false;
    this.waiting = false;
    this.drawing = false;
  }

  distance(x1, y1, x2, y2) 
  {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
  }
}
