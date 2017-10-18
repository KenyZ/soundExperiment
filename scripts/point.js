function Point (coords, angle, height) {

    this.coords       = coords; //Y & x coordinates where to start
    this.angle        = angle;
    this.height       = height;
    this.amplitude    = this.height / 3;
    this.time         = 0;
    this.noise        = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitude;

    this.x            = this.coords.x,
    this.y            = this.coords.y + this.height + this.noise;
    this.firstY       = this.y;

}

Point.prototype = {
    render : function() {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.restore();
        ctx.closePath();
    },

    update : function(variation) {

        this.variation  = variation;
        this.noise      = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * (this.variation);
        this.y          = this.firstY +  (this.noise * this.amplitude * 1.5);
    }
}
