var Player;

Player = function(options) {
  var paddle;
  this.canvasWidth = options.canvasWidth || 1280;
  this.canvasHeight = options.canvasHeight || 640;
  paddle = {
    x: options.paddle.x || 10,
    y: options.paddle.y || this.canvasHeight / 2 - (options.paddle.height / 2),
    width: options.paddle.width || 10,
    height: options.paddle.height || 100
  };
  this.paddle = new Paddle(paddle);
  this.score = 0;
  this.colour = options.colour || '#FFFFFF';
};

Player.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = this.colour;
  context.fillText(this.score, (this.canvasWidth / 2) - 80, 80);
};

Player.prototype.update = function(inputHandler) {
  if (inputHandler.keysDown[inputHandler.KEY.W]) {
    this.paddle.move(0, -5, this.canvasHeight);
  }
  else if(inputHandler.keysDown[inputHandler.KEY.S]) {
    this.paddle.move(0, 5, this.canvasHeight);
  }
};
