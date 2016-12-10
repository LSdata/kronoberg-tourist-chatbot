module.exports = {
    semEval: function(recipientId, textMess){
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
        
    }

    
};