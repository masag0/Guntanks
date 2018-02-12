/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stage = __webpack_require__(1);

var _stage2 = _interopRequireDefault(_stage);

var _tank = __webpack_require__(2);

var _tank2 = _interopRequireDefault(_tank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var can = document.getElementById('canvas');
var ctx = can.getContext('2d');

var tank = new _tank2.default(200, 0, ctx);
var stage = new _stage2.default();

window.addEventListener('keydown', function (event) {
  var keyName = event.key;
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


setInterval(function () {
  ctx.clearRect(0, 0, can.width, can.height);
  stage.render(ctx);
  tank.render(ctx);
}, 1000 / 60);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stage = function () {
  function Stage() {
    _classCallCheck(this, Stage);
  }

  _createClass(Stage, [{
    key: "render",
    value: function render(ctx) {
      var img = new Image();
      img.src = "./terrain_hole.png";
      ctx.drawImage(img, 150, 500);
    }
  }, {
    key: "hitBy",
    value: function hitBy(projectile) {}
  }]);

  return Stage;
}();

exports.default = Stage;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tank = function () {
  function Tank(x, y, ctx) {
    _classCallCheck(this, Tank);

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

  _createClass(Tank, [{
    key: 'render',
    value: function render(ctx) {

      this.move();
      // this.x += this.velX;
      this.y += this.velY;
      ctx.fillStyle = 'rgba(255,0,0,1)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
      // ctx.fill();
    }
  }, {
    key: 'hitTest',
    value: function hitTest(x, y, width, height) {
      var array = [];
      for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
          array.push([x + i, y + j]);
        }
      }
      // console.log(array);
      for (var _i = 0; _i < array.length; _i++) {
        // console.log(this.ctx.getImageData(array[i][0],array[i][1],1,1).data);
        if (this.ctx.getImageData(array[_i][0], array[_i][1], 1, 1).data[1] != 0) return true;
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

  }, {
    key: 'move',
    value: function move() {
      var velX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.x += velX;
      // console.log('x',this.x);
      // console.log('y',this.y);
      if (!this.hitTest(this.x, this.y + this.height - 1, this.width, 1)) {
        console.log('falling');
        this.y += 6;
      }
      while (this.hitTest(this.x, this.y + this.height - 1, this.width, 1)) {
        console.log('resting');
        this.y -= 1;
      }
    }
  }]);

  return Tank;
}();

exports.default = Tank;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map