var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))
var chat_info = require(path.join(__dirname, 'chat-info.js'))
var googleAPI = require(path.join(__dirname, 'googleAPIs.js'))

module.exports = {
    semEval: function(senderID, messageText){
        var capitalTxt = messageText.toUpperCase();

        if ( (capitalTxt.indexOf('ROOM') > -1) || (capitalTxt.indexOf('ACCOMODATION') > -1) ||
            (capitalTxt.indexOf('HOTEL') > -1) || (capitalTxt.indexOf('PLACE TO STAY') > -1) ||
            (capitalTxt.indexOf('SLEEP') > -1) || (capitalTxt.indexOf('SLEEP OVER') > -1) ||
            (capitalTxt.indexOf('SPEND THE NIGHT') > -1) ||(capitalTxt.indexOf('LODGING') > -1)) {

            var type = 'lodging';
            googleAPI.getPlaces(type, function(response){
                chat_info.generic(senderID, response);
            }); 
            return "Alright! Let me give you some suggestions of accomodations! 🛌 (Tap on the adress to see the place on a map and zoom to Kronoberg)";
            
        } 
        else if( (capitalTxt.indexOf('FOOD') > -1) || (capitalTxt.indexOf(' EAT') > -1) || (capitalTxt == "EAT") ||
            (capitalTxt == "EATINGS") || (capitalTxt == "EATING") || (capitalTxt.indexOf('RESTAURANT') > -1) || 
            (capitalTxt.indexOf('HUNGRY') > -1) ){
                var type = 'restaurant';
                googleAPI.getPlaces(type, function(response){
                    chat_info.generic(senderID, response);
                }); 
            return "ah do you want suggestions of where to eat? 🍽  (Tap on the adress to see the place on a map and zoom to Kronoberg)";
        }
        else if( (capitalTxt.indexOf('PLACES TO VISIT') > -1) || (capitalTxt.indexOf('HISTORICAL') > -1) || 
            (capitalTxt == "MUST SEE") ||(capitalTxt.indexOf('HISTORY') > -1) ||
            (capitalTxt.indexOf('SIGHTS TO SEE') > -1) || (capitalTxt.indexOf('MUSEUM') > -1) || 
            (capitalTxt.indexOf('CHURCH') > -1)){
                var type = 'museum|church';
                googleAPI.getPlaces(type, function(response){
                    chat_info.generic(senderID, response);
                }); 

                return "Historical places? Of course, let me give you some suggestions of great museums and beautiful churches"
        }
        else if( (capitalTxt == 'MY LOCATION')|| (capitalTxt.indexOf('WHERE AM I') > -1)|| 
            (capitalTxt.indexOf('MY POSITION ON A MAP') > -1) || (capitalTxt.indexOf('MY POSITION ON A MAP') > -1) ){
            return chat_info.sendQuickReply(senderID)
        }
        else if ((capitalTxt == "HI") || (capitalTxt == "HI!") || (capitalTxt == "HI!!") || (capitalTxt == "HELLO") || 
            (capitalTxt == "HELLO!") || (capitalTxt == "HEY") || (capitalTxt == "HEY!") || (capitalTxt == "HEY!") || 
            (capitalTxt == "HI THERE!") || (capitalTxt == "HI THERE") || (capitalTxt == "HI :)") ){
            
            var greetings = [
                'hi!! :)',
                'hi there! :)',
                'hi!! :) what do you want to visit in Kronoberg?',
                'hello!! :) what do you want to visit in Kronoberg?',
                'Hi :) How can I help you?'
            ];
            
            var randomNr = Math.floor(Math.random()*greetings.length);
        
            return greetings[randomNr];
        }
        else {
          return "..I'm sorry I didn't quite get that. \n\n Please try the main menu below with the most common topics. It is in the icon with the three caret lines next to the text input field.";
        }
    }
};

