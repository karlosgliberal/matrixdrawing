'use strict';

angular.module('matrixappCoordenas', [])
  .factory('coordenadasService', function () {
    var firebase = {};
    firebase = new Firebase('https://d3interzonas.firebaseio.com/');
    return {
      on: function (eventName, callback) {
        firebase.on(eventName, function(){
          var args = arguments;
          callback.apply(firebase, args);
        });
      },
      addCoordenada: function(coordenada, color){
        firebase.child(coordenada).set(color);
      },
      borrar: function(){
        firebase.remove();
      }
    };
  });
