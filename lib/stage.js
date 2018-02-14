

class Stage {
  constructor (ctxTerrain, canTerrain) {
    this.ctx = ctxTerrain;
    this.can = canTerrain;
    this.img = new Image();
    this.img.src = "./terrain_detail_larger.png";
    this.buffer = document.createElement('canvas');
    this.buffer.width = this.can.width;
    this.buffer.height = this.can.height;
    this.windSpeed = 0;
    this.windAngle = 0;

    // this.buffer.getContext('2d').drawImage(this.can, 0, 0);
    this.img.onload = () => {
      this.ctx.drawImage(this.img, 50, 500);
      // this.can.getContext('2d').drawImage(this.buffer, 0, 0);
      this.data = this.ctx.getImageData(0,0,this.img.width, this.img.height);
    };
    this.shell = null;
    this.holes = [];

  }

  render (ctx) {
    if (this.data) this.ctx.putImageData(this.data, 0 , 0);
      // this.ctx.drawImage(this.img, 50, 600);
    this.can.getContext('2d').drawImage(this.buffer, 0, 0);
    if (this.shell) {
      this.ctx.globalCompositeOperation = 'destination-out';
      // this.holes.push([this.shell.x, this.shell.y]);
      // for (let i = 0; i < this.holes.length; i++) {
      //   this.ctx.strokeStyle = "#000";
      //   this.ctx.beginPath();
      //   this.ctx.arc(this.holes[i][0], this.holes[i][1], 40, 0, Math.PI*2);
      //   this.ctx.fill();
      // }

      this.ctx.strokeStyle = "#000";
      this.ctx.beginPath();
      this.ctx.arc(this.shell.x, this.shell.y, this.shell.explosionRadius, 0, Math.PI*2);
      this.ctx.fill();
      // this.ctx.closePath();
      // this.buffer.getContext('2d').drawImage(this.can, 0, 0);
      this.shell = null;
      this.data = this.ctx.getImageData(0,0,this.img.width, this.img.height);
      this.ctx.globalCompositeOperation = 'source-over';
    }

    document.getElementById('wind-text').innerHTML = `${this.windSpeed}`; //wind speed text

    window.UI.ctx.beginPath(); //wind angle display
    window.UI.ctx.arc(this.can.width/2, 45, 40, (-this.windAngle+10)*Math.PI/180, (-this.windAngle-10)*Math.PI/180, true);
    window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
    window.UI.ctx.lineWidth = 10;
    window.UI.ctx.stroke();
    window.UI.ctx.closePath();
    window.UI.ctx.lineWidth = 2;
  }

  changeWind () {
    this.windSpeed = Math.floor(Math.random()*26);
    this.windAngle = Math.random()*360;
  }



}

export default Stage;