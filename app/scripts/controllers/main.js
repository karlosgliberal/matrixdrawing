'use strict';

angular.module('matrixApp')
  .controller('MainCtrl', function ($scope, coordenadasService) {
    $scope.movida = 'hola';
    $scope.colors = ['fff','000','f00','0f0','00f','88f','f8d','f88','f05','f80','0f8','cf0','08f','408','8ff'];
    $scope.elcolor = '00f';
    $scope.borrar = function(){
      coordenadasService.borrar();
    };
    $scope.botonColor = function(color) {
      $scope.elcolor = color;
      console.log(color);
    };
  });
