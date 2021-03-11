# sptel-lora-http-integrator
An HTTP(S) integrator to send LoRa end nodes data from DLC to other applications

*Install NodeJS in your machine and follow the below steps*


Clone the github repository and change to the project directory

```
git clone https://github.com/sptel-iot/sptel-lora-http-integrator

cd sptel-lora-http-integrator
```
Go to **lora-nodes.json** file and add all your lora node's deviceEUIs which you need to send to your application.


Then install the dependencies using below command
```
npm install
```
Inside index.js file, change the ca.pem, key and certificate files accordingly. And also change the **instance_id** in the MQTT broker URL which you have received to connect to the broker.

Then, replace the HTTP(S) endpoint URL of your application to send payload to the endpoint. 

Then run,
```
node index.js
```

This will start sending the data to your HTTP(S) endpoint of your application from SPTel IoT Platform :smiley:	


