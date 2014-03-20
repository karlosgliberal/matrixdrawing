'use strict';

angular.module('matrixApp')
  .controller('IconosCtrl', function ($scope, $routeParams, $log, coordenadasService) {
    coordenadasService.sustituirPreset($routeParams.param1);
  });
