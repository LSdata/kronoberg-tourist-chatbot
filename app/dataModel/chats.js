var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))
var chat_info = require(path.join(__dirname, 'chat-info.js'))


module.exports = {
    semEval: function(senderID, messageText){
        var capitalTxt = messageText.toUpperCase();

        if ( (capitalTxt.indexOf('ROOM') > -1) || (capitalTxt.indexOf('ACCOMODATION') > -1) ||
            (capitalTxt.indexOf('HOTEL') > -1) || (capitalTxt.indexOf('PLACE TO STAY') > -1) ||
            (capitalTxt.indexOf('SLEEP') > -1) || (capitalTxt.indexOf('SLEEP OVER') > -1) ||
            (capitalTxt.indexOf('SPEND THE NIGHT') > -1)) {
            return "Are you looking for accomodations? (..not implemented yet) ";
        } 
        if( (capitalTxt.indexOf('FOOD') > -1) || (capitalTxt.indexOf(' EAT') > -1) || (capitalTxt == "EAT") ||
            (capitalTxt == "EATINGS") || (capitalTxt == "EATING") || (capitalTxt.indexOf('RESTAURANT') > -1) || 
            (capitalTxt.indexOf('HUNGRY') > -1) ){
                return "do you want suggestions of where to eat? (..not implemented yet)"
        }
        if( (capitalTxt.indexOf('ATTRACTIONS') > -1) || (capitalTxt.indexOf('THINGS TO SEE') > -1) || 
            (capitalTxt == "PLACES TO VISIT") || (capitalTxt == "HISTORICAL PLACES") || (capitalTxt == "MUST SEE") ||
            (capitalTxt.indexOf('VIEWS') > -1) ){
                return "do you want suggestions of historical places to visit? (..not implemented yet)"
        }
        if(capitalTxt == 'MY LOCATION'){
                return chat_info.sendQuickReply(senderID)
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

