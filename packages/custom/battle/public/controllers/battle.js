'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'MathProblemGenerator',
    function($scope, $rootScope, Global, Battle, MathProblemGenerator) {
      $scope.battleMode = true
    }
]);
