

class Stage {
  constructor () {
    this.img = new Image();
    this.img.src = "./terrain_detail_larger.png";

  }

  render (ctx) {
    ctx.drawImage(this.img, 50, 400);

  }

  hitBy (projectile) {

  }



}

export default Stage;