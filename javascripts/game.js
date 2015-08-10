var Game;

Game = function(width, height) {
  'use strict';
  this.width = width;
  this.height = height;
  this.ai = new AI(5);
  this.player = new Player(width, height);
  this.computer = new Computer(width, height);
  this.ball = new Ball(width / 2, height / 2, 10);
};

Game.prototype.checkCollision = function() {
  'use strict';
  //Determine if point was scored
  if (this.ball.x < 0 || this.ball.x > this.width) {
    if (this.ball.x < 0) {
      this.computer.score += 1;
      this.ball.xSpeed = -3;
    }
    else if (this.ball.x > this.width) {
      this.player.score += 1;
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
  if ((this.ball.x <= this.player.paddle.x + this.player.paddle.width) &&
      (this.ball.y <= this.player.paddle.y + this.player.paddle.height &&
        this.ball.y >= this.player.paddle.y)) {
    this.ball.xSpeed = -(this.ball.xSpeed - 0.5);
    this.ball.x += this.ball.xSpeed;
    this.ball.ySpeed += this.player.paddle.ySpeed / 2;
  }
  else if ((this.ball.x + this.ball.radius >= this.computer.paddle.x) &&
           (this.ball.y <= this.computer.paddle.y + this.computer.paddle.height &&
              this.ball.y >= this.computer.paddle.y)) {
    this.ball.xSpeed = -(this.ball.xSpeed + 0.5);
    this.ball.x += this.ball.xSpeed;
    this.ball.ySpeed += this.computer.paddle.ySpeed / 2;
  }
};

Game.prototype.update = function(keysDown) {
  'use strict';
  this.ball.update();
  this.checkCollision();
  this.player.update(keysDown);
  this.computer.update(this.ai, this.computer, this.ball);
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

  this.player.render(context);
  this.computer.render(context);
  this.ball.render(context);
};
