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


import Stage from './stage';
import Tank from './tank';

const can = document.getElementById('canvas');
const ctx = can.getContext('2d');


let tank = new Tank(200,0, ctx);
let stage = new Stage();

window.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName == 'a') tank.move(-1.5);
  if (keyName == 'd') tank.move(1.5);

});
// window.addEventListener('keyup', (event) => {
//   const keyName = event.key;
//   if (keyName == 'a') tank.move(0);
//   if (keyName == 'd') tank.move(0);
//
// });

// const bindKeyHandlers = function () {
//   let that = this;
//   key('a', function (-0.5) {
//     tank.move();
//   });
//   key('s', function () {
//     tank.move();
//   });
//   key('d', function (0.5) {
//     tank.move();
//   });
//   key('w', function () {
//     tank.move();
//   });
  // key('space', function () {
  //   tank.fireBullet();
  // });
// };





setInterval( () => {
  ctx.clearRect(0,0,can.width, can.height);
  stage.render(ctx);
  tank.render(ctx);

}, 1000/60);







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
