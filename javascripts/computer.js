var Computer;

Computer = function(options) {
  var playerWidth, playerHeight, paddle;
  this.canvasWidth = options.canvasWidth || 1280;
  this.canvasHeight = options.canvasHeight || 640;
  this.difficulty = options.difficulty;
  this.ai = new AI(options.baseSpeed);
  paddle = {
    x: options.paddle.x || this.canvasWidth - 10 - options.paddle.width,
    y: options.paddle.y || this.canvasHeight / 2 - (options.paddle.height / 2),
    width: options.paddle.width || 10,
    height: options.paddle.height || 100
  };
  this.paddle = new Paddle(paddle);
  this.score = 0;
  this.scoreX = options.score.x || this.canvasWidth / 2;
  this.scoreY = options.score.y || this.canvasWidth / 10;
  this.colour = options.colour || '#FFFFFF';
};

Computer.prototype.render = function(context) {
  this.paddle.render(context);

  // Print score on screen
  context.font = 'bold 80px Helvetica, Verdana, san-serif';
  context.fillStyle = this.colour;
  context.fillText(this.score, this.scoreX, this.scoreY);
};

Computer.prototype.update = function(ball) {
  var newY, environment;
  environment = {
    ball: ball,
    player: this
  };
  newY = this.ai[this.difficulty](environment);
  this.paddle.move(0, newY, this.canvasHeight);
};
