var AI = {};

// Simply follows the ball at all times
AI.easy = function(player, ball) {
  'use strict';
  var newY;
  newY = ball.y - (player.paddle.y + player.paddle.height / 2);
  if (newY < 0 && newY < -4) {
    newY = -5;
  } else if (newY > 0 && newY > 4) {
    newY = 5;
  }

  return newY;
};

// Follows the ball only when in its half, otherwise stay put
AI.medium = function(player, ball, canvasWidth, canvasHeight) {
  'use strict';
  var newY;
  // If ball is moving towards computer
  if (ball.xSpeed > 0 && ball.x > (canvasWidth / 1.75)) {
    // Follow the ball
    newY = ball.y - (player.paddle.y + player.paddle.height / 2);
    if (newY < 0 && newY < -4) {
      newY = -5.5;
    } else if (newY > 0 && newY > 4) {
      newY = 5.5;
    }
  } else {
    newY = 0;
  }

  return newY;
};

// Predict where the ball is going to land
AI.hard = function(player, ball, canvasWidth, canvasHeight) {
  'use strict';
  var newY;
  return newY;
};
