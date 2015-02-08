'use strict';

angular.module('mean.battle').factory('Battle', [
        function () {
            return {
                name: 'battle'
            };
        }
    ])
    .service('apiFetch', ['$http', function($http) {
        this.fetchProblem = function(difficulty, type, callback) {
            $http.get('/problems/generate/' + type).
            success(function(data, status) {
                callback(data);
            }).
            error(function(data, status) {
                console.log('ERROR: ' + data);
                console.log('STATUS: ' + status);
            });
        };
    }]
);
