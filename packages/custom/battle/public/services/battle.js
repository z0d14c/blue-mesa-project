'use strict';

angular.module('mean.battle').factory('Battle', [
        function () {
            return {
                name: 'battle'
            };
        }
    ])
    .service('apiFetch', ['$http', function($http) {
        var self = this; // I dislike this 'practice'

        this.apiPost = function(url, data, callback) {
            $http.post(url, data).
            success(function(data, status) {
                callback(data);
            }).
            error(function(data, status) {
                console.log('ERROR: ' + data);
                console.log('STATUS: ' + status);
            });
        };

        this.apiGet = function(url, callback) {
            $http.get(url).
            success(function(data, status) {
                callback(data);
            }).
            error(function(data, status) {
                console.log('ERROR: ' + data);
                console.log('STATUS: ' + status);
            });
        };

        // ML TODO: refactor this to make it more generic
        this.fetchProblem = function(difficulty, type, callback) {
            self.apiGet('/problems/generate/' + type, callback);
        };
        this.submitAttempt = function(id, attempt, callback) {
            self.apiPost('/problems/attempt', { id: id, answer: attempt}, callback);
        };
    }]
);
