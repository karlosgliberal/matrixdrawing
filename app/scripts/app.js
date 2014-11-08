'use strict';

angular.module('matrixApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'matrixappCoordenas',
  'angularSpectrumColorpicker',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/snake', {
        templateUrl: 'views/snake.html',
        controller: 'SnakeCtrl'
      })
      .when('/iconos/:param1', {
        templateUrl: 'views/iconos.html',
        controller: 'IconosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
