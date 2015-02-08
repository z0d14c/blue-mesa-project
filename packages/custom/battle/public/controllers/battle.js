'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'apiFetch',
    function($scope, $rootScope, Global, Battle, apiFetch) {
      $scope.problem = {
        question: 'temp'
      };

      $scope.fetchProblem = function() {
        $scope.user_attempt = "";
        apiFetch.fetchProblem('easy', 'math', function(p) {
          $scope.problem = p;
        });
      };

      $scope.attempt = function() {
        var attempt = $scope.user_attempt;

        apiFetch.submitAttempt($scope.problem.id, attempt, function(result) {
          console.log(result)
          if(result.result) {
            $scope.answer = "Correct!";
            // display a next question button here
            $scope.display_next_answer = true;
          } else {
            $scope.answer = "Incorrect. Please try again.";
          }
          $scope.attempted = true; // I feel like this should be in a state machine
        });
      };

      $scope.fetchProblem();
    }
]);
