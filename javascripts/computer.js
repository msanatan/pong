Computer = function() {
  var playerWidth, playerHeight;
  playerWidth = 10;
  playerHeight = 100;
  this.paddle = new Paddle(WIDTH - 10 - playerWidth,
                           HEIGHT / 2 - (playerHeight / 2),
                           playerWidth, playerHeight);
  this.score = 0;
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = '#FFFFFF';
  context.fillText(this.score, (WIDTH / 2) + 40, 80);
};

Computer.prototype.update = function(ai, player, ball) {
  var newY;
  newY = ai.easy(player, ball);
  this.paddle.move(0, newY);
};
