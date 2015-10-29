var WIDTH, HEIGHT, FPS, engine, mainMenu, animate;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;
FPS = 60;
engine = new Engine('game', WIDTH, HEIGHT, FPS);
engine.init();
mainMenu = new MainMenu({
  width: WIDTH,
  height: HEIGHT
}, engine);
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
