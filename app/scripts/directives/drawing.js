'use strict';

angular.module('matrixApp')
  .directive('drawing', function (coordenadasService, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element){

        coordenadasService.on('child_added',function(data){
          $timeout(function(){
            drawPixel(data);
          },0);
        });
        coordenadasService.on('child_changed',function(data){
          $timeout(function(){
            drawPixel(data);
          },0);
        });
        coordenadasService.on('child_removed',function(data){
          $timeout(function(){
            clearPixel(data);
          },0);
        });
        var ctx = element[0].getContext('2d');
      
        // variable that decides if something should be drawn on mousemove
        var drawing = false;
        // the last coordinates before the current move
        var pixSize = 20, lastPoint = null, mouseDown = 0;

        var bw = 640;
        var bh = 320;
        //$parsedding around grid
        var p = 0;
        function drawBoard(){
          for (var xx1 = 0; xx1 <= bw; xx1 += 20) {
            ctx.moveTo(0.5 + xx1 + p, p);
            ctx.lineTo(0.5 + xx1 + p, bh + p);
          }

          for (var x = 0; x <= bh; x += 20) {
            ctx.moveTo(p, 0.5 + x + p);
            ctx.lineTo(bw + p, 0.5 + x + p);
          }

          ctx.strokeStyle = 'ccc';
          ctx.stroke();
        }

        drawBoard();
        element.bind('mousedown', function(){
          ctx.beginPath();
          drawing = true;
        });

        element.bind('mousemove', function(event){
          drawBoard();
          var canvas = angular.element('#canvas');
          var offset = offsetAngular(canvas);
          if(drawing){
            var x1 = Math.floor((event.pageX - offset.left) / pixSize);
            var y1 = Math.floor((event.pageY - offset.top) / pixSize);
            var x0 = (lastPoint === null) ? x1 : lastPoint[0];
            var y0 = (lastPoint === null) ? y1 : lastPoint[1];
            var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
            var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
            while (true) {
              //write the pixel into Firebase, or if we are drawing white, remove the pixel
              coordenadasService.addCoordenada(x0 + ':' + y0, scope.elcolor);
              if (x0 === x1 && y0 === y1){
                break;
              }
              var e2 = 2 * err;
              if (e2 > -dy) {
                err = err - dy;
                x0 = x0 + sx;
              }
              if (e2 < dx) {
                err = err + dx;
                y0 = y0 + sy;
              }
            }
            lastPoint = [x1, y1];
          }
        });
        
    

        element.bind('mouseup', function(){
          // stop drawing
          lastPoint = null;
          drawing = false;
        });
        
        // canvas reset
        // function reset(){
        //   element[0].width = element[0].width;
        // }
        function offsetAngular(elm) {
          try {return elm.offset();} catch(e) {}
          var rawDom = elm[0];
          var _x = 0;
          var _y = 0;
          var body = document.documentElement || document.body;
          var scrollX = window.pageXOffset || body.scrollLeft;
          var scrollY = window.pageYOffset || body.scrollTop;
          _x = rawDom.getBoundingClientRect().left + scrollX;
          _y = rawDom.getBoundingClientRect().top + scrollY;
          return { left: _x, top:_y };
        }
        var drawPixel = function(snapshot) {
          var coords = snapshot.name().split(':');
          ctx.fillStyle = '#'+snapshot.val();
          ctx.fillRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
        };
        var clearPixel = function(snapshot) {
          var coords = snapshot.name().split(':');
          ctx.clearRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
        };
      }
    }; //fin return
  });
