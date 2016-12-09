var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))
var appJS = require(path.join(__dirname, '/../../app.js'))

const request = require('request');

/*
 * Send a message with the account linking call-to-action
 *
 */
module.exports = {
    sendAccountLinking: function(recipientId){
        var messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "button",
                        text: "Welcome. Link your account.",
                        buttons:[{
                            type: "account_link",
                            url: appJS.server_url + "/authorize"
                        }]
                    }
                }
            }
        };  
    
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });
    },
     //Turn typing indicator off
    sendTypingOff: function(recipientId){
        console.log("Turning typing indicator off");
        
        var messageData = {
            recipient: {
                id: recipientId
            },
        sender_action: "typing_off"
        };
        
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });

    }, 
    
    // Turn typing indicator on
    sendTypingOn: function(recipientId){
        console.log("Turning typing indicator on");
        
        var messageData = {
            recipient: {
                id: recipientId
            },
            sender_action: "typing_on"
        };
        
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });
    },
    
    /*
 * Send a message with Quick Reply buttons.
 *
 */
    sendQuickReply: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "What's your favorite movie genre?",
          quick_replies: [
            {
              "content_type":"text",
              "title":"Action",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
            },
            {
              "content_type":"text",
              "title":"Comedy",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
            },
            {
              "content_type":"text",
              "title":"Drama",
              "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
            }
          ]
        }
      };
    
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });
    },

        /*
         * Send a read receipt to indicate the message has been read
         *
         */
    sendReadReceipt: function(recipientId){
          console.log("Sending a read receipt to mark message as seen");
        
          var messageData = {
            recipient: {
              id: recipientId
            },
            sender_action: "mark_seen"
          };
        
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });
    }
};
