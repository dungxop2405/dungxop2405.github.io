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
  myMsg = null;
  // called when a message arrives
  function onMessageArrived(message) {
    myMsg = message.payloadString;
    if(myMsg=="on"){
    	document.getElementById("on").checked = true;
    }   
    else if(myMsg=="off"){
    	document.getElementById("on").checked = false;
    }
  }

function toggleSonon() {
			message = new Paho.MQTT.Message("toggleSon-on");
		    message.destinationName = "demo";
		    client.send(message);
            console.log("toggleSon-on");        
        };

function toggleSonoff() {
			message = new Paho.MQTT.Message("toggleSon-off");
		    message.destinationName = "demo";
		    client.send(message);
            console.log("toggleSon-off");        
        };

$(document).ready(function(){
	$('#on').on('change',function(){
    	if(this.checked){
    		//$("#info").text("ON");
    		toggleSonon();
    	}
        else{
        	//$("#info").text("OFF");
        	toggleSonoff();
        }
    });
});
