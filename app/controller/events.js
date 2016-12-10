var path = require('path');
var chats = require(path.join(__dirname, '/../dataModel/chats.js'))

module.exports = {
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
    
        chats.sendTextMessage(senderID, "Quick reply tapped");
        return;
      }
    
      if (messageText) {
    
        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.
        switch (messageText) {
          case 'image':
            chats.sendImageMessage(senderID);
            break;
    
          case 'gif':
            chats.sendGifMessage(senderID);
            break;
    
          case 'audio':
            chats.sendAudioMessage(senderID);
            break;
    
          case 'video':
            chats.sendVideoMessage(senderID);
            break;
    
          case 'file':
            chats.sendFileMessage(senderID);
            break;
    
          case 'button':
            chats.sendButtonMessage(senderID);
            break;
    
          case 'generic':
            chats.sendGenericMessage(senderID);
            break;
    
          case 'receipt':
            chats.sendReceiptMessage(senderID);
            break;
    
          case 'quick reply':
            chats.sendQuickReply(senderID);
            break;        
    
          case 'read receipt':
            chats.sendReadReceipt(senderID);
            break;        
    
          case 'typing on':
            chats.sendTypingOn(senderID);
            break;        
    
          case 'typing off':
            chats.sendTypingOff(senderID);
            break;        
    
          case 'account linking':
            chats.sendAccountLinking(senderID);
            break;
    
          default:
            chats.sendTextMessage(senderID, "Hi and welcome! \n\nExample of chat words you can send to the bot: generic, button, receipt and quick reply. For example type the word 'generic'. \n\nEcho of you text: "+messageText);//messageText);
        }
      } else if (messageAttachments) {
        chats.sendTextMessage(senderID, "Message with attachment received");
      }
    }
            
        
    
};