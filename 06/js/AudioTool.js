class AudioTool {
  constructor() {
    this.audioFile = "audio/noise.m4a";
    this.audio = new Audio(this.audioFile);
    this.isPlaying = false;
    this.frequence = 0;
  }

  initAudioContext() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.initBroadcast();
    this.setupAnalyser();
  }

  initBroadcast() {
    this.source = this.audioContext.createMediaElementSource(this.audio);

    // Créer un filtre passe-bande
    this.biquadFilter = this.audioContext.createBiquadFilter();
    this.biquadFilter.type = "bandpass";
    this.biquadFilter.frequency.value = 1; // 
    this.biquadFilter.Q.value = 10; // 
  }

  setupAnalyser() {
    this.analyser = this.audioContext.createAnalyser();

    this.source.connect(this.biquadFilter);
    this.biquadFilter.connect(this.analyser);

    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataFrequency = new Uint8Array(this.bufferLength);
    this.dataFrequency.forEach(element => {
    });
    this.dataFloatFrequency = new Float32Array(this.bufferLength);
    this.dataWave = new Uint8Array(this.bufferLength);
  }

  updateWaveForm() {
    if (this.audioContext) this.analyser.getByteTimeDomainData(this.dataWave);
  }
  updateFrequency() {
    if (this.audioContext)
      this.analyser.getByteFrequencyData(this.dataFrequency);
  }
  updatedFloatFrequency() {
    if (this.audioContext)
      this.analyser.getFloatFrequencyData(this.dataFloatFrequency);
  }

  play(mouse) {
    if (this.isPlaying === false) {
      if (!this.audioContext) {
        this.initAudioContext();
      }
      this.audio.play();
      this.isPlaying = true;
    } else {
       //this.audio.pause();
       //this.isPlaying = false;
     /* let timeToStart =
        (mouse.clientX / window.innerWidth) * this.audio.duration;
      this.audio.currentTime = timeToStart;*/
      this.biquadFilter.frequency.value = (mouse.clientX / window.innerWidth) * 10000;
      this.frequence = mouse.clientX / 2;
      console.log(this.frequence)
      //biquadFilter.Q.value = (mouse.clientX / window.innerWidth) * this.audio.duration / 100;
    }
  }
}
