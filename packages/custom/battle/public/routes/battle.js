'use strict';

angular.module('mean.battle').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('battle example page', {
      url: '/battle/example',
      templateUrl: 'battle/views/index.html'
    });
  }
]);
