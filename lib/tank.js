import Shell from './shell';
import Shell2 from './shell2';
import ShellSS from './shellss';
import Game from './guntanks';

class Tank {
  constructor (username, x, y, ctx, ctxTerrain) {
    this.username = username;
    this.health = 1000;
    this.maxHealth = 1000;
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 30;
    this.velX = 0;
    this.velY = 0;
    this.ctx = ctx;
    this.face = 'right';
    ctx.fillStyle = 'rgba(255,0,0,1)';
    this.shellSpeed = 0.25;
    this.rotation = 0;
    this.angle = 0 + this.rotation;
    this.radius = this.width/2;
    this.ctxTerrain = ctxTerrain;
    this.shellSelection = 1;
    this.ssCooldown = 0;
    this.distance = 0;
    this.maxDistance = 80;
    this.delay = 0;
    this.prevPower = 5; //for previous power indicator

    this.items = ['dualshot','dualshot','dualshot'];

    this.spriteLeft = new Image(); //sprites
    this.spriteLeft.src = './assets/tank-small-left.png';
    this.spriteRight = new Image();
    this.spriteRight.src = './assets/tank-small-right.png';

    this.hitTest = this.hitTest.bind(this);
    this.render = this.render.bind(this);
    this.draw = this.draw.bind(this);
    this.rotate = this.rotate.bind(this);
    this.fire = this.fire.bind(this);
    this.switchShot1 = this.switchShot1.bind(this);
    this.switchShot2 = this.switchShot2.bind(this);
    this.switchShotss = this.switchShotss.bind(this);
  }

