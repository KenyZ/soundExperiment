class Point {

  constructor(ctx, base, pos, angle, shade) {
      this.base = base;
      this.angle = angle;
      this.pos =  pos ;
      this.amplitude = 300;
      this.time = 0;
      this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * this.amplitude;

      this.x = this.base.x + this.pos,
      this.y = 700 + this.noise,
      this.ctx = ctx;
      this.firstY = this.y;
  }

  render() {
      this.ctx.beginPath();
      this.ctx.save();
      this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
      this.ctx.restore();
      this.ctx.closePath();
  }

  update(variation) {

      this.variation = variation;

      if (this.y > 400) {
          this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * (this.variation + 40);
          this.y = this.firstY  + this.noise  + 100;
      } else  {
          this.noise = simplex.noise2D(Math.cos(this.angle), Math.sin(this.angle)) * (this.variation + 200);
          this.y = this.firstY  + this.noise;
      }


  }
}
