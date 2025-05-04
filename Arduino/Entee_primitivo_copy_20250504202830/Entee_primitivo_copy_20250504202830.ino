#include <WiFiS3.h>
#include <WiFiClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include "CONSTANTS.h"
//1. Definir
//Constantes
const char* ssid = SECRET_SSID;      // WiFi SSID
const char* password = SECRET_PASS;  // WiFi password 
const char* server = SERVER_IP;      // Server IP
const int port = 8000;               // Port number
const char* endpoint = CHECK_URL;    // Endpoint
const char* secret = ARDUINOKEY;
bool conectado_WIFI = false;
bool conectado_ENTEE = false;
String urlCheck = "";
int status = WL_IDLE_STATUS;
//Objeto wifi
WiFiClient client;
//Objeto NFC
#define RST_PIN 9
#define SS_PIN 10
MFRC522 mfrc522(SS_PIN, RST_PIN);
//Pines del led
#define pinMode(A3, OUTPUT) ;
#define pinMode(A4, OUTPUT) ;
#define pinMode(A5, OUTPUT) ;

void setup() {
  Serial.begin(9600);
  while (!Serial)
    ;

  Serial.println("Conectandose a la WIFI...");

  status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED) {
    status = WiFi.begin(ssid, password);
    delay(2000);
  }


  while (WiFi.status() != WL_CONNECTED || WiFi.localIP() == INADDR_NONE) {
    Serial.println("WiFi desconectada. Intentando reconectar...");
    status = WiFi.begin(ssid, password);
    delay(1000);
  }
  Serial.println("Conectado a " + String(ssid) + ".");
  Color(0, 0, 255);
  delay(100);
  Color(0, 0, 0);
  Color(0, 0, 255);
  delay(100);
  Color(0, 0, 0);
  conectado_WIFI = true;
  Serial.print("Dirección IP : ");
  Serial.println(WiFi.localIP());
  Serial.println("Conectando con el módulo NFC...");
  SPI.begin();
  mfrc522.PCD_Init();
  byte version = mfrc522.PCD_ReadRegister(mfrc522.VersionReg);
  while (version == 0x00 || version == 0xFF) {
    Serial.println("Error: No se detectó el módulo NFC. Probando de nuevo.");
    mfrc522.PCD_Init();
    delay(3000);
  }
  Serial.println("Conexión con el módulo NFC establecida");
  Serial.println("Todo correcto, Acerque la tarjeta");
  Color(0, 255, 0);
}

void loop() {
  delay(3000);
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;
  Color(0, 0, 0);
  String uidString = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (i > 0) uidString += ":";
    uidString += String(mfrc522.uid.uidByte[i], HEX);
  }
  uidString.toUpperCase();

  Serial.println("UID de la tarjeta: " + uidString);
  urlCheck = "/" + String(endpoint) + String(uidString) + "/" + String(secret);
  Serial.println("Enviando solicitul con URL:" + urlCheck);


  // String encodedUID = uidString;
  // encodedUID.replace(":", "-");  // Encoding sencillo
  Serial.println("Conectando con el servidor Entee...");
  Color(0, 0, 0);
  if (client.connect(server, port)) {
    conectado_ENTEE = true;
    Serial.println("Conexión con el servidor Entee establecida");
    // Send HTTP GET request
    Serial.println("Enviando la solicitud...");


    client.println("GET " + String(urlCheck) + " HTTP/1.1");
    client.println("Host: " + String(server) + ":" + String(port));
    client.println();  


    Serial.println("Respuesta recibida:");
    //Desde aqui hasta el Serial.print("Body"), hay una complejidad un poco extraña asi que requiere de explicación
    //TFG dentro del TFG: Solicitudes red de 10 segundos
    //Al realizar una solicitud con el arduino a un sistema de buffer de 4000 kb(el de apache de XAMMP), extrañamente tarda 10 segundos(exatitud de 0,3-0,6 segundos~) en devolver los datos
    // Entonces he optado por crear un "buffer" pero temporal. La explicación básica es que si tiene un intervalo de 2 segundos entre respuesta y respuesta, cierra la conexión
    unsigned long startTime = millis();
    //mientras que le tiempo sea menor a 2s
    while ((millis() - startTime) < 2000) {
      //Y la conexión siga viva
      while (client.available()) {
        //Lee hasta el final de la linea
        String line = client.readStringUntil('\n');
        //La imprime
        Serial.println(line);
        //Si es el final del mensaje, lee el body(donde estarán los datos)
        if (line == "\r" || line == "") {

          String body = "";
          while (client.available()) {
            body += (char)client.read();
          }
          Serial.println("Body:");
          Serial.println(body);
        }
        startTime = millis();
      }
    }


    client.stop();
    Color(0, 255, 0);
    Serial.println("Desconectado del servidor.");
  } else {
    Serial.println("Conexión fallida con el servidor Entee.");
  }
  delay(2000);
  Serial.println("Todo correcto, Acerque la tarjeta");
}
void Color(int R, int G, int B) {  //El valor max tiene que ser 255
  analogWrite(A3, R);              // Red    - Rojo
  analogWrite(A4, G);              // Green - Verde
  analogWrite(A5, B);              // Blue - Azul
}
