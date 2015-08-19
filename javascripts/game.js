var Game;

Game = function(options) {
  'use strict';
  var baseSpeed, difficulty, ball;
  this.width = options.width || 1280;
  this.height = options.height || 640;

  this.player1 = new Player(this.width, this.height);
  console.log(options.twoPlayer);
  if (!options.twoPlayer) {
    baseSpeed = options.baseSpeed || 5;
    this.ai = new AI(baseSpeed);
    difficulty = options.difficulty || 'easy';
    this.player2 = new Computer(this.width, this.height, this.ai);
  } else {
    this.player2 = new Player(this.width, this.height);
  }

  ball = options.ball ||
    {x: this.width / 2, y: this.height / 2};
  this.ball = new Ball(ball);
  this.pause = false;
};

Game.prototype.checkCollision = function() {
  'use strict';
  //Determine if point was scored
  if (this.ball.x < 0 || this.ball.x > this.width) {
    if (this.ball.x < 0) {
      this.player2.score += 1;
      this.ball.xSpeed = -3;
    }
    else if (this.ball.x > this.width) {
      this.player1.score += 1;
      this.ball.xSpeed = 3;
    }

    this.ball.x = this.width / 2;
    this.ball.y = this.height / 2;
    this.ball.ySpeed = 0;
  }

  // Determine if ball the top or bottom
  if (this.ball.y - this.ball.radius <= 0) {
    this.ball.y = this.ball.radius;
    this.ball.ySpeed = -this.ball.ySpeed;
  } else if (this.ball.y + this.ball.radius >= this.height) {
    this.ball.y = this.height - this.ball.radius;
    this.ball.ySpeed = -this.ball.ySpeed;
  }

  // Determine if ball hits player or computer
  if ((this.ball.x <= this.player1.paddle.x + this.player1.paddle.width) &&
      (this.ball.y <= this.player1.paddle.y + this.player1.paddle.height &&
        this.ball.y >= this.player1.paddle.y)) {
    this.ball.xSpeed = -(this.ball.xSpeed - 0.5);
    this.ball.x += this.ball.xSpeed;
    this.ball.ySpeed += this.player1.paddle.ySpeed / 2;
  }
  else if ((this.ball.x + this.ball.radius >= this.player2.paddle.x) &&
           (this.ball.y <= this.player2.paddle.y + this.player2.paddle.height &&
              this.ball.y >= this.player2.paddle.y)) {
    this.ball.xSpeed = -(this.ball.xSpeed + 0.5);
    this.ball.x += this.ball.xSpeed;
    this.ball.ySpeed += this.player2.paddle.ySpeed / 2;
  }
};

Game.prototype.update = function(inputHandler) {
  'use strict';
  if (inputHandler.pressed && inputHandler.keysDown[inputHandler.KEY.ESC]) {
    this.pause = !this.pause;
  }

  if (!this.pause) {
    this.ball.update();
    this.checkCollision();
    this.player1.update(inputHandler);
    this.player2.update(this.player2, this.ball);
  }
};

Game.prototype.render = function(context) {
  'use strict';
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);
  // Draw separating line
  context.beginPath();
  context.moveTo(this.width / 2, 0);
  context.lineTo(this.width / 2, this.height);
  context.lineWidth = 3;
  context.strokeStyle = '#FFFFFF';
  context.stroke();

  if (this.pause) {
    var textMeasure;
    context.font = 'bold 100px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FFDD88';
    textMeasure = context.measureText('Paused').width;
    context.fillText('Paused', (this.width / 2) - (textMeasure / 2), this.height / 2);
  }

  this.player1.render(context);
  this.player2.render(context);
  this.ball.render(context);
};
