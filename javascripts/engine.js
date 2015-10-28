var Engine, WIDTH, HEIGHT, FPS, engine, mainMenu, step;

Engine = function(canvasID, width, height, FPS) {
  'use strict';
  this.canvas = document.getElementById(canvasID);
  this.canvas.width = width;
  this.canvas.height = height;
  this.FPS = FPS;
};

Engine.prototype.init = function() {
  'use strict';
  this.canvas.focus();
  this.ctx = this.canvas.getContext('2d');
  this.inputHandler = new InputHandler();
  this.inputHandler.register(this.canvas);
};

Engine.prototype.register = function(screen) {
  'use strict';
  this.screen = screen;
};

Engine.prototype.update = function() {
  'use strict';
  this.inputHandler.update();
  this.screen.update(this.inputHandler);
};

Engine.prototype.render = function() {
  'use strict';
  this.screen.render(this.ctx);
};

Engine.prototype.stop = function() {
  this.screen = null;
};

Engine.prototype.switchScreens = function(newScreen) {
  this.stop();
  this.inputHandler.reset();
  this.register(newScreen);
};

Engine.prototype.step = function() {
  'use strict';
  engine.update();
  engine.render();
};

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
FPS = 60;
engine = new Engine('game', WIDTH, HEIGHT, FPS);
engine.init();
mainMenu = MainMenu({
  width: WIDTH,
  height: HEIGHT,
  callback: engine.switchScreens.bind(engine)
});
engine.register(mainMenu);


animate = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / this.FPS);
  });

(function() {
  function main() {
    animate(main);
    engine.step();
  };
  main();
})();
