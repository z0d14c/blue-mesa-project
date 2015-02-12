'use strict';

angular.module('mean.battle').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('problem', {
      url: '/battle/problem',
      templateUrl: 'battle/views/problem.html'
    });
  }
]);