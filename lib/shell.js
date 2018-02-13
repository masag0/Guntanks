

class Shell {
  constructor (x, y, xVel, yVel, radius, ctx) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.time = 0;
    this.radius = radius;
    this.ctx = ctx;
    this.weight = 0.2; //0.05 is about right

  }

  render (ctx) {
    console.log(this.x, this.y, this.xVel, this.yVel);
    this.x += this.xVel;
    this.y = this.y + this.yVel + 0.5*this.weight*this.time*this.time;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fillStyle = 'rgba(0,255,0,1)';
    ctx.fill();
    ctx.closePath();
    this.time += 0.5;
  }

  hitTest (x, y, width, height) {

  }
}

export default Shell;