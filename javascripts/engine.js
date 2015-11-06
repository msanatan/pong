var Engine;

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
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.screen.render(this.ctx);
};

Engine.prototype.stop = function() {
  delete this.screen;
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
