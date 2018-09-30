client = new Paho.MQTT.Client("m21.cloudmqtt.com", 31277, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.onSuccess = onConnect;
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
    Connect(myMsg);
  }

  function doFail(e){
    console.log(e);
    NotConnect();

  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      NotConnect();
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
    console.log("receive:" + myMsg);
    if(myMsg=="on"){
      document.getElementById("on").checked = true;
    }   
    else if(myMsg=="off"){
      document.getElementById('on').checked = false;
    };
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

function Connect(myMsg)
{
  document.getElementById("check").innerHTML = '<h2><span class="label success">Success</span></h2>';
  document.getElementById("layout").innerHTML = "<label class="+ "switch"+"><input id="+"on"+" type="+"checkbox"+"><span class="+"slider"+"></span></label>";  
  $(document).ready(function(){
  $('#on').on('change',function(){
      if(this.checked){
        toggleSonon();
      }
        else{
          toggleSonoff();
        }
    });
});
};

function NotConnect()
{
  document.getElementById("check").innerHTML = '<h2><span class="label danger";>Danger</span></h2>';
};

