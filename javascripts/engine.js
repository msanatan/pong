var GameEngine, canvas, WIDTH, HEIGHT, engine, game, update, render, step, animate;

GameEngine = function(canvas, width, height, FPS) {
  'use strict';
  this.canvas = canvas;
  this.canvas.width = width;
  this.canvas.height = height;
  this.FPS = FPS;
};

GameEngine.prototype.init = function() {
  'use strict';
  var engine;
  this.canvas.focus();
  this.ctx = this.canvas.getContext('2d');
  this.keysDown = {};
  this.mouse = {
    x: 0,
    y: 0,
    clicked: false
  };

  engine = this;
  this.canvas.addEventListener('keydown', function(e) {
    engine.keysDown[e.keyCode] = true;
  });

  this.canvas.addEventListener('keyup', function(e) {
    delete engine.keysDown[e.keyCode];
  });

  this.canvas.addEventListener('mouseover', function(e) {
    engine.mouse.x = e.offsetX;
    engine.mouse.y = e.offsetY;
  });

  this.canvas.addEventListener('mousedown', function(e) {
    engine.mouse.clicked = true;
  });

  this.canvas.addEventListener('mouseup', function(e) {
    engine.mouse.clicked = false;
  });
};

/*
var menu, title, mainMenuItems, game;
title = 'Yet Another Pong Clone';
mainMenuItems = ['1P', '2P', 'Settings'];
menu = new Menu(title, mainMenuItems, 0, 0, engine.canvas.width, engine.canvas.height);
*/
canvas = document.getElementById('game');
WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
FPS = 60;
engine = new GameEngine(canvas, WIDTH, HEIGHT, FPS);
engine.init();
game = new Game(engine.canvas.width, engine.canvas.height);

animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  };

update = function(keysDown) {
  game.update(keysDown);
};

render = function(context) {
  game.render(context);
};

step = function() {
  update(engine.keysDown);
  render(engine.ctx);
  animate(step);
};

animate(step);
