'use strict';

angular.module('matrixApp')
  .directive('plasma', function (coordenadasService, $interval) {
    return {
      restrict: 'A',
      link: function(scope, element){
        var ctx = element[0].getContext('2d');
      
        // variable that decides if something should be drawn on mousemove
        var drawing = false;
        // the last coordinates before the current move
        var pixSize = 20, lastPoint = null, mouseDown = 0;
        var p = 0;

        function drawCircle(x0, y0, r, color) {
          var  f = 1 - r;
          var ddF_x = 1;
          var ddF_y = -2 * r;
          var x = 0;
          var y = r;

          drawPixel(x0  , y0+r, color);
          drawPixel(x0  , y0-r, color);
          drawPixel(x0+r, y0  , color);
          drawPixel(x0-r, y0  , color);

          while (x<y) {
            if (f >= 0) {
              y--;
              ddF_y += 2;
              f += ddF_y;
            }
            x++;
            ddF_x += 2;
            f += ddF_x;
          
            drawPixel(x0 + x, y0 + y, color);
            drawPixel(x0 - x, y0 + y, color);
            drawPixel(x0 + x, y0 - y, color);
            drawPixel(x0 - x, y0 - y, color);
            drawPixel(x0 + y, y0 + x, color);
            drawPixel(x0 - y, y0 + x, color);
            drawPixel(x0 + y, y0 - x, color);
            drawPixel(x0 - y, y0 - x, color);
          }
        } 

        var drawPixel = function(x, y, color) {
          ctx.fillStyle = '#FFFF00';
          ctx.fillRect(parseInt(x) * pixSize, parseInt(y) * pixSize, pixSize, pixSize);
          coordenadasService.addCoordenada(x + ':' + y, ctx.fillStyle);
        };

        //coordenadasService.borrar();
        //drawCircle(15,8,7);


        var stopTime = $interval(function(){
          coordenadasService.borrar();
          drawCircle(17,5,1+p);
          p++;
          if(p == 4){
            p =0;
          }
        }, 1200);
      }
    }; //fin return
  });
