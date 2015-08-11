var GameEngine, WIDTH, HEIGHT, FPS, engine, game, step;

GameEngine = function(canvasID, width, height, FPS) {
  'use strict';
  this.canvas = document.getElementById(canvasID);
  this.canvas.width = width;
  this.canvas.height = height;
  this.FPS = FPS;
};

GameEngine.prototype.init = function() {
  'use strict';
  var self;
  this.canvas.focus();
  this.ctx = this.canvas.getContext('2d');
  this.keysDown = {};
  this.mouse = {
    x: 0,
    y: 0,
    clicked: false
  };

  this.canvas.addEventListener('keydown', function(e) {
    this.keysDown[e.keyCode] = true;
  }.bind(this));

  this.canvas.addEventListener('keyup', function(e) {
    delete this.keysDown[e.keyCode];
  }.bind(this));

  this.canvas.addEventListener('mouseover', function(e) {
    this.mouse.x = e.offsetX;
    this.mouse.y = e.offsetY;
  }.bind(this));

  this.canvas.addEventListener('mousedown', function(e) {
    this.mouse.clicked = true;
  }.bind(this));

  this.canvas.addEventListener('mouseup', function(e) {
    this.mouse.clicked = false;
  }.bind(this));
};

GameEngine.prototype.register = function(screen) {
  'use strict';
  this.screen = screen;
};

GameEngine.prototype.update = function() {
  'use strict';
  this.screen.update(this.keysDown);
};

GameEngine.prototype.render = function() {
  'use strict';
  this.screen.render(this.ctx);
};

GameEngine.prototype.animate = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  }).bind(this);

/*
var menu, title, mainMenuItems, game;
title = 'Yet Another Pong Clone';
mainMenuItems = ['1P', '2P', 'Settings'];
menu = new Menu(title, mainMenuItems, 0, 0, engine.canvas.width, engine.canvas.height);
*/
WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
FPS = 60;
engine = new GameEngine('game', WIDTH, HEIGHT, FPS);
engine.init();
game = new Game(engine.canvas.width, engine.canvas.height);
engine.register(game);

step = function() {
  'use strict';
  engine.update();
  engine.render();
  engine.animate(step);
};

engine.animate(step);
