function Audio (url) {
    window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

    this.audioCtx = new AudioContext();
    this.analyser = this.audioCtx.createAnalyser();
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();
    this.url = url;
}

Audio.prototype = {
  loadSound : function () {
    this.request = new XMLHttpRequest();
    this.request.open('GET', this.url, true);
    this.request.responseType = 'arraybuffer';
    // Decode asynchronously
    this.request.onload = function() {
      console.log(this.audioCtx);
      this.audioCtx.decodeAudioData(this.request.response, function(buffer) {
        // success callback
        this.audioBuffer = buffer;

        // Create sound from buffer
        this.audioSource = this.audioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;

        // connect the audio source to context's output
        this.audioSource.connect( this.analyser )
        this.analyser.connect( this.audioCtx.destination )

        // play sound
        this.audioSource.start();

      }.bind(this));
    }.bind(this);
    this.request.send();
  },
  getFrequency : function () {
    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    this.analyser.getByteFrequencyData(this.frequencyData);

    return this.frequencyData;
  },

  pause : function() {
    // TODO: pause function
  }
}
