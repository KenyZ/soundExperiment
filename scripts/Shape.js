function Shape(nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, color) {
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

    this.createPoints();
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
    }

}

function Line (nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, color) {

    this.nbPoints         = nbPoints;
    this.distanceX        = distanceX;
    this.distanceY        = distanceY;
    this.angle            = angle;
    this.angleIncrease    = angleIncrease;
    this.ratio            = ratio;
    this.amplitude        = amplitude;
    this.color            = color;
    this.height           = height;

    Shape.call(this, nbPoints, distanceX, distanceY, height, angle, angleIncrease, ratio, amplitude, color);


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
