import Shell from './shell';
import Game from './guntanks';

class Tank {
  constructor (x, y, ctx, ctxTerrain) {
    this.health = 1000;
    this.maxHealth = 1000;
    this.x = x;
    this.y = y;
    // this.radius = 20;
    this.width = 25;
    this.height = 30;
    this.velX = 0;
    this.velY = 0;
    this.ctx = ctx;
    this.face = 'right';
    ctx.fillStyle = 'rgba(255,0,0,1)';
    this.shellSpeed = 0.3;
    this.shellRadius = 8 ;
    this.rotation = 0;
    this.angle = 0 + this.rotation;
    this.radius = this.width/2;
    this.ctxTerrain = ctxTerrain;

    this.spriteLeft = new Image(); //sprites
    this.spriteLeft.src = './tank-small-left.png';
    this.spriteRight = new Image();
    this.spriteRight.src = './tank-small-right.png';

    this.hitTest = this.hitTest.bind(this);
    this.render = this.render.bind(this);
    this.draw = this.draw.bind(this);
    this.rotate = this.rotate.bind(this);
    this.fire = this.fire.bind(this);
  }

  draw () {
    window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
    window.UI.ctx.fillRect(this.x-15, this.y+this.height+15, this.width+30, 4);
    window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
    window.UI.ctx.fillRect(this.x-15, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);




    if (this.face == 'right') { //tank sprite
      this.ctx.drawImage(this.spriteRight, this.x-this.width, this.y-this.height+3);

      window.UI.ctx.beginPath(); //angle indicator right
      window.UI.ctx.arc(this.x, this.y, 60, (-this.angle+20)*Math.PI/180, (-this.angle-20)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,255,255,100)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x, this.y, 60, (-this.angle+5)*Math.PI/180, (-this.angle-5)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x, this.y, 55, (-this.angle+2)*Math.PI/180, (-this.angle-2)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();
      // this.ctx.fillStyle = 'rgba(255,0,0,1)';
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = 'rgba(255,255,255,1)';
      // this.ctx.fillRect(this.x+this.width - 5, this.y + 5, 2, 2);

    } else if (this.face == 'left') {
      this.ctx.drawImage(this.spriteLeft, this.x-10, this.y-this.height+3);

      window.UI.ctx.beginPath(); //angle indicator left
      window.UI.ctx.arc(this.x+20, this.y, 60, (this.angle+20+180)*Math.PI/180, (this.angle-20+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,255,255,100)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x+20, this.y, 60, (this.angle+5+180)*Math.PI/180, (this.angle-5+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x+20, this.y, 55, (this.angle+2+180)*Math.PI/180, (this.angle-2+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,255)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();
      // this.ctx.fillStyle = 'rgba(255,0,0,1)';
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = 'rgba(255,255,255,1)';
      // this.ctx.fillRect(this.x + 5, this.y + 5, 2, 2);

    }
  }

  render (ctx) {
    this.ctx.globalCompositeOperation = 'source-over';
    this.move();
    this.draw();
    // // this.x += this.velX;
    // this.y += this.velY;
    // ctx.fillStyle = 'rgba(255,0,0,1)';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = 'rgba(255,255,255,1)';
    // ctx.fillRect(this.x+this.width - 5, this.y + 5, 2, 2);
    // this.ctx.fillStyle = 'rgba(0,0,0,1)';
    // this.ctx.fillRect(this.x-1, this.y, 1, this.height);
    //
    // this.ctx.fillStyle = 'rgba(0,0,0,1)';
    // this.ctx.fillRect(this.x+this.width-1, this.y, 1, this.height);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    // ctx.fill();

  }

  hitTest (x, y, width, height) { //return true if collision
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
        return true;
      }
    }
    return false;
  }


  move (velX = 0, dir) {
    if (dir) { //moving

      if (dir == 'left' && !this.hitTest(this.x-1, this.y, 1, 1)) {
        // this.rotate(45);
        this.face = 'left';
        this.x += velX;
        if (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
          this.y -= 1;
        }
        // if (this.hitTest(this.x, this.y+this.height-1, 4,4)) {
        //   console.log('rotate');
        // }
      }
      if (dir == 'right' && !this.hitTest(this.x+this.width+1, this.y, 1, this.height/1.5)) {
        this.face = 'right';
        this.x += velX;
        if (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
          // console.log('right rise');
          this.y -= 1;
        }
      }


    } else { //not moving
      this.x = this.x;
      if (!this.hitTest(this.x, this.y+this.height+1, this.width, 1)) {
        this.y += 6;
      } else {
        while (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
          this.y -= 1;
        }
      }
    }

  }

  rotate (deg) {
  //   console.log('rotate');
  //   this.ctx.save();
  //   this.ctx.beginPath();
  //   this.ctx.translate( this.x + this.width/2, this.y + this.height/2 );
  //   this.ctx.rotate(deg*Math.PI/180);
  //   this.ctx.rect( -this.width/2, -this.height/2, this.width, this.height);
  //
  //   this.ctx.fillStyle = 'rgba(255,0,0,1)';
  //   this.ctx.fill();
  //
  //   // restore the context to its untranslated/unrotated state
  //   this.ctx.restore();
  }

  fire (power) {
    // console.log('power',power);
    // console.log(Game.tanks);
    if (this.face === 'right') {
      const shell = new Shell(
        this.x+this.width,
        this.y,
        power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
        -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
        this.shellRadius,
        this.ctx,
        this.ctxTerrain
      );
      return shell;
    } else if (this.face === 'left') {
      const shell = new Shell(
        this.x-16,
        this.y,
        -power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
        -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
        this.shellRadius,
        this.ctx,
        this.ctxTerrain
      );
      return shell;
    }
  }

  changeAngle (inc) {
    this.angle += inc;
    console.log(this.angle);
  }



}

export default Tank;