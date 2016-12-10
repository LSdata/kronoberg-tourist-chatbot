var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))

module.exports = {
    semEval: function(messageText){
        var capitalTxt = messageText.toUpperCase();

        if ( (messageText.indexOf('room') > -1) || (messageText.indexOf('accomodation') > -1) ||
            (messageText.indexOf('hotel') > -1) || (messageText.indexOf('place to stay') > -1) ||
            (messageText.indexOf('sleep') > -1) || (messageText.indexOf('sleep over') > -1) ||
            (messageText.indexOf('spend the night') > -1)) {
            return "Are you looking for accomodations? ";
        } 
        if( (capitalTxt.indexOf('FOOD') > -1) || (capitalTxt.indexOf(' EAT') > -1) || (capitalTxt == "EAT") ||
            (capitalTxt.indexOf('RESTAURANT') > -1) || (capitalTxt.indexOf('HUNGRY') > -1) ){
                return "do you want suggestions of where to eat?"
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
          return "I'm sorry I didn't quite get that. \nBut here is a list of common topics many visitors are searching for: ";
        }
    }
};

