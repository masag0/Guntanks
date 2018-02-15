// const Game = require("./game");
// const GameView = require("./game_view");
//
// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementsByTagName("canvas")[0];
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   const ctx = canvasEl.getContext("2d");
//   const game = new Game();
//   new GameView(game, ctx).start();
// });

import _ from 'lodash';
import Stage from './stage';
import Tank from './tank';
import UI from './ui';


const can = document.getElementById('canvas');
const canTerrain = document.getElementById('terrain-canvas');
const ctx = can.getContext('2d');
const ctxTerrain = canTerrain.getContext('2d');
const canText = document.getElementById('text-canvas');
const ctxText = canText.getContext('2d');



class Game {
  constructor () {
    this.tank = new Tank('Player 1', 100, 0, ctx, ctxTerrain);
    this.tank2 = new Tank('Player 2', 400, 0, ctx, ctxTerrain);
    this.tank3 = new Tank('Player 3', 750, 0, ctx, ctxTerrain);
    this.tank4 = new Tank('Player 4', 1050, 0, ctx, ctxTerrain);
    this.currentTank = this.tank2;
    this.can = can;
    this.ctx = ctx;
    this.ctxTerrain = ctxTerrain;
    this.canTerrain = canTerrain;
    this.stage = new Stage(this.ctxTerrain, this.canTerrain);
    this.TIMEOUT = 6;
    this.time = 6;
    this.turnCounter = 1;
    this.roundCounter = 0;

    this.objects = [];
    this.UI = new UI(this);

    this.bindKeyDown = this.bindKeyDown.bind(this);
    this.bindKeyUp = this.bindKeyUp.bind(this);

    window.game = this;
    window.tanks = [this.tank, this.tank2, this.tank3, this.tank4];
    window.canText = canText;
    window.ctxText = ctxText;

    // window.addEventListener('keydown', this.bindKeys);
    // window.keydown = window.addEventListener('keydown', this.bindKeyDown);
    window.keydown = window.addEventListener('keydown', this.bindKeyDown);
    window.keyup = window.addEventListener('keyup', this.bindKeyUp);

    this.startTurns = this.startTurns.bind(this);
    this.render = this.render.bind(this);
  }



  bindKeyDown (event) {

    const keyName = event.key;
    if (keyName == 'a') this.currentTank.move(-1.5, 'left'); //1.5
    if (keyName == 'd') this.currentTank.move(1.5, 'right');
    if (keyName == 'w') this.currentTank.changeAngle(2);
    if (keyName == 's') this.currentTank.changeAngle(-2);
    if (keyName == ' ') {
      event.preventDefault();
      this.UI.startAdjustPower();
    }
  }

  bindKeyUp (event) {
    const keyName = event.key;
    if (keyName == ' ') this.UI.stopAdjustPower(this.currentTank);
  }


  // window.addEventListener('keypress', (event) => {
  //   const keyName = event.key;
  // });





  // setInterval( () => {
  //   ctx.clearRect(0,0,can.width, can.height);
  //   stage.render(ctx);
  //   tank.render(ctx);
  //   tank2.render(ctx);
  // }, 1000/60);
  // let shells = [];
  // shells.push(tank.fire(0, 100));


  addObject (obj) {
    this.objects.push(obj);
  }

  removeObject (obj) {
    this.objects.splice(
      this.objects.indexOf(obj), 1
    );
    console.log(this.objects);
  }



