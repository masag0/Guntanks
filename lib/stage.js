

class Stage {
  constructor () {

  }

  render (ctx) {
    let img = new Image();
    img.src = "./terrain_hole.png";
    ctx.drawImage(img, 150, 500);

  }

  hitBy (projectile) {

  }



}

export default Stage;