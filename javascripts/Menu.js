var Game = Game || {};

Game.Menu = function(options) {
  'use strict';
  this.title = options.title;
  this.items = options.items;
  this.selectedItem = 0;
  this.selectedItemStyle = options.selected;
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.backgroundColour = options.backgroundColour;
  this.itemSeparator = options.itemSeparator;
  this.callback = options.callback || function() {};
};

Game.Menu.prototype.render = function(context) {
  'use strict';
  var i, textMeasure, itemY;
  itemY = 50;
  // Background
  context.fillStyle = this.backgroundColour;
  context.fillRect(this.x, this.y, this.width, this.height);

  // Draw title
  context.font = this.title.font;
  context.fillStyle = this.title.colour;
  textMeasure = context.measureText(this.title.text);
  context.fillText(this.title.text, (this.width / 2) - (textMeasure.width / 2), 100);

  // Draw items
  for (i = 0; i < this.items.length; i++) {
    if (i === this.selectedItem) {
      context.font = this.selectedItemStyle.font;
    context.fillStyle = this.selectedItemStyle.colour;
    } else {
      context.font = this.items[i].font;
    context.fillStyle = this.items[i].colour;
    }
    textMeasure = context.measureText(this.items[i].text);
    context.fillText(this.items[i].text, (this.width / 2) -
                     (textMeasure.width / 2), 200 + itemY);
    itemY += this.itemSeparator;
  }
};

Game.Menu.prototype.update = function(inputHandler) {
  var game;
  if (inputHandler.pressed) {
    if (inputHandler.isDown('UP') || inputHandler.isDown('W')) {
      if (this.selectedItem > 0) {
        this.selectedItem -= 1;
      }
  } else if (inputHandler.isDown('DOWN') || inputHandler.isDown('S')) {
      if (this.selectedItem < this.items.length - 1) {
        this.selectedItem += 1;
      }
    } else if (inputHandler.isDown('RTN')) {
      this.callback();
    }
  }
};
