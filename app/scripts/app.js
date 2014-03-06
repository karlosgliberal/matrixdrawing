'use strict';

angular.module('matrixApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'matrixappCoordenas',
  'colorpicker.module',
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
      .otherwise({
        redirectTo: '/'
      });
  });
