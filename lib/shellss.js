import Shell from './shell';
import Game from './guntanks.js';
import UI from './ui.js';
import Stage from './stage.js';

class ShellSS extends Shell {
  constructor (x, y, xVel, yVel, ctx, ctxTerrain) {
    super();
    this.x = x;
    this.y = y+10;
    this.xVel = xVel;
    this.yVel = yVel;
    this.time = 0;
    this.radius = 10;
    this.ctx = ctx;
    this.weight = 0.08;
    this.damage = 350;
    this.hitObject = null;
    this.explosionRadius = 70;
    this.color = 'rgb(255, 236, 130)';
    this.ctxTerrain = ctxTerrain;

    this.windAngle = window.stage.windAngle;
    this.windSpeed = window.stage.windSpeed;
  }
}

export default ShellSS;