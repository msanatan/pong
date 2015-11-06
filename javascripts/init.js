var Game = Game || {};
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var FPS = 60;
var engine = new Game.Engine('game', WIDTH, HEIGHT, FPS);
engine.init();
var mainMenu = new Game.MainMenu({
  width: WIDTH,
  height: HEIGHT
}, engine);
engine.register(mainMenu);

var animate = (window.requestAnimationFrame ||
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
