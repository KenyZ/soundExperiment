let   canvas = document.getElementById('canvas'),
      audio,
      ctx,
      simplex = new SimplexNoise(),
      points = [];

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
    ctx.clearRect(0,0, canvasWidth, canvasHeight);

    let cumul = 0;

    for (let i = 0; i < points.length; i++) {

        let percentIdx = i / points.length;
        let frequencyIdx = Math.floor(1024 * percentIdx);


        let frequencyData = audio.getFrequency();

        cumul += frequencyData[frequencyIdx];

        let variation = cumul / 255;

        let p = points[i];

        p.update(variation);
        p.render();

    }

    drawLines();
}

function drawLines () {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle='#fff';
  ctx.fillStyle = '#fff';
  ctx.moveTo(0, 0);

    for (let i = 0; i < points.length; i++) {
      let futurePoint = points[i+1];

      if (i == points.length-1) {
        futurePoint = {
          x : points[points.length-1],
          y : 0
        }
      }

      ctx.lineTo(futurePoint.x, futurePoint.y);
    }
    ctx.stroke();

    ctx.lineTo(canvasWidth, 0);

    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

function init() {

    onResize();
    // addListeners();
    audio = new Audio('sounds/sound2.mp3');
    audio.loadSound();

    ctx = canvas.getContext('2d');

    const numberPoints = canvasWidth / 8;
    const gap = Math.floor(canvasWidth / numberPoints);

    let base = {
      x : -gap,
      y : 400
    }

    let pos = 0;

    let angle = 0;

    for(let i = 0; i <= numberPoints + 2; i++) {
      angle += 0.020;

      let point = new Point(ctx, base, pos, angle, 'pink', true);

      pos += gap;
      points.push(point);
    }

    drawLines();
}



init();

updateFrame();
