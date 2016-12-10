var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))

module.exports = {
    semEval: function(messageText){

        if (messageText.indexOf('hi') > -1) {
          return "hi :) ";
        } else {
          return "Welcome";
        }
    }
};

