var Game;

Game = function(options) {
  'use strict';
  var ball, playerWidth, playerHeight, player1, player2;
  this.width = options.width || 1280;
  this.height = options.height || 640;
  this.twoPlayer = options.twoPlayer;

  playerWidth = options.players.width || 10;
  playerHeight = options.players.height || 100;
  player1 = {
    canvasWidth: this.width,
    canvasHeight: this.height,
    paddle : {
      x: 10,
      y: this.height / 2 - (playerHeight / 2),
      width: playerWidth,
      height: playerHeight
    },
    keys: {
      UP: 'W',
      DOWN: 'S'
    },
    score: {
      x: (this.width / 2) - 100,
      y: 80
    }
  };
  this.player1 = new Player(player1);

  player2 = {
      canvasWidth: this.width,
      canvasHeight: this.height,
      paddle : {
        x: this.width - 10 - playerWidth,
        y: this.height / 2 - (playerHeight / 2),
        width: playerWidth,
        height: playerHeight
      },
      score: {
        x: (this.width / 2) + 50,
        y: 80
      }
    };
  if (!this.twoPlayer) {
    player2.baseSpeed = options.baseSpeed || 5;
    player2.difficulty = options.difficulty || 'easy';
    this.player2 = new Computer(player2);
  } else {
    player2.keys = {
      UP: 'UP',
      DOWN: 'DOWN'
    };
    this.player2 = new Player(player2);
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
    if (this.twoPlayer) {
      this.player2.update(inputHandler);
    } else {
      this.player2.update(this.ball);
    }
  }
};

Game.prototype.render = function(context) {
  'use strict';
  var textMeasure;
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
    context.font = 'bold 120px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FFDD88';
    textMeasure = context.measureText('Paused').width;
    context.fillText('Paused', (this.width / 2) - (textMeasure / 2), this.height / 2);
  }

  this.player1.render(context);
  this.player2.render(context);
  this.ball.render(context);
};
