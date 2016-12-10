var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))

module.exports = {
    semEval: function(messageText){

        if (messageText.indexOf('room') > -1) {
          return "Are you looking for accomodations? ";
        } 
        if ((messageText == "hi") || (messageText == "Hi")){
            return "Hi! :)";
        }
        else {
          return "I didn't understand that. Here is a list of common topics many visitors are searching for: ";
        }
    }
};

