var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))

module.exports = {
    semEval: function(messageText){

        if ( (messageText.indexOf('room' || 'accomodation' || 'hotel') > -1)  ) {
          return "Are you looking for accomodations? ";
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

