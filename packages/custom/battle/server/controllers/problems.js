'use strict';

var mongoose = require('mongoose'),
    Problem = mongoose.model('Problem'),
    // async = require('async'),
    mathGenerator = require('../generators/math_generator.js');

var registeredGenerators = {
  'math': mathGenerator
};

// '/problems/generate/:type'
exports.generate = function(req, res) {
  var type = req.params.type;

  if(registeredGenerators[type] !== undefined) {
    var problem = registeredGenerators[type].generate('easy');

    var dbProblem = new Problem({ question: problem.question, answer: problem.answer, type: type });

    dbProblem.save(function(err) {
      if (err) {
        res.status(500).json(dbProblem);
        return;
      }
      res.json(dbProblem.toJSON());
    });
  } else {
    // type not found, 404 and out
    res.status(404).end();
  }
};

// exports.gene