  draw () {
    if ((Math.abs(this.x) > window.UI.canvas.width || Math.abs(this.y) > window.UI.canvas.height)) {
      this.turnOver = true;
    }

    window.UI.ctx.fillStyle = 'rgba(255,0,0,1)'; //healthbar
    window.UI.ctx.fillRect(this.x-15, this.y+this.height+15, this.width+30, 4);
    window.UI.ctx.fillStyle = 'rgba(0,255,0,1)';
    window.UI.ctx.fillRect(this.x-15, this.y+this.height+15, (this.width+30)*(this.health/this.maxHealth), 4);

    window.UI.ctx.font = "14px sans-serif"; //username
    window.UI.ctx.fillStyle = 'white';
    window.UI.ctx.fillText(this.username, this.x+13, this.y+this.height+35);

    if (this.rotation) {

      this.ctx.save();
      // console.log(this.x+window.UI.canvas.width/2)
      this.ctx.translate(this.x+this.width/2, this.y+this.height/2);
      this.ctx.rotate(this.rotation * Math.PI / 180);
      this.ctx.translate(-(this.x+this.width/2), -(this.y+this.height/2));
    }



    if (this.face == 'right') { //tank sprite
      this.ctx.drawImage(this.spriteRight, this.x-this.width, this.y-this.height+3);

      window.UI.ctx.beginPath(); //angle indicator right
      window.UI.ctx.arc(this.x, this.y, 50, (-this.angle+20)*Math.PI/180, (-this.angle-20)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x, this.y, 50, (-this.angle+5)*Math.PI/180, (-this.angle-5)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x, this.y, 45, (-this.angle+2)*Math.PI/180, (-this.angle-2)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();
      // this.ctx.fillStyle = 'rgba(255,0,0,1)';
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = 'rgba(255,255,255,1)';
      // this.ctx.fillRect(this.x+this.width - 5, this.y + 5, 2, 2);

    } else if (this.face == 'left') {
      this.ctx.drawImage(this.spriteLeft, this.x-10, this.y-this.height+3);

      window.UI.ctx.beginPath(); //angle indicator left
      window.UI.ctx.arc(this.x+20, this.y, 50, (this.angle+20+180)*Math.PI/180, (this.angle-20+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x+20, this.y, 50, (this.angle+5+180)*Math.PI/180, (this.angle-5+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();

      window.UI.ctx.beginPath();
      window.UI.ctx.arc(this.x+20, this.y, 45, (this.angle+2+180)*Math.PI/180, (this.angle-2+180)*Math.PI/180, true);
      window.UI.ctx.strokeStyle = 'rgba(255,0,0,1)';
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();
      // this.ctx.fillStyle = 'rgba(255,0,0,1)';
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = 'rgba(255,255,255,1)';
      // this.ctx.fillRect(this.x + 5, this.y + 5, 2, 2);

    }
    this.ctx.restore();
  }

  render (ctx) {
    switch (this.shellSelection) { //shell selection lights
      case 1:
        document.getElementById('light1').style.background = 'rgb(0,255,0)';
        document.getElementById('light2').style.background = 'rgb(60,60,60)';
        document.getElementById('lightss').style.background = 'rgb(60,60,60)';
        break;
      case 2:
        document.getElementById('light2').style.background = 'rgb(0,255,0)';
        document.getElementById('light1').style.background = 'rgb(60,60,60)';
        document.getElementById('lightss').style.background = 'rgb(60,60,60)';
        break;
      case 3:
        document.getElementById('lightss').style.background = 'rgb(255,0,0)';
        document.getElementById('light1').style.background = 'rgb(60,60,60)';
        document.getElementById('light2').style.background = 'rgb(60,60,60)';
        break;
    }
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
      this.distance++;
      if (dir == 'left' && !this.hitTest(this.x-1, this.y, 1, this.height/1.5)) {
        // this.rotate(45);
        this.face = 'left';
        if (this.distance < this.maxDistance) {
          this.x += velX;
          if (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
            this.y -= 1;

          }
        }
        // if (this.hitTest(this.x, this.y+this.height-1, 4,4)) {
        //   console.log('rotate');
        // }
      }
      if (dir == 'right' && !this.hitTest(this.x+this.width+1, this.y, 1, this.height/1.5)) {
        this.face = 'right';
        if (this.distance < this.maxDistance) {
          this.x += velX;
          if (this.hitTest(this.x, this.y+this.height-1, this.width, 1)) {
            this.y -= 1;
          }
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
    this.turnOver = true;
    if (this.shellSelection === 1) {
      this.delay += 750;
    } else if (this.shellSelection === 2) {
      this.delay += 900;
    } else if (this.shellSelection === 3) {
      this.delay += 1300;
      this.ssCooldown = 3;
      document.getElementById('overlay').classList.remove('hidden');
    }

    this.ssCooldown--;
    // console.log('power',power);
    // console.log(Game.tanks);
    if (this.face === 'right') {
      if (this.shellSelection === 1) {
        const shell = new Shell(
          this.x+this.width,
          this.y-15,
          power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      } else if (this.shellSelection === 2) {
        const shell = new Shell2(
          this.x+this.width,
          this.y-15,
          power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      } else {
        this.shellSelection = 1; //reset selector after ss shot
        const shell = new ShellSS(
          this.x+this.width+2,
          this.y-15,
          power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      }
    } else if (this.face === 'left') {
      if (this.shellSelection === 1) {
        const shell = new Shell(
          this.x-16,
          this.y-20,
          -power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      } else if (this.shellSelection === 2) {
        const shell = new Shell2(
          this.x-16,
          this.y-20,
          -power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      } else {
        this.shellSelection = 1;  //reset selector after ss shot
        const shell = new ShellSS(
          this.x-20,
          this.y-20,
          -power*this.shellSpeed*Math.cos(this.angle*Math.PI/180),
          -power*this.shellSpeed*Math.sin(this.angle*Math.PI/180),
          this.ctx,
          this.ctxTerrain
        );
        return shell;
      }
    }
  }

  changeAngle (inc) {
    this.angle += inc;
  }

  switchShot1 (e) {
    this.shellSelection = 1;
  }
  switchShot2 (e) {
    this.shellSelection = 2;
  }
  switchShotss (e) {
    this.shellSelection = 3;
  }



}

export default Tank;