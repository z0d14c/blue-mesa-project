'use strict';

angular.module('mean.users').directive('userStats',
  function() {
    return {
      restrict: 'EA',
      scope: {

      },
      controller: function ($scope, Global) {
        $scope.global = Global;
        console.log($scope.global.user);
      },
      template: "<div style='border:double; border-color: green;' class='healthcontainer'>" +
          "<div>{{global.user.name}} \n</div>" +
          "<div>{{global.user.currentHealth}} / {{global.user.maxHealth}}</div>" +
          "<div>experience here</div>" +
      "</div>"
    };
  }
);
