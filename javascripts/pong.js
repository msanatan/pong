(function() {
  'use strict';
  var canvas = document.getElementById('game');
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  var ctx = canvas.getContext('2d');
  var FPS = 1000 / 60;

  var Paddle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xSpeed = 0;
    this.ySpeed = 0;
  };

  Paddle.prototype.render = function() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  var clear = function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };

  var update = function() {

  };

  var render = function () {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  };

  var step = function() {
    update();
    render();
    requestAnimationFrame(FPS);
  }

  requestAnimationFrame(step());
})();
