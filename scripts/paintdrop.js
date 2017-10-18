function Paintdrop(height, angle, color) {

  this.angle          = angle;
  this.ratio          = 7;
  this.numberPoints   = Math.floor(canvasWidth + 100 / this.ratio);
  this.points         = [];
  this.height         = height;
  this.color          = color;

  this.create();

}

Paintdrop.prototype = {

    create : function () {

        let height      = canvasHeight / 3,
        gap         = this.ratio,
        coords      =
            {
              x : -gap,
              y : 0
            };

        for (let i = 0; i <= this.numberPoints; i++) {

            this.angle += 0.020;

            let point   = new Point(coords, this.angle, this.height);

            point.render();
            coords.x += gap;
            this.points.push(point);

        }

    },

    render : function () {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, 0);

        let futurePoint,
            lastIndex   = this.numberPoints - 1;

            for (let i = 0; i < this.numberPoints; i++) {

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
    },

    update : function (variation) {
        this.variation = variation;

        for (let i = 0; i <= this.numberPoints; i++) {

            let point   = this.points[i];

            point.update(this.variation);
            point.render();

        }
    }

}
