

class Stage {
  constructor () {
    this.img = new Image();
    this.img.src = "./terrain_detail_larger.png";
    // this.imgBmp = window.createImageBitmap(this.img,0,0,1200, 800);
    this.shell = null;
    this.holes = [];
  }

  render (ctx) {

    ctx.drawImage(this.img, 50, 400);
    if (this.shell) {
      ctx.globalCompositeOperation = 'destination-out';
      this.holes.push([this.shell.x, this.shell.y]);
      for (let i = 0; i < this.holes.length; i++) {
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.holes[i][0], this.holes[i][1], 40, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

  }

  hitBy (shell) {

  }



}

export default Stage;