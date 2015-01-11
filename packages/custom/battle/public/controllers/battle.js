'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
    .controller('BattleController', ['$scope', '$rootScope', 'Global', 'Battle', 'MathProblemGenerator',
  function($scope, $rootScope, Global, Battle, MathProblemGenerator) {
    $scope.global = Global;
    $scope.package = {
      name: 'battle'
    };
      $scope.battleMode = false;
      $scope.choiceMode = true;

    $scope.chooseDifficulty = function chooseDifficulty (choice){
      if(choice == 'easy') {
          $scope.problemScope = MathProblemGenerator.MathProblemGenerate(1);
      }  else if (choice == 'medium') {
          $scope.problemScope = MathProblemGenerator.MathProblemGenerate(2);
      } else if (choice == 'hard') {
          $scope.problemScope = MathProblemGenerator.MathProblemGenerate(3);
      }
        $scope.choiceMode = false;
        $scope.battleMode = true;
        $scope.difficulty = choice;
        console.log($scope.problemScope);
    };

    $scope.answer = function answer() {
        var inputParsed = parseInt($scope.userInput);
        if(inputParsed == $scope.problemScope.correctAnswer) {
            alert('Congratulations! Answer is correct.')
        } else {
            alert('Sorry, answer is wrong. 0 XP Awarded.');
        }
        $scope.battleMode = false;
        $scope.choiceMode = true;
    };


  }
]);
