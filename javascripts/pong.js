(function() {
  'use strict';
  var canvas, WIDTH, HEIGHT, ctx, FPS, keysDown, animate, Paddle, Player,
    Computer, Ball, player, computer, ball, checkCollision, update, render,
    step;

  canvas = document.getElementById('game');
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');
  FPS = 1000 / 60;
  keysDown = {};

  window.addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
  });

  window.addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
  });

  animate = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, FPS);
      };

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

  Paddle.prototype.render = function() {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  Player = function() {
    var playerHeight = 100;
    this.paddle = new Paddle(10, HEIGHT / 2 - (playerHeight / 2), 10, playerHeight);
    this.score = 0;
  };

  Player.prototype.render = function() {
    this.paddle.render();

    // Print score on screen
    ctx.font = 'bold 80px Helvetica, Verdana, san-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.score, (WIDTH / 2) - 80, 80);
  };

  Player.prototype.update = function() {
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

  Computer = function() {
    var playerWidth, playerHeight;
    playerWidth = 10;
    playerHeight = 100;
    this.paddle = new Paddle(WIDTH - 10 - playerWidth, HEIGHT / 2 - (playerHeight / 2), playerWidth, playerHeight);
    this.score = 0;
  };

  Computer.prototype.render = function() {
    this.paddle.render();

    // Print score on screen
    ctx.font = 'bold 80px Helvetica, Verdana, san-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.score, (WIDTH / 2) + 40, 80);
  };

  Computer.prototype.automove = function(ball) {
    var y, diff;
    y = ball.y;
    diff = -((this.paddle.y + this.paddle.height / 2) - y);
    if (diff < 0 && diff < -4) {
      diff = -5;
    } else if (diff > 0 && diff > 4) {
      diff = 5;
    }

    this.paddle.move(0, diff);
  };

  Computer.prototype.update = function() {
    this.automove(ball);
  };

  Ball = function(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = -3;
    this.ySpeed = 0;
  };

  Ball.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = 'skyblue';
    ctx.fill();
  };

  Ball.prototype.update = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  };

  // Game logic begins here
  player = new Player();
  computer = new Computer();
  ball = new Ball(WIDTH / 2, HEIGHT / 2, 10);

  checkCollision = function() {
    //Determine if point was scored
    if (ball.x < 0 || ball.x > WIDTH) {
      if (ball.x < 0) {
        computer.score += 1;
        ball.xSpeed = -3;
      }
      else if (ball.x > WIDTH) {
        player.score += 1;
        ball.xSpeed = 3;
      }

      ball.x = WIDTH / 2;
      ball.y = HEIGHT / 2;
      ball.ySpeed = 0;
    }

    // Determine if ball the top or bottom
    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.ySpeed = -ball.ySpeed;
    } else if (ball.y + ball.radius >= HEIGHT) {
      ball.y = HEIGHT - ball.radius;
      ball.ySpeed = -ball.ySpeed;
    }

    // Determine if ball hits player or computer
    if ((ball.x <= player.paddle.x + player.paddle.width) && (ball.y <= player.paddle.y + player.paddle.height && ball.y >= player.paddle.y)) {
      ball.xSpeed = -(ball.xSpeed - 0.5);
      ball.x += ball.xSpeed;
      ball.ySpeed += player.paddle.ySpeed / 2;
    }
    else if ((ball.x + ball.radius >= computer.paddle.x) && (ball.y <= computer.paddle.y + computer.paddle.height && ball.y >= computer.paddle.y)) {
      ball.xSpeed = -(ball.xSpeed + 0.5);
      ball.x += ball.xSpeed;
      ball.ySpeed += computer.paddle.ySpeed / 2;
    }
  };

  update = function() {
    ball.update();
    checkCollision();
    player.update();
    computer.update();
  };

  render = function () {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // Draw separating line
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    player.render();
    computer.render();
    ball.render();
  };

  step = function() {
    update();
    render();
    animate(step);
  };

  animate(step);
})();
