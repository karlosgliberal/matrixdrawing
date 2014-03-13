'use strict';

angular.module('matrixApp')
  .controller('MainCtrl', function ($scope, coordenadasService) {
    $scope.movida = 'hola';
    $scope.colors = ['fff','000','f00','0f0','00f','88f','f8d','f05','f80','0f8','FFFF00','08f','408','8ff'];
    $scope.elcolor = 'FFFF00';
    $scope.listaNombres = [];

    $scope.borrar = function(){
      coordenadasService.borrar();
    };
    $scope.guardarDibujo = function(){
      coordenadasService.copyFbRecord($scope.nombreDibujo);
      $('#configuracion').modal('hide');
      $scope.movida = coordenadasService.pillarPresets();
      $scope.movida.then(function(snap){
        snap.forEach(function(data){
          $scope.listaNombres.push(data.name());
        });
      });
    };
    $scope.movida = coordenadasService.pillarPresets();
    $scope.movida.then(function(snap){
      snap.forEach(function(data){
        $scope.listaNombres.push(data.name());
      });
    });
    $scope.seleccionPreset = function(){
      coordenadasService.sustituirPreset($scope.preset);
    }
    $scope.botonColor = function(color) {
      $scope.elcolor = color;
    };
  });
