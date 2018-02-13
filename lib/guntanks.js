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
const terrainCanvas = document.getElementById('terrain-canvas');
const ctx = can.getContext('2d');
const ctxTerrain = terrainCanvas.getContext('2d');

class Game {
  constructor () {
    this.tank = new Tank(200, 0, ctx, ctxTerrain);
    this.tank2 = new Tank(800, 0, ctx, ctxTerrain);
    this.stage = new Stage(ctxTerrain);
    this.currentTank = this.tank;
    this.can = can;
    this.ctx = ctx;
    this.ctxTerrain = ctxTerrain;

    this.objects = [];
    this.UI = new UI(this);

    this.bindKeys = this.bindKeys.bind(this);

    window.game = this;
    window.tanks = [this.tank, this.tank2];
    window.addEventListener('keydown', this.bindKeys);
    window.addEventListener('keyup', (event) => {
      const keyName = event.key;
      // if (keyName == 'a') tank.move(0);
      // if (keyName == 'd') tank.move(0);
      if (keyName == ' ') this.UI.stopAdjustPower(this.currentTank);
    });

  }



  bindKeys (event) {
    const keyName = event.key;
    if (keyName == 'a') this.tank.move(-1.5, 'left'); //1.5
    if (keyName == 'd') this.tank.move(1.5, 'right');
    if (keyName == 'w') this.tank.changeAngle(2);
    if (keyName == 's') this.tank.changeAngle(-2);
    if (keyName == ' ') this.UI.startAdjustPower();
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



// console.log(Game);
let game = new Game;
window.stage = game.stage;
const gameLoop = () => {
  game.ctx.clearRect(0,0,can.width, can.height);
  window.stage.render(game.ctxTerrain);
  game.tank.render(game.ctx, game.ctxTerrain);
  game.tank2.render(game.ctx, game.ctxTerrain);


  for (let i = 0; i < game.objects.length; i++) {

    game.objects[i].render(game.ctx);
    if (game.objects[i] && (Math.abs(game.objects[i].x) > 1800 || Math.abs(game.objects[i].y) > 1800)) {
      game.objects.splice(i, 1);
    }
  }

  window.requestAnimationFrame(gameLoop);
};


window.requestAnimationFrame(gameLoop);