import Game from './guntanks.js';
import UI from './ui.js';
import Stage from './stage.js';


class Shell {
  constructor (x, y, xVel, yVel, ctx, ctxTerrain) {
    this.x = x;
    this.y = y+10;
    this.xVel = xVel;
    this.yVel = yVel;
    this.time = 0;
    this.radius = 8;
    this.ctx = ctx;
    this.weight = 0.055;
    this.damage = 130;
    this.hitObject = null;
    this.explosionRadius = 48;
    this.ctxTerrain = ctxTerrain;
    this.color = 'rgb(0,255,0)';
    this.windAngle = window.stage.windAngle;
    this.windSpeed = window.stage.windSpeed;

    this.hitTest = this.hitTest.bind(this);


  }

  render (ctx) {


    //tank collision
    if (this.hitTest(this.x, this.y, this.radius*2, this.radius*2) === 'tank') {
      window.game.removeObject(this);
      window.stage.shell = this;
      window.ctxText.font = "20px sans-serif";
      window.ctxText.fillStyle = "red";
      window.ctxText.fillText('-'+this.damage.toString(), this.x, this.y-20); //damage text

      if (this.hitObject.health > 0) {
        this.hitObject.health -= this.damage; //do damage

        if (this.hitObject.health <= 0) { //player death
          window.tanks.splice( //destroy tank obj
            window.tanks.indexOf(this.hitObject), 1
          );
          window.game.turnCounter--;
        }
        document.getElementById('overlay').classList.add('hidden'); //ss shot overlay

        window.game.time = window.game.TIMEOUT;
        clearInterval(window.game.interval);
        clearTimeout(window.game.timeout);
        window.game.startTurns();
      }

      window.setTimeout(() => { //damage text clearing
        window.ctxText.clearRect(0, 0, window.canText.width, window.canText.height);
        this.hitObject = null;
      }, 1250);

    //terrain collision
    } else if (this.hitTest(this.x, this.y, this.radius*2, this.radius*2) === 'terrain') {
      window.game.removeObject(this);
      window.stage.shell = this;

      document.getElementById('overlay').classList.add('hidden'); //ss shot overlay

      window.game.time = window.game.TIMEOUT;
      clearInterval(window.game.interval);
      clearTimeout(window.game.timeout);
      window.game.startTurns();

    //no collision
    } else {


      this.x += this.xVel + 0.02*this.windSpeed*Math.cos(this.windAngle*Math.PI/180)*this.time; //x coordinate
      this.y += this.yVel + 0.5*this.weight*this.time*this.time - 0.02*this.windSpeed*Math.sin(this.windAngle*Math.PI/180)*this.time; //y-coordinate

      ctx.beginPath(); //render shell
      ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      this.time += 0.5;
    }

  }

  hitTest (x, y, width, height) {
    for (let i = 0; i < window.tanks.length; i++) {  //tanks array on window
      if (this.isCollidedWith(window.tanks[i])) {
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