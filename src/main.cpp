#include <WiFi.h>
#include <FirebaseESP32.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>

// ========== Cấu hình WiFi & Firebase ==========
#define FIREBASE_HOST "https://dht11-42c5b-default-rtdb.firebaseio.com"
#define FIREBASE_SC "0iHinaf8SimouA3Y7pQzdSitGJjBMymuXBaO4tEW"
#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""

// ========== Cấu hình DHT ==========
#define DHTPIN4 15
#define DHTTYPE DHT22

#define TRIG_PIN 18     
#define ECHO_PIN 19     

#define MQ2_A 35
#define MQ2_D 5

int A_value, D_value;
// ========== Khởi tạo đối tượng ==========

DHT dht4(DHTPIN4, DHTTYPE);

FirebaseData firebaseData;
FirebaseJson json;
int i;

void setup() {
  Serial.begin(9600);
  delay(1000);

  // Kết nối WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Đang kết nối WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nĐã kết nối WiFi!");
  Serial.println(WiFi.localIP());

  // Kết nối Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_SC);
  Firebase.reconnectWiFi(true);

  // Khởi động cảm biến

  dht4.begin();
  pinMode(TRIG_PIN, OUTPUT); 
  pinMode(ECHO_PIN, INPUT);  
  pinMode(MQ2_A, INPUT); 
  pinMode(MQ2_D, INPUT);
}

long measureDistance() { 
  digitalWrite(TRIG_PIN, LOW); 
  delayMicroseconds(2); 
  digitalWrite(TRIG_PIN, HIGH); 
  delayMicroseconds(10); 
  digitalWrite(TRIG_PIN, LOW); 
  long duration = pulseIn(ECHO_PIN, HIGH); 
  long distance = duration * 0.034 / 2; 
  return distance; 
} 

unsigned long previousMillis = 0;
const long interval = 1000;

void loop() {
  

    // Đọc DHT22
    float h4 = dht4.readHumidity();
    float t4 = dht4.readTemperature();

    if (!isnan(h4) && !isnan(t4)) {
      Serial.printf("[Sensor4] Nhiet do: %.2f C - Do am: %.2f %%\n", t4, h4);
      json.clear();
      json.set("Temperature4", t4);
      json.set("Humidity4", h4);
      Firebase.updateNode(firebaseData, "/Sensor4", json);
    } else {
      Serial.println("[Sensor4] Lỗi đọc cảm biến!");
    }

    // Đo khoảng cách
    long distance = measureDistance();
    Serial.printf("Khoang cach: %ld cm\n", distance);
    json.clear();
    json.set("Distance", distance);
    if (!Firebase.updateNode(firebaseData, "/TT_IoT/LIVING", json)) {
      Serial.println("Update LIVING failed: " + firebaseData.errorReason());
    }

    // Đọc MQ2
    A_value = analogRead(MQ2_A);
    D_value = digitalRead(MQ2_D);
    Serial.printf("AnalogValue: %d DigitalValue: %d\n", A_value, D_value);
    json.clear();
    json.set("AnalogValue", A_value);
    json.set("DigitalValue", D_value);
    if (!Firebase.updateNode(firebaseData,"/TT_IoT/KITCHEN", json)) {
      Serial.println("Update KITCHEN failed: " + firebaseData.errorReason());
    }
  }
}



  