var Game = Game || {};

Game.Paddle = function(options) {
  'use strict';
  this.x = options.x || 20;
  this.y = options.y || 320;
  this.width = options.width || 10;
  this.height = options.height || 50;
  this.xSpeed = options.xSpeed || 0;
  this.ySpeed = options.ySpeed || 0;
};

Game.Paddle.prototype.move = function(x, y, height) {
  'use strict';
  this.x += x;
  this.y += y;
  this.xSpeed = x;
  this.ySpeed = y;

  // Prevent Game.paddle from moving out of bounds
  if (this.y <= 0) {
    this.y = 0;
    this.ySpeed = 0;
  } else if (this.y + this.height >= height) {
    this.y = height - this.height;
    this.ySpeed = 0;
  }
};

Game.Paddle.prototype.getBBox = function() {
  'use strict';
  return {
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height
  };
};

Game.Paddle.prototype.render = function(context) {
  'use strict';
  context.fillStyle = '#FFFFFF';
  context.fillRect(this.x, this.y, this.width, this.height);
};
