var OnePlayerMenu = function(options, engine) {
  'use strict';
  var menu;
  menu = {
    title: {
      text: 'Select Difficulty',
      font: 'bold 65px Monaco, Courier New, monospace',
      colour: '#FFFFFF'
    },
    items: [
      {
        text: 'Easy',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: {
          width: options.width,
          height: options.height,
          baseSpeed: options.baseSpeed,
          twoPlayer: false,
          players : {},
          difficulty: 'easy'
        }
      },
      {
        text: 'Medium',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: {
          width: options.width,
          height: options.height,
          baseSpeed: options.baseSpeed,
          twoPlayer: false,
          players : {},
          difficulty: 'medium'
        }
      }
    ],
    selected: {
      font: 'bold 55px Monaco, Courier New, monospace',
      colour: '#FFCC33'
    },
    x: 0,
    y: 0,
    width: options.width || 1280,
    height: options.height || 640,
    backgroundColour: '#000000',
    itemSeparator: 100,
  };
  Menu.call(this, menu);
  this.callback = function() {
    engine.switchScreens(new Game(this.items[this.selectedItem].newScreen));
  };
};
OnePlayerMenu.prototype = Object.create(Menu.prototype);
OnePlayerMenu.constructor = Menu;
