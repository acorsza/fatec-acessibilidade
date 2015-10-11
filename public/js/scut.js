'use strict';

var voiceCommands = {
  "pt-BR" : {
    click : "clicar",
    fill : "preencher",
    up : "subir",
    down : "descer",
    top : "início",
    bottom : "final"
  },
  "en-US" : {
    click : "click",
    fill : "fill",
    up : "up",
    down : "down",
    top : "top",
    bottom : "bottom"
  }
};

var config = {
  lang : "pt-BR",
  //lang : navigator.language,
}

function init() {
  console.log(" scut.js :: init :: " + navigator.language);

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = config.lang;
  recognition.start();
  recognition.onstart = function() {
    console.log("Recognition started");
  };

  recognition.onerror = function(e) {
    console.log("Error");
  };

  recognition.onresult = function(e) {
    console.log(" scut.js :: init :: onresult " + JSON.stringify(e));

    var transcript = '';

    for ( var i = e.resultIndex ; i < e.results.length ; ++i )    {
        transcript += e.results[i][0].transcript.trim();
    }
    
    console.log(" Speech recognition result :: " + transcript);

    var command = getCommand( transcript );
    var value = transcript.substr(transcript.indexOf(" "));

    switch ( command ) {
      case voiceCommands[config.lang].click : { click ( value ); break; };
      case voiceCommands[config.lang].fill : { fill ( value ); break; };
      case voiceCommands[config.lang].up : { scroll ( -1 ); break; };
      case voiceCommands[config.lang].down : { scroll ( 1 ); break; };
      case voiceCommands[config.lang].top : { extremity ( -1 ); break; };
      case voiceCommands[config.lang].bottom : { extremity ( 1 ); break; };
      default: null;
    }
  };

  recognition.onend = function() {
    console.log("Speech recognition ended");
    recognition.start();
  };

  recognition.onstop = function() {
    console.log("Speech recognition stopped");
    recognition.start();
  };
}

function getCommand ( voiceCommand ) {
  console.log(" scut.js :: getCommand ");

  var voiceCommand = voiceCommand.split(" ")[0];
  return voiceCommand;
}

function click ( args ) {
  console.log(" scut.js :: click ");

  args = args;

  var buttonName = null, 
      input = null,
      button = null,
      a = null,
      fields = [];
  
  buttonName = args.trim().split(" ").pop();
  button = document.getElementsByTagName("button"); 
  input = document.getElementsByTagName("input");
  a = document.getElementsByTagName("a");

  fields = Object.assign(a, input, button);

  console.log(fields);
  console.log(JSON.stringify(fields));

  for (var field in fields) {
    if ( fields[field].tagName === "A" && fields[field].type !== undefined && fields[field].type !== "submit" ) {
      console.log(" Deleting item :: " + fields[field].type);
      delete fields[field];
    }
  }

  for (var field in fields) {
    var buttonToCompare = fields[field].innerText;

    console.log(field);
    console.log(JSON.stringify(field));

    if ( fields[field] !== undefined ) {
      if ( (fields[field].type !== undefined 
        && fields[field].type === "submit" 
        && fields[field].onclick !== undefined ) 
          || ( fields[field].onclick !== undefined && fields[field].onclick !== null ) ) {
        if (buttonName.toLowerCase() === buttonToCompare.toLowerCase()) {
          fields[field].onclick();
          break;
        }
      } else if ( fields[field].href !== undefined ) {
        console.log(fields[field].innerText.toLowerCase());
        console.log(buttonName.toLowerCase());
        if ( fields[field].innerText.toLowerCase().trim().split(" ").pop() === buttonName.toLowerCase() ) {
          console.log(" Link clicado " + fields[field].href);
          window.location.assign(fields[field].href);
          break;
          //window.location("http://www.w3schools.com");
        }
      }
    }
  }
}

function fill ( args ) {
  console.log(" scut.js :: fill ");

  args = args.trim();

  var fieldName = null, 
      input = null,
      textarea = null, 
      fieldValue = null, 
      fields = [];

  fieldName = args.split(" ")[0].toLowerCase();
  fieldValue = args.substr(args.indexOf(" "));

  input = document.getElementsByTagName("input");
  textarea = document.getElementsByTagName("textarea");

  fields = Object.assign(input, textarea);

  if ( fieldName === "email"|| fieldName === "e-mail") {
    fieldValue = fieldValue.replace("arroba","@");
    fieldValue = fieldValue.trim().replace(/\s+/g, '').toLowerCase();
  }

  for (var field in fields) {
    if ( fields[field] !== undefined && fields[field].placeholder !== undefined && ( fieldName === fields[field].placeholder.toLowerCase() )) {
      fields[field].value = fieldValue;
      break;
    }
  }
}

function scroll (direction) {
    window.scrollBy(0, 500 * direction);
}

function extremity (direction) {
    window.scrollBy(0, 50000 * direction);
}

function removeSingleLetters( args ) {
  console.log(" scut.js :: removeSingleLetters ");

  args = args.split(" ");
  if ( args[0].length <= 2 ) {
    args.splice(1, 1);
  }
  args = args.toString().replace(/,/g, " ");
  return args;
}

init();
