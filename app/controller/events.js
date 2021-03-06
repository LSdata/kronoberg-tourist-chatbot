var path = require('path');
var chat_info = require(path.join(__dirname, '/../dataModel/respMessages.js'));
var chitchat = require(path.join(__dirname, '/../dataModel/ai.js'));
var fbGraph = require(path.join(__dirname, '/../dataModel/fbGraph.js'));
var weather = require(path.join(__dirname, '/../dataModel/weatherAPI.js'));

/* 
 * Description: this file is the part of the controller handeling messaging events.
 * This files contains functions that can be accessed from the Express Router.
 * The controller deligates furhter to server side modules for handeling the tasks.
 */

module.exports = {

/*
 * Message Event
 *
 * This event is called when a message is sent to the chatbot. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * 
 * More infor at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 */
    receivedMessage: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var message = event.message;
    
      console.log("Received message for user %d and page %d at %d with message:", 
        senderID, recipientID, timeOfMessage);
      console.log(JSON.stringify(message));
    
      var isEcho = message.is_echo;
      var messageId = message.mid;
      var appId = message.app_id;
      var metadata = message.metadata;
    
      var messageText = message.text;
      var messageAttachments = message.attachments;
      var quickReply = message.quick_reply;
    
      if (isEcho) {
        //logging message echoes to console
        console.log("Received echo for message %s and app %d with metadata %s", 
          messageId, appId, metadata);
        return;
      } else if (quickReply) {
        var quickReplyPayload = quickReply.payload;
        console.log("Quick reply for message %s with payload %s",
          messageId, quickReplyPayload);
    
        chat_info.sendTextMessage(senderID, "Quick reply tapped");
        return;
      }
    
      if (messageText) {
        
        //check for reply on question of weather city
        if(global.askedForCity){
          global.askedForCity = 0; //reset flag

          weather.weatherByCity(messageText, function(weatherData){
            if(weatherData)
              chat_info.weatherList(senderID, weatherData);
            else{
              global.askedForCity = 1;
              chat_info.sendTextMessage(senderID, "hmm..I'm so sorry I couldn't find any weather info at that city! Please try again and write only the city name! \n\n(Write letter 'a' for swedish 'å' and 'ä' and o for 'ö'. Ex vaxjo for växjö)");
            }
          });  
        }else{
        
        var botReply = chitchat.semEval(senderID, messageText);
        if(botReply)
          chat_info.sendTextMessage(senderID, botReply);
        }
      } 
      else if (messageAttachments) {
        chat_info.sendTextMessage(senderID, "Great! 👍 You can now tap on the map above to zoom or to enter directions to a place if you like");
      }
    }, 
    
    /*
     * This event is called when the Link Account or UnLink Account action has been
     * tapped.
     * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
     * 
     */
     receivedAccountLink: function(event){

        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        
        var status = event.account_linking.status;
        var authCode = event.account_linking.authorization_code;
        
        console.log("Received account link event with for user %d with status %s " +
        "and auth code %s ", senderID, status, authCode);
    }, 
    
    /*
     * Authorization Event
     * More info at https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
     */
    receivedAuthentication: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfAuth = event.timestamp;
    
      // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
      var passThroughParam = event.optin.ref;
    
      console.log("Received authentication for user %d and page %d with pass " +
        "through param '%s' at %d", senderID, recipientID, passThroughParam, 
        timeOfAuth);
      chat_info.startGreetings();
      chat_info.startBtn();

      chat_info.sendTextMessage(senderID, "Hi :) You are now authenticated to this site. Welcome! How can I help you?");
    },

/* This event is sent to confirm the delivery of a message. 
 * More info at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 */
    receivedDeliveryConfirmation: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var delivery = event.delivery;
      var messageIDs = delivery.mids;
      var watermark = delivery.watermark;
      var sequenceNumber = delivery.seq;
    
      if (messageIDs) {
        messageIDs.forEach(function(messageID) {
          console.log("Received delivery confirmation for message ID: %s", 
            messageID);
        });
      }
      console.log("All message before %d were delivered.", watermark);
    },

/* This event is called when a postback is tapped on a Structured Message. 
 * More infor at https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 */
    receivedPostback: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfPostback = event.timestamp;
    
      // 'payload' parameters are used to identify button events in structured messages 
      var payload = event.postback.payload;
      
      if (payload =="USER_DEFINED_PAYLOAD"){
        chat_info.pers_startmenu();
        
        //get user name from Facebook graph User Profile API and send start message
        fbGraph.userName(senderID, function(response){
          chat_info.sendTextMessage(senderID, "Hi and welcome "+response+"!! :) \nHow can I help you today? \nWhat are you looking for in Kronoberg?");
        }); 
      }
      else if (payload =="start"){
        chat_info.sendTextMessage(senderID, "Hi and welcome!! :) \nHow can I help you today? \nWhat are you looking for in Kronoberg?");
      }
      else if (payload =="accomodation"){
        var botReply = chitchat.semEval(senderID, "accomodation");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="eat"){
        var botReply = chitchat.semEval(senderID, "food");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="histplace"){
        var botReply = chitchat.semEval(senderID, "historical places");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="church"){
        var botReply = chitchat.semEval(senderID, "church");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="museum"){
        var botReply = chitchat.semEval(senderID, "museum");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="weather"){
        var botReply = chitchat.semEval(senderID, "weather");
        chat_info.sendTextMessage(senderID, botReply)
      }
      else if (payload =="mylocation"){
        var botReply = chitchat.semEval(senderID, "my location");
        chat_info.sendTextMessage(senderID, botReply)
      }
      console.log("Received postback for user %d and page %d with payload '%s' " + 
        "at %d", senderID, recipientID, payload, timeOfPostback);
    },

    /* This event is called when a previously-sent message has been read.
     * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
     */
    receivedMessageRead: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
    
      // All messages before watermark (a timestamp) or sequence have been seen.
      var watermark = event.read.watermark;
      var sequenceNumber = event.read.seq;
    
      console.log("Received message read event for watermark %d and sequence " +
        "number %d", watermark, sequenceNumber);
    }
};