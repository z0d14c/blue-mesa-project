'use strict';

angular.module('mean.users').directive('userStats',
  function() {
    return {
      restrict: 'EA',
      scope: {

      },
      controller: function ($scope, Global) {
        $scope.global = Global;
      },
      template: "<div class='healthcontainer'>" +
          "<div>TEST</div>" +
          "<div></div>" +
      "</div>"
    };
  }
);
