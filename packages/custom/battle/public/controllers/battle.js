'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'apiFetch', '$timeout', 'rng',
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

      $scope.monster = {
        // these will be filled in
      };

      $scope.activityLog = [];

      $scope.chooseDifficulty = function(diff) {
        $scope.difficulty = diff;
        $scope.switchState('battle');
        $scope.activityLog.push('You choose to fight a ' + diff + ' monster');
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
            $scope.activityLog.push('You answered correctly!');
            $scope.switchState('success');
          } else {
            $scope.result = "You answered incorrectly.";
            $scope.switchState('failure');
          }
          $scope.attempted = true; // I feel like this should be in a state machine
          $scope.afterTurn(result.result);
        });
      };

      $scope.fetchProblem();

      // This might have to all be broken into a different controller
      $scope.switchState = function(state) {
        var keys = Object.keys($scope.state);
        for(var i = 0; i < keys.length; i++) {
            $scope.state[keys[i]] = false; // make them all false
        }

        $scope.state[state] = true; // switch states
      };

      $scope.afterTurn = function(questionResult) {

      };
    }
]);
