'use strict';
var clientIdProperty = 'clientID',
    defaultPrefix = 'DEFAULT_';

angular.module('mean.battle')
  .controller('Problem', ['$scope', '$rootScope', 'Global', 'Battle', 'apiFetch', 'stateMachine',
    function($scope, $rootScope, Global, Battle, apiFetch, stateMachine) {
      $scope.state = {
        'start': true,
        'battle': false,
        'success': false,
        'failure': false
      };

      $scope.activityLog = [];

      $scope.addActivityLog = function(item) {
        $scope.activityLog.push(item);
      };

      $scope.chooseDifficulty = function(diff) {
        $scope.difficulty = diff;
        stateMachine.switchState($scope.state, 'battle');
        $scope.addActivityLog('You choose to fight a ' + diff + ' monster');
        $scope.startBattle(); // this is wrong, but it works for now. A controller shouldn't depend on a child.
      };
    }
  ]).controller('Battle', ['$scope', '$rootScope', 'apiFetch', 'rng', 'Global', 'stateMachine', 
    function($scope, $rootScope, apiFetch, rng, Global, stateMachine) {
      $scope.battle_user = {
        currentHealth: Global.user.maxHealth, // set at max for now
        power: 0 // I'm not sure what the spec is for power at the moment
      };

      $scope.problem = {
        question: 'temp'
      };

      $scope.monster = {
        // these will be filled in
        health: 0
      };

      $scope.battleState = {
        'question' : true,
        'postAnswer' : false,
        'done': false
      };

      $scope.difficultyChances = {
        'easy': 0,
        'medium': 50,
        'hard': 75
      };

      $scope.startBattle = function(diff) {
        // Also determin power here too. 
        // ML TODO: Make a service for generating a monster and so it can keep track of it's health
        switch(diff) {
          case 'easy':
            $scope.monster.health = 100;
            break;
          case 'medium':
            $scope.monster.health = 200;
            break;
          case 'hard':
            $scope.monster.health = 300;
            break;
        }
      };

      $scope.afterTurn = function(questionResult) {
        // this all changes with difficulty as well
        if(questionResult) {
          switch($scope.difficulty) {
            case 'easy':
              $scope.playerAttack();
              $scope.nextProblem();
              break;
            case 'medium':
              $scope.rollPlayerAction();
              break;
            case 'hard':
              $scope.rollPlayerAction();
              break;
          }
        } else {
          $scope.enemyAttack();
        }
      };

      $scope.fetchProblem = function() {
        $scope.user_attempt = "";
        // change the difficulty here
        apiFetch.fetchProblem('easy', 'math', function(p) {
          $scope.problem = p;
        });
      };

      $scope.fetchProblem();

      $scope.nextProblem = function() {
        $scope.fetchProblem();
        stateMachine.switchState($scope.battleState, 'question');
      };

      $scope.attempt = function() {
        var attempt = $scope.user_attempt;

        apiFetch.submitAttempt($scope.problem.id, attempt, function(result) {
          if(result.result) {
            $scope.addActivityLog('You answered correctly!');
            stateMachine.switchState($scope.state, 'success');
          } else {
            $scope.result = "You answered incorrectly.";
            stateMachine.switchState($scope.state, 'failure');
          }
          $scope.attempted = true; // I feel like this should be in a state machine
          $scope.afterTurn(result.result);
        });
      };

      $scope.enemyAttack = function() {
        // Enemy does damage
      };

      $scope.playerAttack = function(damage) {
        // Player does damage
        damage = typeof(damage) === undefined ? damage : 1.0; // attempt at default parameters
      };

      $scope.rollPlayerAction = function() {
        if(rng.rollDice($scope.difficultyChances[$scope.difficulty])) {
          // roll succeded
          // the player now has a choice between two actions
          stateMachine.switchState($scope.battleState, 'postAnswer');
        } else {
          // roll failed. just do basic attack
          $scope.playerAttack();
        }
      };

      $scope.powerAttack = function(choice) {
        if(choice === 'critical') { 
          // player chose to critically hit the monster
          $scope.playerAttack(1.5);
          $scope.enemyAttack();
        } else { // choice === 'miss'
          $scope.playerAttack();
        }
        // stateMachine.switchState($scope)
      };
    }
  ]
);
