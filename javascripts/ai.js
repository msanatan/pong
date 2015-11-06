var Game = Game || {};

Game.AI = function(baseSpeed) {
  this.baseSpeed = baseSpeed;
};

// Simply follows the ball at all times
Game.AI.prototype.easy = function(options) {
  'use strict';
  var newY;
  newY = options.ball.y - (options.player.paddle.y + options.player.paddle.height / 2);
  if (newY < -4) {
    newY = -this.baseSpeed;
  } else if (newY > 4) {
    newY = this.baseSpeed;
  }

  return newY;
};

// Follows the ball only when in its half, otherwise stay put
Game.AI.prototype.medium = function(options) {
  'use strict';
  var newY;
  // If ball is moving towards computer
  if (options.ball.xSpeed > 0 && options.ball.x > (options.player.canvasWidth / 1.75)) {
    // Follow the ball
    newY = options.ball.y - (options.player.paddle.y + options.player.paddle.height / 2);
    if (newY < -4) {
      newY = -(this.baseSpeed + 0.5);
    } else if (newY > 4) {
      newY = this.baseSpeed + 0.5;
    }
  } else {
    newY = 0;
  }

  return newY;
};

// Predict where the ball is going to land
Game.AI.prototype.hard = function(options) {
  'use strict';
  var newY;
  return newY;
};
