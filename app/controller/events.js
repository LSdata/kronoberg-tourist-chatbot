var path = require('path');
var chat_info = require(path.join(__dirname, '/../dataModel/chat-info.js'))
var chitchat = require(path.join(__dirname, '/../dataModel/chats.js'))

module.exports = {

    /*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 * 
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
    
      // You may get a text or attachment but not both
      var messageText = message.text;
      var messageAttachments = message.attachments;
      var quickReply = message.quick_reply;
    
      if (isEcho) {
        // Just logging message echoes to console
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
        var botReply = chitchat.semEval(senderID, messageText);
        chat_info.sendTextMessage(senderID, botReply)
      } 
      else if (messageAttachments) {
        chat_info.sendTextMessage(senderID, "Thank you!");
      }
    }, 
    
    /*
     * Account Link Event
     *
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
     *
     * The value for 'optin.ref' is defined in the entry point. For the "Send to 
     * Messenger" plugin, it is the 'data-ref' field. Read more at 
     * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
     *
     */
    receivedAuthentication: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfAuth = event.timestamp;
    
      // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
      // The developer can set this to an arbitrary value to associate the 
      // authentication callback with the 'Send to Messenger' click event. This is
      // a way to do account linking when the user clicks the 'Send to Messenger' 
      // plugin.
      var passThroughParam = event.optin.ref;
    
      console.log("Received authentication for user %d and page %d with pass " +
        "through param '%s' at %d", senderID, recipientID, passThroughParam, 
        timeOfAuth);
    
      // When an authentication is received, we'll send a message back to the sender
      // to let them know it was successful.
      chat_info.sendTextMessage(senderID, "Hi :) You are now authenticated to this site. Welcome! How can I help you?");
      chat_info.startGreetings();
      chat_info.startBtn();
    },



/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about 
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
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

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message. 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 * 
 */
    receivedPostback: function(event){
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var timeOfPostback = event.timestamp;
    
      // The 'payload' param is a developer-defined field which is set in a postback 
      // button for Structured Messages. 
      var payload = event.postback.payload;
      
      if (payload =="USER_DEFINED_PAYLOAD"){
          chat_info.pers_startmenu();
          chat_info.sendTextMessage(senderID, "Hi!! :) Welcome! How can I help you today? What are you looking for in Kronoberg?");
      }
      else if (payload =="accomodation"){
          chat_info.sendTextMessage(senderID, "ok! Here are some suggestions of accomodations that I would recommed:..(not developed yet)");
      }
      else if (payload =="eat"){
          chat_info.sendTextMessage(senderID, "ah let me give you some eatings suggestions:..(not developed yet)");
      }
      else if (payload =="attraction"){
          chat_info.sendTextMessage(senderID, "Of course! Let me give you some suggestions of places you must see!!:..(not developed yet)");
      }

      console.log("Received postback for user %d and page %d with payload '%s' " + 
        "at %d", senderID, recipientID, payload, timeOfPostback);
    },

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 * 
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