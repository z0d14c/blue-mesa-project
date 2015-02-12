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

      $scope.battleState = {
        'question' : true,
        'postAnswer' : false,
        'done': false
      };

      $scope.activityLog = [];

      $scope.monster = {
        // these will be filled in
        health: 0
      };

      $scope.player = {
        currentHealth: Global.user.maxHealth, // set at max for now
        power: 40 // I'm not sure what the spec is for power at the moment
      };

      $scope.addActivityLog = function(item) {
        $scope.activityLog.push(item);
      };

      $scope.chooseDifficulty = function(diff) {
        $scope.difficulty = diff;
        stateMachine.switchState($scope.state, 'battle');
        $scope.addActivityLog('You choose to fight a ' + diff + ' monster');
        $scope.startBattle();
      };

      // ML TODO: This feels like it's in the wrong place. Refactor eventually
      $scope.startBattle = function() {
        // Also determin power here too. 
        // ML TODO: Make a service/factory for generating a monster and so it can keep track of it's health
        switch($scope.difficulty) {
          case 'easy':
            $scope.monster.health = 100;
            $scope.monster.power = 10;
            $scope.monster.xp = 100;
            break;
          case 'medium':
            $scope.monster.health = 200;
            $scope.monster.power = 20;
            $scope.monster.xp = 200;
            break;
          case 'hard':
            $scope.monster.health = 300;
            $scope.monster.power = 30;
            $scope.monster.xp = 300; 
            break;
        }
      };

      $scope.restart = function() {
        $scope.monster = {};
        $scope.player.currentHealth = Global.user.maxHealth;
        $scope.activityLog = [];
        stateMachine.switchState($scope.state, 'start');
        stateMachine.switchState($scope.battleState, 'question');
      };
    }
  ]).controller('Battle', ['$scope', '$rootScope', 'apiFetch', 'rng', 'Global', 'stateMachine', 
    function($scope, $rootScope, apiFetch, rng, Global, stateMachine) {
      $scope.problem = {
        question: 'temp'
      };

      $scope.difficultyChances = {
        'easy': 0,
        'medium': 50,
        'hard': 75
      };

      $scope.afterTurn = function(questionResult) {
        // this all changes with difficulty as well
        if(questionResult) {
          switch($scope.difficulty) {
            case 'easy':
              $scope.playerAttack();
              $scope.endOfRound();
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
          $scope.endOfRound();
        }
      };

      $scope.fetchProblem = function() {
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
          $scope.user_attempt = ''
          if(result.result) {
            $scope.addActivityLog('You answered correctly!');
            // stateMachine.switchState($scope.state, 'success');
          } else {
            $scope.addActivityLog('You answered incorrectly.');
            // stateMachine.switchState($scope.state, 'failure');
          }
          $scope.afterTurn(result.result);
        });
      };

      $scope.enemyAttack = function() {
        // Enemy does damage

        // just basic health minus power
        $scope.player.currentHealth -= $scope.monster.power;
        $scope.addActivityLog('Monster dealt ' + $scope.monster.power + ' damage');
      };

      $scope.playerAttack = function(factor) {
        // Player does damage
        factor = typeof(factor) === "undefined" ? 1.0 : factor; // attempt at default parameters

        var damage = $scope.player.power * factor;
        $scope.monster.health -= damage;

        $scope.addActivityLog('You dealt ' + damage + ' damage');
      };

      $scope.isSomeoneDead = function() {
        return ($scope.monster.health <= 0 || $scope.player.currentHealth <= 0);
      }

      $scope.rollPlayerAction = function() {

        if(rng.rollDice($scope.difficultyChances[$scope.difficulty])) {
          // roll succeded
          // the player now has a choice between two actions
          stateMachine.switchState($scope.battleState, 'postAnswer');
        } else {
          // roll failed. just do basic attack
          $scope.playerAttack();
          $scope.endOfRound();
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

        $scope.endOfRound();
      };

      $scope.endOfRound = function() {
        if($scope.isSomeoneDead()) {
          // we finished, figure out who died
          if($scope.player.currentHealth <= 0) {
            stateMachine.switchState($scope.state, 'failure');
            $scope.addActivityLog('You lost...');
          } else { // monster is dead
            stateMachine.switchState($scope.state, 'success');
            $scope.addActivityLog('You won!');
          }
        } else {
          $scope.nextProblem();
        }
      };
    }
  ]
);
