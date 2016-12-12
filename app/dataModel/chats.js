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
            (capitalTxt.indexOf('SPEND THE NIGHT') > -1)) {
              
            return chat_info.sendQuickReply(senderID);

        } 
        if( (capitalTxt.indexOf('FOOD') > -1) || (capitalTxt.indexOf(' EAT') > -1) || (capitalTxt == "EAT") ||
            (capitalTxt == "EATINGS") || (capitalTxt == "EATING") || (capitalTxt.indexOf('RESTAURANT') > -1) || 
            (capitalTxt.indexOf('HUNGRY') > -1) ){
                return "ah do you want suggestions of where to eat? Here are some restaurants I would recommend:..(not developed yet)"
        }
        if( (capitalTxt.indexOf('ATTRACTION') > -1) || (capitalTxt.indexOf('THINGS TO SEE') > -1) || 
            (capitalTxt == "PLACES TO VISIT") || (capitalTxt == "HISTORICAL PLACES") || (capitalTxt == "MUST SEE") ||
            (capitalTxt.indexOf('VIEWS') > -1) ){
                return "Of course! Let me give you some suggestions of places you must see!!:..(not developed yet)"
        }
        if(capitalTxt == 'MY LOCATION'){
            return chat_info.sendQuickReply(senderID)
        }
        if(capitalTxt == 'GEO'){
            var res;
            var reply = googleAPI.google_geocode("pizza",function(response){
                console.log("Request to Google Places API");
                res = response;
                return res
            });
            //return reply
            //return googleAPI.google_geocode("pizza")
        }

        if ((capitalTxt == "HI") || (capitalTxt == "HI!") || (capitalTxt == "HI!!") || (capitalTxt == "HELLO") || 
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

