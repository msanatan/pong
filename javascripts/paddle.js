// Define game objects, i.e paddle and ball
Paddle = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xSpeed = 0;
  this.ySpeed = 0;
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.xSpeed = x;
  this.ySpeed = y;

  // Prevent paddle from moving out of bounds
  if (this.y <= 0) {
    this.y = 0;
    this.ySpeed = 0;
  } else if (this.y + this.height >= HEIGHT) {
    this.y = HEIGHT - this.height;
    this.ySpeed = 0;
  }
};

Paddle.prototype.render = function(context) {
  context.fillStyle = '#FFFFFF';
  context.fillRect(this.x, this.y, this.width, this.height);
};
