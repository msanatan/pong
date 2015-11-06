var Game = Game || {};

Game.Ball = function(options) {
  this.x = options.x || 640;
  this.y = options.y || 320;
  this.radius = options.radius || 10;
  this.xSpeed = options.xSpeed || -3;
  this.ySpeed = options.ySpeed || 0;
  this.colour = options.colour || 'skyblue';
};

Game.Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
  context.fillStyle = this.colour;
  context.fill();
};

Game.Ball.prototype.update = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};
