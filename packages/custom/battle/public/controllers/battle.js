'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'apiFetch',
    function($scope, $rootScope, Global, Battle, apiFetch) {
      $scope.problem = {
        question: 'temp'
      };
      $scope.user = Global.user

      apiFetch.fetchProblem('easy', 'math', function(p) {
        $scope.problem = p;
      });
    }
]);
