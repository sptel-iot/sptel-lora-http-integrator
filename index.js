var axios = require('axios');
var mqtt = require("mqtt");
const fs = require("fs");
//CA certificate
var CA_File = fs.readFileSync("./secure/ca.pem");

//if using client certificates
var PRIVATE_KEY = fs.readFileSync("./secure/Sensor-device-001.key");
var CERT = fs.readFileSync("./secure/Sensor-device-001.crt");

var options = {
  rejectUnauthorized: false,
  //define your client certificates
  key: PRIVATE_KEY,
  cert: CERT,
  ca: CA_File,
};

//use the MQTT broker of your Instance
var client = mqtt.connect(
  "mqtt://dlc-mqtt-<<INSTANCE_ID>>.iot.sptel.com.sg:8883",
  options
);

//check connection to mqtt broker and subscribe to topic "messages"
client.on("connect", function () {
client.subscribe('messages', function (err) {
  if (!err){
console.log("connected to mqtt broker");
}
})
});

//subscribe to your lora-nodes 

client.on('message', function (topic, payload) {
    
    loramessage = payload.toString()
    value = JSON.parse(loramessage)
    deviceEUI = value.devEUI
  //check for lora-nodes in array from lora-nodes.json file

  fs.readFile('lora-nodes.json', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
        var nodes = array[i]
        if ( nodes.includes(deviceEUI)){
            console.log("////"+deviceEUI+"///")  
            console.log(loramessage)
            var data = loramessage;
            //console.log(data)
            var config = {
              method: 'post',
              url: 'https://enskew5um37vn.x.pipedream.net',  // replace the URL with your HTTP endpoint and corresponding headers
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
            .then(function (response) {
              console.log("data pushed to external REST endpoint");
            })
            .catch(function (error) {
              console.log("error");
            });
        }

        
    }
});
})




