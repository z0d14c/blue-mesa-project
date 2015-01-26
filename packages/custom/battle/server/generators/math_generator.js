'use strict';

var _ = require('underscore');

function makeEasyProblem() {
  var problemScope = {};
  var operatorsAvailable = ['+', '-'];
  var numbers = [];
  var operators = [];
  problemScope.answer = 0;
  problemScope.problemText = '';
  numbers[0] = -20 + Math.floor((Math.random() * 39) + 1);
  numbers[1] = -20 + Math.floor((Math.random() * 39) + 1);

  operators[0] = operatorsAvailable[Math.floor((Math.random() * 2) + 1)];

  // if (num == 2) {
  //     operators[1] = operatorsAvailable[Math.floor((Math.random() * 2) + 1)];
  //     numbers[2] = -20 + Math.floor((Math.random() * 39) + 1);
  // }

  _.each(numbers, function (numVal, numIdx) {
      problemScope.answer += numVal;
  });

  problemScope.text = numbers.join(" + ");
  problemScope.text += " = ?";

  return problemScope;
}

// function makeMediumProblem() {
  
// }

// function makeHardProblem() {

// }

/* 
* Will generate a math problem with an associated difficulty.
*
* Returns:
*   A hash with two keys. Question and answer to store in the database
*/
exports.generate = function(difficulty) {
  var problem = {};

  switch(difficulty) {
    case 'easy':
      problem = makeEasyProblem();
      break;
    case 'medium':
      break;
    case 'hard':
      break;
  }

  return { question: problem.text, answer: problem.answer };
};