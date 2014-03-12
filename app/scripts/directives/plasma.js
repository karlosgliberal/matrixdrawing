'use strict';

angular.module('matrixApp')
  .directive('plasma', function () {
    return {
      restrict: 'A',
      link: function(scope, element){

var ctx = element[0].getContext('2d');
// initialisation
if (typeof palette === "undefined")
{
   var paletteoffset = 0,
       palette = [];
   
   for (var i=0,r,g,b; i<256; i++)
   {
      r = ~~(128 + 128 * Math.sin(Math.PI * i / 32));
      g = ~~(128 + 128 * Math.sin(Math.PI * i / 64));
      b = ~~(128 + 128 * Math.sin(Math.PI * i / 128));
      palette[i] = "rgb(" + ~~r + "," + ~~g + "," + ~~b + ")";
   }
}

var dist = function dist(a, b, c, d)
{
   return Math.sqrt((a - c) * (a - c) + (b - d) * (b - d));
}

// plasma source width and height
var pwidth = 320, pheight = 160;

// scale the plasma source to the canvas width/height
var vpx = 320/pwidth, vpy = 160/pheight;
var time = Date.now() / 64;

var colour = function colour(x, y)
{
   // plasma function
   return (128 + (128 * Math.sin(x * 0.0625)) +
           128 + (128 * Math.sin(y * 0.03125)) +
           128 + (128 * Math.sin(dist(x + time, y - time, 320, 160) * 0.125)) +
           128 + (128 * Math.sin(Math.sqrt(x * x + y * y) * 0.125)) ) * 0.25;
}

// render plasma effect
for (var y=0,x; y<pheight; y++)
{
   for (x=0; x<pwidth; x++)
   {
      // map plasma pixels to canvas pixels using the virtual pixel size
      ctx.fillStyle = palette[~~(colour(x, y) + paletteoffset) % 256];
      ctx.fillRect(Math.floor(x * vpx), Math.floor(y * vpy), Math.ceil(vpx), Math.ceil(vpy));
   }
}

// palette cycle speed
paletteoffset++;


/*
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

        // var drawPixel = function(snapshot) {
        //   var coords = snapshot.name().split(':');
        //   ctx.fillStyle = '#'+snapshot.val();
        //   ctx.fillRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
        // };
        var drawPixel = function(x, y) {
          ctx.fillStyle = '#f00';
          ctx.fillRect(x * pixSize, y * pixSize, pixSize, pixSize);
        };


        var clearPixel = function(snapshot) {
          var coords = snapshot.name().split(':');
          ctx.clearRect(parseInt(coords[0]) * pixSize, parseInt(coords[1]) * pixSize, pixSize, pixSize);
        };      */
      }
    }; //fin return
  });
