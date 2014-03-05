'use strict';

angular.module('matrixApp')
  .controller('MainCtrl', function ($scope, coordenadasService, $timeout) {
    $scope.movida = 'hola';
    $scope.borrar = function(){
      coordenadasService.borrar();
    }
    // $scope.addTodo = function() {
    //   $scope.elcolor = $scope.color;
    //   console.log($scope.elcolor);
    // };
  });
