var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
var events = require(path.join(__dirname, 'events.js'))
var chat_info = require(path.join(__dirname, '/../dataModel/respMessages.js'))

const 
    crypto = require('crypto'), 
    request = require('request');

/* 
 * Description: this file is the main controller of the web applicaation.
 * This files contains functions that can be accessed from the Express Router.
 * The controller deligates furhter to server side modules for handeling the tasks.
 */

//subscribes to the webhook and establishes a chat event channel
module.exports.get_webhook = function(req,res){

 if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === appJS.verify_token) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
}

//recieving new messages from the chatbot user
module.exports.post_webhook = function(req,res){
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    
    // Iterate over each entry
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging events
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          events.receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          events.receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          events.receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          events.receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          events.receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          events.receivedAccountLink(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });
    
    //returning status ok that this chatbot received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
}

//authorizes the chatbot
module.exports.authorize = function(req,res){

  var accountLinkingToken = req.query.account_linking_token;
  var redirectURI = req.query.redirect_uri;

  var authCode = "1234567890";

  // Redirect users to this URI on successful login
  var redirectURISuccess = redirectURI + "&authorization_code=" + authCode;

  res.render('authorize', {
    accountLinkingToken: accountLinkingToken,
    redirectURI: redirectURI,
    redirectURISuccess: redirectURISuccess
  });
}








