'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'apiFetch',
    function($scope, $rootScope, Global, Battle, apiFetch) {
      $scope.state = {
        'start': true,
        'battle': false,
        'success': false,
        'failure': false
      };

      $scope.problem = {
        question: 'temp'
      };

      $scope.chooseDifficulty = function(diff) {
        $scope.difficulty = diff;
        $scope.switchState('battle');
      };

      $scope.fetchProblem = function() {
        $scope.user_attempt = "";
        apiFetch.fetchProblem('easy', 'math', function(p) {
          $scope.problem = p;
        });
      };

      $scope.nextProblem = function() {
        $scope.fetchProblem();
        $scope.switchState('start');
      };

      $scope.attempt = function() {
        var attempt = $scope.user_attempt;

        apiFetch.submitAttempt($scope.problem.id, attempt, function(result) {
          if(result.result) {
            $scope.result = "Correct!";
            $scope.switchState('success');
          } else {
            $scope.result = "Incorrect. Please try again.";
            $scope.switchState('failure');
          }
          $scope.attempted = true; // I feel like this should be in a state machine
        });
      };

      $scope.fetchProblem();

      $scope.switchState = function(state) {
        var keys = Object.keys($scope.state);
        for(var i = 0; i < keys.length; i++) {
            $scope.state[keys[i]] = false; // make them all false
        }

        $scope.state[state] = true; // switch states
      };
    }
]);
