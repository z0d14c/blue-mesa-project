'use strict';

//Setting up route
angular.module('mean.users').config(['$stateProvider',
    function($stateProvider) {
        // states for my app
        $stateProvider
            .state('create-character', {
                url: '/create',
                templateUrl: 'users/views/createcharacter.html'
            })
    }
]);
