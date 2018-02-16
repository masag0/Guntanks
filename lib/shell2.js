import Shell from './shell';
import Game from './guntanks.js';
import UI from './ui.js';
import Stage from './stage.js';

class Shell2 extends Shell {
  constructor (x, y, xVel, yVel, ctx, ctxTerrain) {
    super();
    this.x = x;
    this.y = y+10;
    this.xVel = xVel;
    this.yVel = yVel;
    this.time = 0;
    this.radius = 7;
    this.ctx = ctx;
    this.weight = 0.08;
    this.damage = 240;
    this.hitObject = null;
    this.explosionRadius = 35;
    this.color = 'red';
    this.ctxTerrain = ctxTerrain;

    this.windAngle = window.stage.windAngle;
    this.windSpeed = window.stage.windSpeed;
  }
}

export default Shell2;