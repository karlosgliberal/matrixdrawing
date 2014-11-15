'use strict';

angular.module('matrixApp', [
  'ngTouch',
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
  }).directive('plclick', function() { //directiva que soluciona el bug del touch
    return function(scope, element, attrs) {
        element.bind('touchstart click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            scope.$apply(attrs['plclick']);
        });
    };
});
