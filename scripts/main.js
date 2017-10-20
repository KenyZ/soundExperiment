let   canvas = document.getElementById('canvas'),
      audio,
      ctx,
      simplex       = new SimplexNoise(),
      paintdrops    = [],
      line,
      splash,
      nbPaintdrops  = 3;

    const color = [
        '#ed5e9a',
        '#fff680',
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
    //window.addEventListener( 'resize', onResize.bind(this) );
    // rafId = requestAnimationFrame( frame )

    let controlBtn      = document.getElementById('controlBtn');
        muteStatus      = false;

    controlBtn.addEventListener('click', function() {
        let me          = this;
        if (!muteStatus) {
            audio.muteSound(true); //Mutes audio
            muteStatus  = true; //Sets mute status to true
            me.classList.add('mute');
        } else {
            audio.muteSound(false); //Unmutes audio
            muteStatus  = false; //Sets mute status to false
            me.classList.remove('mute');
        }
    })

}

function updateFrame() {

    requestAnimationFrame( updateFrame );

    //Draw a rect with transparacy to create a shadow effect


    let cumul     = 0;
    let variation = 0;

    // TODO: resize

    let frequencyData = audio.getFrequency();

    for (let k = 0; k < 800; k++) {
      cumul += frequencyData[k];
    }

    variation = cumul / 255;
    console.log(variation);

    if (variation > 350) {
        ctx.fillStyle = 'rgba(255, 27, 82, 0.1)';
    } else {
        ctx.fillStyle = 'rgba(13, 29, 51, 0.1)';
    }

    let variationPaintDrop = 0;
    for (let i = 0; i < nbPaintdrops; i++) {

        let paintdrop     = paintdrops[i],
        percentIdx        = i / nbPaintdrops;
        frequencyIdx      = Math.floor(1024 * percentIdx);

        variationPaintDrop = frequencyData[frequencyIdx] / 255;

        paintdrop.update(variationPaintDrop, 1);
        paintdrop.render();
    }

    line.update(0.05, variation);
    line.render();

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function introAnimation() {
    let rafId = requestAnimationFrame( introAnimation );

}

function init() {

    onResize();
    addListeners();

    //Creates a new audio object with an url
    audio = new Audio('sounds/sound4.mp3');
    audio.loadSound();

    ctx = canvas.getContext('2d');

    let ratio         = 7,
        distanceX     = -ratio * 2,
        distanceY     = 0,
        height        = 375,
        angle         = 0,
        angleIncrease = 0.020,
        amplitude     = height / 3;

    //Instances 3 shapes as paintdrops
    for (let i = 0; i < nbPaintdrops; i++) {

        let paintdrop = new Shape(200, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, color[i]);
        paintdrops.push(paintdrop);
        height        -= 125;
        angle         += Math.random() * (0 - 0.05);

    }

    //Creates a new line
    line = new Line(200, distanceX, canvasHeight / 2, 0, 0.5, 0.05, 10, 50, '#fff');
}

init();
updateFrame();
