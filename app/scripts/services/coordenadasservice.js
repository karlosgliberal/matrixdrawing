/*global Firebase */
'use strict';

angular.module('matrixappCoordenas', [])
  .factory('coordenadasService', function () {
    var firebase = {};
    firebase = new Firebase('https://d3interzonas.firebaseio.com/default');
    var presets = {};
        presets = new Firebase('https://d3interzonas.firebaseio.com/presets');
    return {
      base: firebase,
      on: function (eventName, callback){
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
      },
      copyFbRecord: function(nombre){
        firebase.once('value', function(snap) {
          var hijoPreset = presets.child(nombre);
          hijoPreset.set(snap.val());
        });
      },
      pillarPresets: function(){
        presets.once('value', function(todosSnap) {
          todosSnap.forEach(function(data){
            return data;
          })
        });
      }
    };
  });
