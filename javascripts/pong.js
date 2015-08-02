(function() {
  'use strict';
  var canvas = document.getElementById('game');
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  var FPS = 1000 / 60;

  var clear = function() {
    ctx.clearRect(0, 0, width, height);
  };

  var update = function() {

  };

  var render = function () {

  };

  var step = function() {
    update();
    render();
    requestAnimationFrame(FPS);
  }

  requestAnimationFrame(step());
})();
