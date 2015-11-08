var Game = Game || {};

Game.getRandomInt = function(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min)) + min;
};

Game.Ball = function(options) {
  'use strict';
  this.x = options.x || 640;
  this.y = options.y || 320;
  this.radius = options.radius || 10;
  this.xSpeed = options.xSpeed || -4;
  this.ySpeed = options.ySpeed || Game.getRandomInt(-2, 2);
  this.colour = options.colour || 'skyblue';
};

Game.Ball.prototype.getBBox = function() {
  'use strict';
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2
  };
};

Game.Ball.prototype.render = function(context) {
  'use strict';
  context.beginPath();
  context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
  context.fillStyle = this.colour;
  context.fill();
};

Game.Ball.prototype.update = function() {
  'use strict';
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};
