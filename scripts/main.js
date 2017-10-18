let   canvas = document.getElementById('canvas'),
      audio,
      ctx,
      simplex = new SimplexNoise(),
      paintdrops = [];

    const color = [
      '#fff680',
      '#ed5e9a',
      '#7248de'
    ]
/**
 * onResize
 * - Triggered when window is resized
 * @param  {obj} evt
 */
function onResize( evt ) {

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'

}

function addListeners() {
    window.addEventListener( 'resize', onResize.bind(this) );
    // rafId = requestAnimationFrame( frame )
}


function updateFrame() {

    requestAnimationFrame( updateFrame );


    // ctx.clearRect(0,0, canvasWidth, canvasHeight);
          ctx.fillStyle = 'rgba(13, 29, 51, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

    let cumul = 0;

    // TODO: each paintdrop worries about one specific range of frequency

    // TODO: resize

    for (let i = 0; i < paintdrops.length; i++) {

        let paintdrop     = paintdrops[i],
          percentIdx    = i / paintdrop.numberPoints;
          frequencyIdx  = Math.floor(1024 * percentIdx);

        let frequencyData = audio.getFrequency();

        cumul += frequencyData[frequencyIdx];

        let variation = cumul / 255;

        paintdrop.update(variation);
        paintdrop.render();



    }
}

function init() {

    onResize();

    //Creates a new audio object with an url
    audio = new Audio('sounds/sound3.mp3');
    audio.loadSound();

    ctx = canvas.getContext('2d');

    let height = 400;
    let angle = 0;

    //Instances 3 paintdrops
    for (let i = 0; i < 3; i++){
      let paintdrop = new Paintdrop(height, angle, color[i]);
      paintdrop.render();
      paintdrops.push(paintdrop);
      height -= 100;
      angle   += Math.random() * (0 - 0.05);
    }

}

init();
updateFrame();
