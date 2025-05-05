#include <WiFiS3.h>
#include <WiFiClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include "CONSTANTS.h"
//1. Definir
//Constantes
const char* ssid = SECRET_SSID;      // WiFi SSID
const char* password = SECRET_PASS;  // WiFi password
const char* server = SERVER_IP;      // Server IP
const int port = 8000;               // Port number
char* check_url = CHECK_URL;         // check
char* admin_url = ADMIN_URL;         // Endpoint

char* endpoint;
const char* secret = ARDUINOKEY;
bool conectado_WIFI = false;
bool conectado_ENTEE = false;
bool adminPresent = false;
String urlCheck = "";
int status = WL_IDLE_STATUS;
//Objeto wifi
WiFiClient client;
String body = "";
//Objeto NFC
#define RST_PIN 9
#define SS_PIN 10
MFRC522 mfrc522(SS_PIN, RST_PIN);
//Pines del led
#define RED_PIN 3
#define GREEN_PIN 5
#define BLUE_PIN 6
//Función para el color del led
void Color(int R, int G, int B) {  //El valor max tiene que ser 255
  analogWrite(RED_PIN, R);         // Red    - Rojo
  analogWrite(GREEN_PIN, G);       // Green - Verde
  analogWrite(BLUE_PIN, B);        // Blue - Azul
}
//Pin y variables del boton

//2. Preparar el dispositivo
void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

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
}
//3. Loop
void loop() {
  if (adminPresent) {
    Color(0, 0, 255);
    endpoint = admin_url;
    
  } else {
    Color(0, 255, 0);
    endpoint = check_url;
  }


  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;
  Color(0, 0, 0);
  String uidString = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (i > 0) uidString += ":";
    uidString += String(mfrc522.uid.uidByte[i], HEX);
  }
  uidString.toUpperCase();
  // if (uidString == "3A:70:F9:3") {  //TODO: solicictar a la web para ver si es el admin

  //   adminPresent = !adminPresent;
  //   delay(1000);


  //   return;
  // }
  Color(0, 255, 0);

  Serial.println("UID de la tarjeta: " + uidString);
  urlCheck = "/" + String(endpoint);
  Serial.println("Enviando solicitul con URL:" + urlCheck);
  String postData = "hexKey=" + String(uidString) + "&INOSecret=" + String(secret);


  // String encodedUID = uidString;
  // encodedUID.replace(":", "-");  // Encoding sencillo por si lo que falla es el :
  Serial.println("Conectando con el servidor Entee...");
  Color(0, 0, 0);
  if (client.connect(server, port)) {
    conectado_ENTEE = true;
    Serial.println("Conexión con el servidor Entee establecida");
    // Send HTTP GET request
    Serial.println("Enviando la solicitud...");


    client.println("POST " + String(urlCheck) + " HTTP/1.1");
    client.println("Host: " + String(server) + ":" + String(port));
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println("Content-Length: " + String(postData.length()));
    client.println();  // Esta linea le indica al servidor de la api que se acaban los headers
    client.print(postData);


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

    if (body != "") {
      Serial.println("Desconectado del servidor.");
      JsonDocument doc;

      DeserializationError error = deserializeJson(doc, body);

      if (error) {
        Serial.print("Error al descomponer la respuesta ");
        Serial.println(error.c_str());
        return;
      }

      bool success = doc["success"];  // true
      Serial.println(success);
      bool adminPermit = doc["adminPermit"];
      // JsonObject timeLog = doc["timeLog"];
      // int timeLog_id = timeLog["id"];                          // 16
      // int timeLog_user_id = timeLog["user_id"];                // 2
      // const char* timeLog_entry_time = timeLog["entry_time"];  // "2025-05-04T18:26:05.000000Z"
      // // timeLog["exit_time"] is null
      // const char* timeLog_work_type = timeLog["work_type"];    // "at_office"
      // int timeLog_altered = timeLog["altered"];                // 0
      // const char* timeLog_created_at = timeLog["created_at"];  // "2025-05-04T18:26:05.000000Z"
      // const char* timeLog_updated_at = timeLog["updated_at"];  // "2025-05-04T18:26:05.000000Z"

      // JsonObject user = doc["user"];
      // int user_id = user["id"];                                        // 2
      // const char* user_name = user["name"];                            // "Alex"
      // const char* user_email = user["email"];                          // "alexollemail@gmail.com"
      // const char* user_email_verified_at = user["email_verified_at"];  // "2025-05-04T10:33:49.000000Z"
      // const char* user_role = user["role"];                            // "user"
      // const char* user_created_at = user["created_at"];                // "2025-05-04T10:33:49.000000Z"
      // const char* user_updated_at = user["updated_at"];                // "2025-05-04T10:33:49.000000Z"
      body = "";  //Resetear el body
      if (success && adminPermit) {
        adminPresent = !adminPresent;
        
        Serial.println("Todo correcto, Acerque la tarjeta a registrar");

        return;
      } else if (success && !adminPermit) {
        Serial.println("Todo correcto");

        Color(0, 0, 255);
        delay(1000);
        Color(0, 255, 0);
        delay(1000);
        Color(0, 0, 255);
        delay(1000);
        Color(0, 0, 0);
        delay(1000);

      } else if (!success) {
        Serial.println("Todo al rojo");
        Color(255, 0, 0);
        delay(1000);
        Color(0, 0, 0);
        delay(1000);
      }
    }

  } else {
    Serial.println("Conexión fallida con el servidor Entee.");
    Color(255, 0, 0);
    delay(1000);
    Color(0, 0, 0);
    delay(1000);
  }




  delay(2000);
  Color(0, 255, 0);
  Serial.println("Todo correcto, Acerque la tarjeta");
}


//  String route = (buttonState ? urlCheck : urlRegister)