  render () {

    this.ctx.clearRect(0,0,can.width, can.height);
    window.UI.ctx.clearRect(0,0,window.UI.canvas.width, window.UI.canvas.height);

    window.stage.render(this.ctxTerrain); //render terrain


    if (window.tanks.length > 1) {
      window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
      window.UI.ctx.fillRect(this.currentTank.x-15, this.currentTank.y-70, 30, 25);
      window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
      window.UI.ctx.strokeRect(this.currentTank.x-15, this.currentTank.y-70, 30, 25);

      window.UI.ctx.font = "20px sans-serif"; //timer text for currentTank
      window.UI.ctx.fillStyle = 'white';
      window.UI.ctx.textAlign = "center";
      window.UI.ctx.fillText(this.time.toString(), this.currentTank.x, this.currentTank.y-51);

      window.UI.ctx.beginPath(); //triangle
      window.UI.ctx.moveTo(this.currentTank.x-5, this.currentTank.y-46);
      window.UI.ctx.lineTo(this.currentTank.x, this.currentTank.y-39);
      window.UI.ctx.lineTo(this.currentTank.x+5, this.currentTank.y-46);
      window.UI.ctx.fillStyle = 'rgba(235,200,96,1)';
      window.UI.ctx.fill();
      window.UI.ctx.stroke();
      window.UI.ctx.closePath();
    }

    for (let i = 0; i < window.tanks.length; i++) {
      window.tanks[i].render(this.ctx, this.ctxTerrain);
      if (window.tanks[i] && (Math.abs(window.tanks[i].x) > this.can.width || Math.abs(window.tanks[i].y) > this.can.height)) {
        window.tanks.splice(i, 1);
        clearInterval(window.game.interval);
        clearTimeout(window.game.timeout);
        window.game.startTurns();
      }
    }
    // this.tank.render(this.ctx, this.ctxTerrain);
    // this.tank2.render(this.ctx, this.ctxTerrain);


    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.ctx);
      if (this.objects[i] && (Math.abs(this.objects[i].x) > 2000 || Math.abs(this.objects[i].y) > 2000)) {
        this.objects.splice(i, 1);

        document.getElementById('overlay').classList.add('hidden'); //ss shot overlay

        window.game.time = window.game.TIMEOUT;
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.startTurns();
      }
    }

    document.getElementById('angle-display').innerHTML = this.currentTank.angle;
  }

  startTurns () {
    window.UI.disabled = false;
    window.removeEventListener('keypress', this.shotKeys);
    window.removeEventListener('keypress', this.shotKeyss);
    if (this.turnCounter === 1) window.tanks = window.tanks.sort((a,b) => a.delay - b.delay);

    this.currentTank = window.tanks[0]; //change turn
    this.currentTank.delay = 0;

    const shotKey = (e) => { e.key;
      if (e.key == '1') this.currentTank.switchShot1(); //switch shot event listener
      if (e.key == '2') this.currentTank.switchShot2(); //switch shot event listener
    };

    const shotKeyss = (e) => {
      const keyPress = e.key;
      if (e.key == '3' && this.currentTank.ssCooldown <= 0) this.currentTank.switchShotss(); //switch shot event listener
    };
    console.log('turn',this.turnCounter);
    console.log('round', this.roundCounter);
    console.log(window.tanks.length);

    if (this.roundCounter !== 0 && this.roundCounter % 3 === 0 && this.turnCounter === 1) { //change wind every 3 rounds
      this.stage.changeWind();
      console.log('WIND CHANGE');
    }


    document.getElementById('turn-queue').innerHTML = '';
    for (let i = 1; i < window.tanks.length+1; i++) { //print queue
      let li = document.createElement('li');
      li.innerHTML = `${window.tanks[i-1].username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${window.tanks[i-1].delay}`;
      document.getElementById('turn-queue').appendChild(li);
    }

    window.addEventListener('keypress', shotKey);
    document.getElementById('shot1').onclick = this.currentTank.switchShot1; //switch shot event listener
    document.getElementById('shot2').onclick = this.currentTank.switchShot2; //switch shot event listener
    if (this.currentTank.ssCooldown <= 0) {

      window.addEventListener('keypress', shotKeyss);
      document.getElementById('ss').onclick = this.currentTank.switchShotss; //switch shot event listener
      document.getElementById('ss').style.background = 'rgb(246, 216, 89)'; //switch shot event listener
    } else {
      document.getElementById('ss').style.background = 'rgb(60,60,60)'; //switch shot event listener
    }

    this.currentTank.turnOver = false;

    window.tanks.push(window.tanks.shift()); //queue next turn

    if (this.turnCounter % window.tanks.length === 0) { //if last turn inc round and reset turns
      this.roundCounter++;
      this.turnCounter = 1;
      console.log('end round',window.tanks);

    } else { //otherwise inc turns
      this.turnCounter++;
    }


    this.interval = setInterval (() => {
      document.getElementById('main-timer').innerHTML = this.time;
      if (this.currentTank.turnOver) {
        console.log('interval');
        clearInterval(this.interval);
        this.time = this.TIMEOUT;
        clearTimeout(this.timeout);
      } else {
        this.currentTank.delay += 10;
        this.time--;
      }
    }, 1000);

    this.timeout = setTimeout (() => {
      console.log('timeout');
      this.time = this.TIMEOUT;
      // window.tanks.push(window.tanks.shift());
      clearInterval(this.interval);
      this.startTurns();
    }, this.TIMEOUT*1000);



  }
  // let imageData = ctx.getImageData(0,0,1,1);

  // function get_pixel(x, y, canvasData, offsetX, offsetY) {
  //
  //     x = x + offsetX;
  //     y = y + offsetY;
  //     console.log(canvasData);
  //     console.log(offsetX);
  //     console.log(canvasData.width);
  //
  //     if (x < 0 || y < 0 || x > canvasData.width || y > canvasData.height) return;
  //
  //     var r = (y * canvasData.width + x) * 4;
  //     var g = (y * canvasData.width + x) * 4 + 1;
  //     var b = (y * canvasData.width + x) * 4 + 2;
  //     var a = (y * canvasData.width + x) * 4 + 3;
  //
  //     console.log(r);
  //     console.log(canvasData.data);
  //
  //     return "RGBA(" + canvasData.data[r] + "," + canvasData.data[g] + "," + canvasData.data[b] + "," + canvasData.data[a] + ")";
  // }


  // console.log(get_pixel(0,0,imageData,100, 100));
  over (tank) {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.time = "";
    window.UI.ctx.font = "80px sans-serif";
    window.UI.ctx.fillStyle = 'red';
    window.UI.ctx.fillText(`${tank.username} Wins!`, this.can.width/2-260, this.can.height/2-200);
  }

}

export default Game;



// Run Game script
document.addEventListener('DOMContentLoaded', () => {


  let game = new Game;
  window.stage = game.stage;
  let canvas = document.getElementById('ui-canvas');
  let timer = document.createElement('div');
  timer.id = 'main-timer';
  document.getElementsByClassName('main')[0].insertBefore(timer, canvas);
  game.startTurns();



  const gameLoop = () => {
    game.render();
    if (window.tanks.length === 1) {
      game.render();
      game.over(window.tanks[0]);
    } else {
      window.requestAnimationFrame(gameLoop);
    }

  };


  window.requestAnimationFrame(gameLoop);
});
