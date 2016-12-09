var path = require('path');
var fbGraph = require(path.join(__dirname, '/../dataModel/fbGraph.js'))
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
    }
}

/*
 * Turn typing indicator off
 *
 */
module.exports = {
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
    }
}