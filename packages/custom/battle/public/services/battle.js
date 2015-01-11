'use strict';

angular.module('mean.battle').factory('Battle', [
        function () {
            return {
                name: 'battle'
            };
        }
    ])
    .service('MathProblemGenerator', [ function () {

        this.MathProblemGenerate = function MathProblemGenerate(num) {
            var self = this;
            self.problemScope = {};
            var operatorsAvailable = ['+', '-'];
            var numbers = [];
            var operators = [];
            self.problemScope.correctAnswer = 0;
            self.problemScope.problemText = '';
            numbers[0] = -20 + Math.floor((Math.random() * 39) + 1);
            numbers[1] = -20 + Math.floor((Math.random() * 39) + 1);

            operators[0] = operatorsAvailable[Math.floor((Math.random() * 2) + 1)];

            if (num == 2) {
                operators[1] = operatorsAvailable[Math.floor((Math.random() * 2) + 1)];
                numbers[2] = -20 + Math.floor((Math.random() * 39) + 1);
            }

            angular.forEach(numbers, function (numVal, numIdx) {
                if (numIdx == 0) {
                    self.problemScope.correctAnswer = (numVal);
                    self.problemScope.problemText += (numVal);
                } else {
                    if (operators[numIdx - 1] === '-') {
                        self.problemScope.correctAnswer += -numVal;
                        self.problemScope.problemText += ' ' + operators[numIdx - 1] + ' ' + '(' + numVal + ')';
                    } else if (operators[numIdx - 1] === '+') {
                        self.problemScope.correctAnswer += numVal;
                        self.problemScope.problemText +=  ' ' +  operators[numIdx - 1] + ' ' + numVal;
                    }
                }
            });
            console.log('numbers are');
            console.log(numbers);
            console.log('operators are');
            console.log(operators);
            self.problemScope.problemText += " = ?";
            return this.problemScope;
        }
    }]);
