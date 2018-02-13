import Game from './guntanks.js';
import UI from './ui.js';
import Stage from './stage.js';


class Shell {
  constructor (x, y, xVel, yVel, radius, ctx, ctxTerrain) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.time = 0;
    this.radius = radius;
    this.ctx = ctx;
    this.weight = 0.05; //0.15 is about right
    // this.tanks = tanks; //array of all tanks
    this.damage = 100;
    this.hitObject = null;
    this.explosionRadius = 50;
    this.ctxTerrain = ctxTerrain;

    this.hitTest = this.hitTest.bind(this);
  }

  render (ctx) {
    //tank collision
    if (this.hitTest(this.x, this.y, this.radius*2, this.radius*2) === 'tank') {
      window.game.removeObject(this);
      window.UI.ctx.fillText(this.damage.toString(), this.x, this.y);
      this.hitObject.health -= this.damage;

      window.setTimeout(() => {
        console.log('clear');
        window.UI.ctx.clearRect(0, 0, 1200, 800);
        this.hitObject = null;
      }, 1000);

    //terrain collision
    } else if (this.hitTest(this.x, this.y, this.radius*2, this.radius*2) === 'terrain') {
      window.game.removeObject(this);
      window.stage.shell = this;

      // window.setTimeout(() => {
      //   console.log('clear');
      //   window.UI.ctx.clearRect(0, 0, 1200, 800);
      //   this.hitObject = null;
      // }, 1000);

    //no collision
    } else {

      // console.log(this.x, this.y, this.xVel, this.yVel);
      this.x += this.xVel;
      this.y = this.y + this.yVel + 0.5*this.weight*this.time*this.time;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      ctx.fillStyle = 'rgba(0,255,0,1)';
      ctx.fill();
      ctx.closePath();
      this.time += 0.5;
    }

  }

  hitTest (x, y, width, height) {
    for (let i = 0; i < window.tanks.length; i++) {  //tanks array on window
      if (this.isCollidedWith(window.tanks[i])) {
        console.log('hit');
        this.hitObject = window.tanks[i];
        return 'tank';
      }
    }


    let array = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        array.push([x+i, y+j]);
      }
    }

    for(let i = 0; i < array.length; i++) {
      // console.log(this.ctx.getImageData(array[i][0],array[i][1],1,1).data);
      if (
        this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[0] != 0 ||
        this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[1] != 0 ||
        this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[2] != 0 ||
        this.ctxTerrain.getImageData(array[i][0],array[i][1],1,1).data[3] != 0
      ) {
        return 'terrain';
      }
    }
    return false;

  }

  isCollidedWith (otherObject) {
    const x1 = this.x+this.radius;
    const y1 = this.y+this.radius;
    const x2 = otherObject.x+otherObject.width/2;
    const y2 = otherObject.y+otherObject.height/2;

    const r1 = this.radius;
    const r2 = otherObject.radius;

    if ((r1+r2) > Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) ) {
      return true;
    }

    return false;
  }




}

export default Shell;