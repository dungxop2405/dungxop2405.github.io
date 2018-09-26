client = new Paho.MQTT.Client("m21.cloudmqtt.com", 31277, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "ygfhpcim",
    password: "YNwI3tVF4imo",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("demo");
    message = new Paho.MQTT.Message("Hello CloudMQTT");
    message.destinationName = "demo";
    client.send(message);
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
  }

function toggleSonon() {
			message = new Paho.MQTT.Message("toggleSonon");
		    message.destinationName = "demo";
		    client.send(message);
            console.log("toggleSonon");        
        };

function toggleSonoff() {
			message = new Paho.MQTT.Message("toggleSonoff");
		    message.destinationName = "demo";
		    client.send(message);
            console.log("toggleSonoff");        
        };

$(document).ready(function(){
	$('#on').on('change',function(){
    	if(this.checked){
    		$("#info").text("U checked me, place some code here");
    		toggleSonon();
    	}
        else{
        	$("#info").text("U unchecked me, another piece of code here");
        	toggleSonoff();
        }
    });
});
