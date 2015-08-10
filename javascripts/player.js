Player = function(canvasWidth, canvasHeight) {
  var playerHeight = 100;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.paddle = new Paddle(10, this.canvasHeight / 2 - (playerHeight / 2), 10,
                           playerHeight);
  this.score = 0;
};

Player.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = '#FFFFFF';
  context.fillText(this.score, (this.canvasWidth / 2) - 80, 80);
};

Player.prototype.update = function(keysDown) {
  var key, value;
  for (key in keysDown) {
    value = parseInt(key, 10);
    switch(value) {
      case 87: //W
        this.paddle.move(0, -5);
        break;
      case 83: //S
        this.paddle.move(0, 5);
        break;
      default:
        break;
    }
  }
};
