//TODO esto es un apaño del apaño para pintar algo, se puede mejorar mucho,
// Si quieres ya sabes mandanos un correo  hola@interzonas.info o clona y pull-recquest

//Pach de Arduinio para el control de una pantalla de led de adafruit
//sobre la libreria Adafruit RGBmatrixPanel.


#include <Adafruit_GFX.h>   // Libreria grafica principal
#include <RGBmatrixPanel.h> // Libreria del hardgare espeficifo 


//Relaci´n de pins del arduinio a la pantalla
#define CLK 8  
#define LAT A3
#define OE  9
#define A   A0
#define B   A1
#define C   A2
int incomingByte = 0;
int buf = 0;
int x = 0;
int y = 0;

RGBmatrixPanel matrix(A, B, C, CLK, LAT, OE, false);

void setup() {
  Serial.begin(115200);
  matrix.begin();
    matrix.drawPixel(33, 24, matrix.Color333(7, y/2, x/2)); 
   
  delay(500);
 
  // whew!
}

void loop() {
  byte i;
  int r;
  int g;
  int b;
  String strx;
  String stry;
  String strr;
  String strg;
  String strb;
 
 //Solucion dirty, dirty para separar lo que llega del puerto serie, esta mejorado en una futura version 
  if(Serial.available() > 0)
    {
        strx = Serial.readStringUntil('\n');
        x = Serial.parseInt();
        stry = Serial.readStringUntil('\y');
        y = Serial.parseInt();
        strr = Serial.readStringUntil('\f');
        r = Serial.parseInt();
        strg = Serial.readStringUntil('\\');
        g = Serial.parseInt();
        strb = Serial.readStringUntil('\b');
        b = Serial.parseInt();
        matrix.drawPixel(x, y, matrix.Color333(r, g, b));
    }

}


