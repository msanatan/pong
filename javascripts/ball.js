Ball = function(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xSpeed = -3;
  this.ySpeed = 0;
};

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
  context.fillStyle = 'skyblue';
  context.fill();
};

Ball.prototype.update = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};
