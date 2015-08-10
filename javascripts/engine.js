var GameEngine, canvas, WIDTH, HEIGHT, engine, game, update, render, step, animate;

GameEngine = function(canvas, width, height, FPS) {
  this.canvas = canvas;
  this.canvas.width = width;
  this.canvas.height = height;
  this.FPS = FPS;
  this.ctx = this.canvas.getContext('2d');
  this.keysDown = {};
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
game = new Game(engine.canvas.width, engine.canvas.height);

window.addEventListener('keydown', function(event) {
  engine.keysDown[event.keyCode] = true;
});

window.addEventListener('keyup', function(event) {
  delete engine.keysDown[event.keyCode];
});

window.addEventListener('mouseover', function(event) {
});

window.addEventListener('click', function(event) {
});

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
