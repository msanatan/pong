(function() {
  'use strict';
  var canvas = document.getElementById('game');
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  var ctx = canvas.getContext('2d');
  var FPS = 1000 / 60;

  // Define game objects, i.e paddle and ball
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
  };

  var Player = function() {
    var playerHeight = 100;
    this.paddle = new Paddle(10, HEIGHT / 2 - (playerHeight / 2), 10, playerHeight);
  };

  Player.prototype.render = function() {
    this.paddle.render();
  };

  var Computer = function() {
    var playerWidth = 10;
    var playerHeight = 100;
    this.paddle = new Paddle(WIDTH - 10 - playerWidth, HEIGHT / 2 - (playerHeight / 2), playerWidth, playerHeight);
  };

  Computer.prototype.render = function() {
    this.paddle.render();
  };

  // Game logic begins here
  var player = new Player();
  var computer = new Computer();

  var clear = function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };

  var update = function() {

  };

  var render = function () {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    player.render();
    computer.render();
  };

  var step = function() {
    update();
    render();
    requestAnimationFrame(FPS);
  }

  requestAnimationFrame(step());
})();
