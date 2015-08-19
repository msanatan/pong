var Computer;

Computer = function(canvasWidth, canvasHeight, ai) {
  var playerWidth, playerHeight, paddle;
  playerWidth = 10;
  playerHeight = 100;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.ai = ai;
  paddle = {
    x: this.canvasWidth - 10 - playerWidth,
    y: this.canvasHeight / 2 - (playerHeight / 2),
    width: playerWidth,
    height: playerHeight
  }
  this.paddle = new Paddle(paddle);
  this.score = 0;
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = '#FFFFFF';
  context.fillText(this.score, (this.canvasWidth / 2) + 40, 80);
};

Computer.prototype.update = function(player, ball) {
  var newY;
  newY = this.ai.easy(player, ball);
  this.paddle.move(0, newY, this.canvasHeight);
};
