class Tank {
  constructor (x, y, ctx) {
    this.x = x;
    this.y = y;
    // this.radius = 20;
    this.width = 25;
    this.height = 25;
    this.velX = 0;
    this.velY = 0;
    this.ctx = ctx;

    this.hitTest = this.hitTest.bind(this);
  }

  render (ctx) {

    this.move();
    // this.x += this.velX;
    this.y += this.velY;
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    // ctx.fill();

  }

  hitTest (x, y, width, height) {
    let array = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        array.push([x+i, y+j]);
      }
    }
    // console.log(array);
    for(let i = 0; i < array.length; i++) {
      // console.log(this.ctx.getImageData(array[i][0],array[i][1],1,1).data);
      if (this.ctx.getImageData(array[i][0],array[i][1],1,1).data[1] != 0) return true;
    }
    return false;
  }

  // hitTerrain (ctx) {
  //
  //   let data = ctx.getImageData(this.x, this.y+this.radius, 1, 1);
  //   let dataLeft = ctx.getImageData(this.x-5, this.y+this.radius-5, 1, 1);
  //   let dataMaxLeft = ctx.getImageData(this.x-this.radius+10, this.y+this.radius-10, 1, 1);
  //   let dataRight = ctx.getImageData(this.x+5, this.y-5, 1, 1);
  //   let dataMaxRight = ctx.getImageData(this.x+this.radius-10, this.y+this.radius-10, 1, 1);
  //   if(data.data[0] != 0 || dataLeft.data[0] != 0 || dataRight.data[0] != 0
  //     || dataMaxLeft.data[0] != 0 || dataMaxRight.data[0] != 0
  //   ) {
  //     this.velY = 0;
  //   } else {
  //     this.velY = 10;
  //   }
  // }

  move (velX = 0) {
    this.x += velX;
    // console.log('x',this.x);
    // console.log('y',this.y);
    if (!this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
      console.log('falling');
      this.y += 6;
    }
    while (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
      console.log('resting');
      this.y -= 1;
    }

  }
}

export default Tank;