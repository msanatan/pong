var Menu;

Menu = function(title, items, x, y, width, height) {
  'use strict';
  this.title = title;
  this.items = items;
  this.selectedItem = items[0];
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Menu.prototype.render = function(context) {
  'use strict';
  var i, textMeasure, itemY;
  itemY = 50;
  // Background
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);

  // Draw title
  context.font = 'bold 80px Monaco, Courier New, monospace';
  context.fillStyle = '#FFFFFF';
  textMeasure = context.measureText(this.title);
  context.fillText(this.title, (this.width / 2) - (textMeasure.width / 2), 100);

  // Draw items
  for (i = 0; i < this.items.length; i++) {
    if (this.items[i] === this.selectedItem) {
      context.font = 'bold 80px Monaco, Courier New, monospace';
    context.fillStyle = '#FFCC33';
    } else {
      context.font = 'bold 60px Monaco, Courier New, monospace';
    context.fillStyle = '#FFFFFF';
    }
    textMeasure = context.measureText(this.items[i]);
    context.fillText(this.items[i], (this.width / 2) -
                     (textMeasure.width / 2), 200 + itemY);
    itemY += 100;
  }
};

Menu.prototype.update = function() {
};
