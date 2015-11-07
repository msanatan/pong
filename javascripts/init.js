var Game = Game || {};
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var FPS = 1000 / 30;
var engine = new Game.Engine('game', WIDTH, HEIGHT, FPS);
engine.init();
engine.register(new Game.MainMenu({
  width: WIDTH,
  height: HEIGHT
}, engine));

var animate = (window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function(callback) {
                  window.setTimeout(callback, this.FPS);
                });

(function() {
  function main() {
    animate(main);
    engine.step();
  };
  main();
})();
