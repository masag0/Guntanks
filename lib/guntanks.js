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
const canUI = document.getElementById('ui-canvas');
const ctxUI = canText.getContext('2d');


class Game {
  constructor () {
    this.tank = new Tank(200, 0, ctx, ctxTerrain);
    this.tank2 = new Tank(800, 0, ctx, ctxTerrain);
    this.currentTank = this.tank2;
    this.can = can;
    this.ctx = ctx;
    this.ctxTerrain = ctxTerrain;
    this.canTerrain = canTerrain;
    this.stage = new Stage(this.ctxTerrain, this.canTerrain);
    this.time = 30;

    this.objects = [];
    this.UI = new UI(this);

    this.bindKeys = this.bindKeys.bind(this);

    window.game = this;
    window.tanks = [this.tank, this.tank2];
    window.canText = canText;
    window.ctxText = ctxText;
    window.canUI = canUI;
    window.ctxUI = ctxUI;

    window.addEventListener('keydown', this.bindKeys);

    window.addEventListener('keyup', (event) => {
      const keyName = event.key;
      if (keyName == ' ') this.UI.stopAdjustPower(this.currentTank);
    });
    this.startTurns = this.startTurns.bind(this);
  }



  bindKeys (event) {

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
    window.stage.render(this.ctxTerrain);

    window.UI.ctx.fillStyle = 'rgba(220,190,90,1)'; //turn indicator
    window.UI.ctx.fillRect(this.currentTank.x-15, this.currentTank.y-70, 30, 25);
    window.UI.ctx.strokeStyle = 'rgba(0,0,0,1)';
    window.UI.ctx.strokeRect(this.currentTank.x-15, this.currentTank.y-70, 30, 25);

    window.UI.ctx.font = "20px sans-serif"; //timer text
    window.UI.ctx.fillStyle = 'white';
    window.UI.ctx.fillText(this.time.toString(), this.currentTank.x-11, this.currentTank.y-51);

    window.UI.ctx.beginPath(); //triangle
    window.UI.ctx.moveTo(this.currentTank.x-5, this.currentTank.y-46);
    window.UI.ctx.lineTo(this.currentTank.x, this.currentTank.y-39);
    window.UI.ctx.lineTo(this.currentTank.x+5, this.currentTank.y-46);
    window.UI.ctx.fillStyle = 'rgba(235,200,96,1)';
    window.UI.ctx.fill();
    window.UI.ctx.stroke();
    window.UI.ctx.closePath();

    for (let i = 0; i < window.tanks.length; i++) {
      window.tanks[i].render(this.ctx, this.ctxTerrain);
    }
    // this.tank.render(this.ctx, this.ctxTerrain);
    // this.tank2.render(this.ctx, this.ctxTerrain);


    for (let i = 0; i < this.objects.length; i++) {

      this.objects[i].render(this.ctx);
      if (this.objects[i] && (Math.abs(this.objects[i].x) > 1800 || Math.abs(this.objects[i].y) > 1800)) {
        this.objects.splice(i, 1);
      }
    }

  }

  startTurns () {
    this.currentTank = window.tanks[0];

    this.interval = setInterval (() => {
      document.getElementById('main-timer').innerHTML = this.time;
      this.time--;
    }, 1000);

    setTimeout (() => {
      this.time = 30;
      window.tanks.push(window.tanks.shift());
      clearInterval(this.interval);
      this.startTurns();
    }, 30000);

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

    window.requestAnimationFrame(gameLoop);
  };


  window.requestAnimationFrame(gameLoop);
});
