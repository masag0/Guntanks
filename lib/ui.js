import Game from './guntanks.js';


class UI {
  constructor (game) {
    this.game = game;
    this.canvas = document.getElementById('ui-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px sans-serif';
    window.UI = this;
  }

  startAdjustPower () {
    const power = document.getElementById('power-fill');
    let width = parseInt(power.style.width.slice(0,-2));
    // console.log(power.style.width);


    if (!this.interval) { //power bar fill
      this.interval = setInterval(
        () => {
          width = parseInt(power.style.width.slice(0,-2));
          if (width < 1000) power.style.width = (width + 5) + 'px';
        }
        , 6);
    }


  }

  stopAdjustPower (tank) {
    clearInterval(this.interval);
    this.interval = null;
    const bar = document.getElementById('power-fill');
    const fullBar = document.getElementById('power-container');
    let power = 100 * (parseInt(bar.style.width.slice(0,-2)) / parseInt(fullBar.style.width.slice(0,-2)));
    setTimeout(() => {
      console.log(power);
      bar.style.width = '10px';
      this.game.addObject(tank.fire(power));
    }, 250);
  }
}


export default UI;