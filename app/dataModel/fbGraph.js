
var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))

const request = require('request');

/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */
module.exports = {
  callSendAPI: function(messageData){
      request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: appJS.page_access_token },
        method: 'POST',
        json: messageData
    
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var recipientId = body.recipient_id;
          var messageId = body.message_id;
    
          if (messageId) {
            console.log("Successfully sent message with id %s to recipient %s", 
              messageId, recipientId);
          } else {
          console.log("Successfully called Send API for recipient %s", 
            recipientId);
          }
        } else {
          console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
      });  
    }
}