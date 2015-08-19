var GameEngine, WIDTH, HEIGHT, FPS, engine, menu, title, mainMenuItems, step;

GameEngine = function(canvasID, width, height, FPS) {
  'use strict';
  this.canvas = document.getElementById(canvasID);
  this.canvas.width = width;
  this.canvas.height = height;
  this.FPS = FPS;
};

GameEngine.prototype.init = function() {
  'use strict';
  this.canvas.focus();
  this.ctx = this.canvas.getContext('2d');
  this.inputHandler = new InputHandler();
  this.inputHandler.register(this.canvas);
};

GameEngine.prototype.register = function(screen) {
  'use strict';
  this.screen = screen;
};

GameEngine.prototype.update = function() {
  'use strict';
  this.inputHandler.update();
  this.screen.update(this.inputHandler);
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

GameEngine.prototype.stop = function() {
  this.screen = null;
  this.animate(function() {});
};

GameEngine.prototype.switchScreens = function(newScreen) {
  this.stop();
  this.inputHandler.reset();
  this.register(newScreen);
  this.animate.bind(this, step);
};

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
FPS = 60;
engine = new GameEngine('game', WIDTH, HEIGHT, FPS);
engine.init();
title = 'Yet Another Pong Clone';
mainMenuItems = ['1P', '2P', 'Settings'];
menu = new Menu(title, mainMenuItems, 0, 0, engine.canvas.width, engine.canvas.height, engine.switchScreens.bind(engine));
engine.register(menu);

step = function() {
  'use strict';
  engine.update();
  engine.render();
  engine.animate(step);
};

engine.animate(step);
