var Game = Game || {};

Game.MainMenu = function(options, engine) {
  'use strict';
  var menu;
  menu = {
    title: {
      text: 'Yet Another Pong Clone',
      font: 'bold 65px Monaco, Courier New, monospace',
      colour: '#FFFFFF'
    },
    items: [
      {
        text: '1P',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: {
          width: options.width,
          height: options.height,
          baseSpeed: options.baseSpeed,
          callback: options.callback
        }
      },
      {
        text: '2P',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: {
          width: options.width,
          height: options.height,
          baseSpeed: 5,
          twoPlayer: true,
          players : {}
        }
      },
      {
        text: 'Settings',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: {}
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
  Game.Menu.call(this, menu);
  this.callback = function() {
    if (this.selectedItem === 0) {
      engine.switchScreens(new Game.OnePlayerMenu(this.items[this.selectedItem].newScreen, engine));
    }
    else if (this.selectedItem === 1) {
      engine.switchScreens(new Game.Pong(this.items[this.selectedItem].newScreen));
    }
  };
};
Game.MainMenu.prototype = Object.create(Game.Menu.prototype);
Game.MainMenu.constructor = Game.Menu;
