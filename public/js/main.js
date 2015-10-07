function clicar(buttonName) {
  //alert(buttonName);
  var buttons = document.getElementsByTagName("button");
  for(var i = 0 ; i < buttons.length ; i++ ) {
  	console.log(buttons[i]);
    if ( buttonName == buttons[i].innerText) {
    	//console.log("Opaaaa " + buttons[i].innerText);
        buttons[i].onclick();
    }  
  }  
    
  //console.log(buttons);
  //recognition.start();
}

function preencher(fieldName,fieldValue) {
  console.log("fieldName " + fieldName);
  console.log("fieldValue " + fieldValue);
  
  var fields = document.getElementsByTagName("input");
  for(var i = 0 ; i < fields.length ; i++ ) {
  	console.log(fields[i]);
      var nomeTo = fields[i].placeholder
      console.log(fieldName.toLowerCase());
      console.log(nomeTo.toLowerCase());
    if ( fieldName.toLowerCase() == nomeTo.toLowerCase()) {
    	//console.log("Opaaaa " + buttons[i].innerText);
        fields[i].value = fieldValue;
    }  
  }    
    
    
  //recognition.start();
}

(function startRecording() {

  var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "pt_BR";

recognition.onresult = function(event) {
  var final_transcript = '';

  console.log(event);

  for (var i = event.resultIndex; i < event.results.length; ++i)    {
    if (event.results[i].isFinal) {
      console.log("Speech recognized");
      final_transcript += event.results[i][0].transcript;
    } 
  }
  final_transcript = final_transcript.trim();
  console.log(final_transcript);

  //var split = final_transcript.split();

  var index = final_transcript.indexOf(" ");
  var split = final_transcript.substr(0, index); 

  var buttonName = final_transcript.substr(index + 1);
    
  var index2 = buttonName.indexOf(" ");
  var split2 = buttonName.substr(0, index2);   
  
  var value = buttonName.substr(index2 + 1);
    
  console.log(split);
  console.log(buttonName);

  switch ( split ) {
    case "clicar" : { clicar(buttonName) }
    case "preencher" : { preencher(split2,value) }
    default: null
  }
};

recognition.start();

})();



