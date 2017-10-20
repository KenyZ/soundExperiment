function Shape(nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, duration, color) {
    this.nbPoints         = nbPoints;
    this.distanceX        = distanceX;
    this.distanceY        = distanceY;
    this.angle            = angle;
    this.angleIncrease    = angleIncrease;
    this.ratio            = ratio;
    this.amplitude        = amplitude;
    this.color            = color;
    this.height           = height;
    this.points           = [];
    this.tweenCurrentTime = 0;
    this.targetPos        = -100;
    this.startPos         = -850;
    this.duration         = duration;
    this.translateY       = this.startPos;
    this.now              = Date.now(),
    this.lastTime         = this.now,
    this.deltaTime        = 16;

    this.createPoints();
    this.updateIntro();
}

Shape.prototype = {

    createPoints : function () {
        let coords = {
          x : this.distanceX,
          y : this.distanceY
        }

        for (let i = 0; i <= this.nbPoints; i++) {
            this.angle += this.angleIncrease;

            let point   = new Point(coords, this.angle, this.height, this.amplitude);

            point.render();
            coords.x += this.ratio;
            this.points.push(point);
        }

    }, render : function() {
        ctx.beginPath();
        ctx.save();
        ctx.translate(0, this.translateY);
        ctx.fillStyle = this.color;
        ctx.moveTo(this.points[0].x, 0);

        let futurePoint,
            lastIndex   = this.nbPoints - 1;

            for (let i = 0; i < this.nbPoints; i++) {

                if (i == lastIndex) {
                    futurePoint = {
                      x : canvasWidth,
                      y : 0
                    }
                } else {
                    futurePoint = this.points[i+1];
                }
                ctx.lineTo(futurePoint.x, futurePoint.y);
            }
            ctx.fill();
        ctx.restore();
        ctx.closePath();

    }, update : function(variation, time) {
        this.variation  = variation;
        this.time       = time;

        for (let i = 0; i <= this.nbPoints; i++) {

            let point   = this.points[i];

            point.update(this.variation, this.time);
            point.render();

        }
    }, updateIntro : function () {
              this.rafId = requestAnimationFrame(this.updateIntro.bind(this));

              this.now = Date.now();
              this.deltaTime =  this.now - this.lastTime;
              this.lastTime = this.now;
              this.tweenCurrentTime += this.deltaTime;

          if (this.tweenCurrentTime < this.duration) {

              this.translateY = Easing.easeInOutBack(this.tweenCurrentTime, this.startPos, this.targetPos - this.startPos, this.duration);

          } else {
            cancelAnimationFrame(this.rafId);
          }
  }

}

function Line (nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, duration, color) {

    this.nbPoints         = nbPoints;
    this.distanceX        = distanceX;
    this.distanceY        = distanceY;
    this.angle            = angle;
    this.angleIncrease    = angleIncrease;
    this.ratio            = ratio;
    this.amplitude        = amplitude;
    this.color            = color;
    this.height           = height;

    Shape.call(this, nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, duration, color);


}

Line.prototype        = new Shape();

Line.prototype.render = function() {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.points[0].x, this.distanceY);

    let futurePoint;

    for (let i = 0; i < this.nbPoints - 1; i++) {
        futurePoint = this.points[i+1];
        ctx.lineTo(futurePoint.x, futurePoint.y);
    }

    ctx.stroke();

    ctx.restore();
    ctx.closePath();
}
