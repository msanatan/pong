function MainMenu(options) {
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
        newScreen: new Game({
          width: options.width,
          height: options.height,
          baseSpeed: 5,
          twoPlayer: false,
          players : {}
        })
      },
      {
        text: '2P',
        font: 'bold 45px Monaco, Courier New, monospace',
        colour: '#FFFFFF',
        newScreen: new Game({
          width: options.width,
          height: options.height,
          baseSpeed: 5,
          twoPlayer: true,
          players : {}
        })
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
    callback: options.callback || function() {}
  };

  return new Menu(menu);
};
