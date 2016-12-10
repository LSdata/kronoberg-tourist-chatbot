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
        if(capitalTxt.indexOf('food'.toUpperCase())){
            return ("do you want suggestions on were to eat?")
        }
        if ((messageText == "hi") || (messageText == "Hi") || (messageText == "Hi!")|| (messageText == "hi!") || 
            (messageText == "hello")|| (messageText == "Hello")|| (messageText == "Hello!") || 
            (messageText == "hello!") || (messageText == "hey") || (messageText == "Hey") || 
            (messageText == "hey!") || (messageText == "Hey!") || (messageText == "Hi there!") || 
            (messageText == "hi there") || (messageText == "hi :)") || (messageText == "hi there!")){
            return "Hi! :)";
        }
        else {
          return "I'm sorry I didn't quite get that. \nBut here is a list of common topics many visitors are searching for: ";
        }
    }
};

