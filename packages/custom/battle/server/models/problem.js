'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// A crappy state array for the question status
var questionStatus = [
  'not_answered',
  'answered'
];

/**
 * User Schema
 */

var ProblemSchema = new Schema({
    type: String,

    /*
    * I am going to store this as a string so we don't constrain ourselves 
    * to just math problems.
    */
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    // answered or not...
    status: {
      type: Number,
      default: 0
    }
});

/**
 * Methods that will exist on each instance
 */
ProblemSchema.methods = {
  isCorrect: function(query) {
    return query === this.answer;
  },

  isAnswered: function() {
    return questionStatus[this.status] === 'answered';
  },

  // A function to select parts of the model to display
  toJSON: function() {
    return { type: this.type, question: this.question, id: this._id.valueOf() };
  }
};

mongoose.model('Problem', ProblemSchema);