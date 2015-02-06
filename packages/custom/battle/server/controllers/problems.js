'use strict';

var mongoose = require('mongoose'),
    Problem = mongoose.model('Problem'),
    // async = require('async'),
    mathGenerator = require('../generators/math_generator.js'),
    wordMathGenerator = require('../generators/word_math_generator.js');


var registeredGenerators = {
  'math': mathGenerator,
  'word_math': wordMathGenerator
};

// '/problems/generate/:type'
exports.generate = function(req, res) {
  var type = req.params.type;

  if(registeredGenerators[type] !== undefined) {
    var problem = registeredGenerators[type].generate('easy');

    var dbProblem = new Problem({ question: problem.question, answer: problem.answer, type: type });

    dbProblem.save(function(err) {
      if (err) {
        res.status(500).json(dbProblem.toJSON());
        return;
      }
      res.json(dbProblem.toJSON());
    });
  } else {
    // type not found, 404 and out
    res.status(404).end();
  }
};

exports.attempt = function(req, res) {
  var id = req.body.id
  var answer = req.body.answer

  Problem.findById(id, function(err, problem) {
    if(err) {
      res.status(404).end();
      return;
    } else {
      // ML TODO: this should probably be cleaned up at some point. I dislike callbacks like this
      problem.attempt(answer, function(err, result) {
        if(err) {
          res.status(500).json({ message: err.message });
        } else {
          res.json({ result: result });
        }
      });
    }
  });
};




