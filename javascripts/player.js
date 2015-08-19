var Player;

Player = function(canvasWidth, canvasHeight) {
  var playerWidth, playerHeight, paddle;
  playerHeight = 100;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  paddle = {
    x: 10,
    y: this.canvasHeight / 2 - (playerHeight / 2),
    width: 10,
    height: playerHeight
  };
  this.paddle = new Paddle(paddle);
  this.score = 0;
};

Player.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = '#FFFFFF';
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
