'use strict';

angular.module('mean.battle').controller('BattleController', ['$scope', 'Global', 'Battle',
  function($scope, Global, Battle) {
    $scope.global = Global;
    $scope.package = {
      name: 'battle'
    };
  }
]);
