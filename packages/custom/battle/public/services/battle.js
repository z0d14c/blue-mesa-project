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

        this.fetchProblem = function(difficulty, type, callback) {
            self.apiGet('/problems/generate/' + type, callback);
        };
        this.submitAttempt = function(id, attempt, callback) {
            self.apiPost('/problems/attempt', { id: id, answer: attempt}, callback);
        };
    }]).
    service('rng', [function() {
        // random function helpers
        this.rollDice = function(requiredThreshold) {
            return Math.random() * 100 >= requiredThreshold;
        };
    }])
    .service('stateMachine', [function() {
        this.switchState = function(dict, state) {
            var keys = Object.keys(dict);
            for(var i = 0; i < keys.length; i+=1) {
                dict[keys[i]] = false; // make them all false
            }

            dict[state] = true; // switch states
        };
    }]
);
