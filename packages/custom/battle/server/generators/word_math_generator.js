'use strict';

var names = ['Mark', 'Thomas', 'Charles', 'Aaron'];
var nouns = ['apples', 'pineapples', 'watermelons'];
var verbMapping = [
  [ 'eats', '-' ],
  [ 'buys', '+' ]
];

function randomNoun() {
  return nouns[Math.floor(Math.random() * nouns.length)];
}

function randomVerbMapping() {
  return verbMapping[Math.floor(Math.random() * verbMapping.length)];
}

function randomName() {
  return names[Math.floor(Math.random() * names.length)];
}

function sentence(verb, numberOne, numberTwo) {
  var noun = randomNoun();
  return 'If ' + randomName() + ' has ' + numberOne + ' ' +  noun + ' and ' + verb + ' ' + numberTwo + ' of them. How many does he have left? ';
}

function makeEasyProblem() {
  var problem = {};
  var verbs = randomVerbMapping();

  var one = Math.floor((Math.random() * 39) + 1);
  var two = Math.floor((Math.random() * one) + 1);

  switch(verbs[1]) {
    case '-':
      problem.answer = one - two;
      break;
    case '+':
      problem.answer = one + two;
      break;
  }

  problem.text = sentence(verbs[0], one, two);

  return problem;
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