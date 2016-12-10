var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))

module.exports = {
    semEval: function(recipientId, messageText){
         var messageData = {
          recipient: {
            id: recipientId
          },
          message: {
            text: "Welcome! Your text was: " + messageText
          }
        };
      
          fbGraph.callSendAPI(messageData,function(response){
                return response;
          });
    }
        
    
};