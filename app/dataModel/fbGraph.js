
var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
const https = require('https');
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
    }, 
    
    sendAPI_setThread: function(messageData){
      request({
        uri: 'https://graph.facebook.com/v2.6/me/thread_settings?access_token='+appJS.page_access_token,
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
    },
    
    userName: function(recipientId, callback){
      var access_token = appJS.page_access_token;
      var url=  'https://graph.facebook.com/v2.6/'+recipientId+'?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token='+access_token;
      https.get(url, function(response) {
        var data ='';
        
        response.on('data', function(d) {
          data += d;
        });
  
        response.on('end', function() {
          var parsed = JSON.parse(data);
          var name = parsed.first_name;
          console.log('USER NAME: '+ data);
          return callback(name);
          
        
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });        
    
    });
  }
}