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
    
    //Send a message with Quick Reply buttons.
    sendQuickReply: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Ok! Please share your location so I can give suggestions of nearby accomodation places and directions? (..not developed furhter yet)",
          quick_replies: [
            {
              "content_type":"location",
              "title": "share my location"
            }
          ]
        }
      };
    
        fbGraph.callSendAPI(messageData,function(response){
            return response;
        });
    },
    
    //Set start greetings
    startGreetings: function(){
      var messageData = {
        setting_type:"greeting",
        greeting:{
          text:"Hi {{user_first_name}}!! :) Welcome! I'm travel bot  that can guide you when you visit Kronoberg. \n\nLet's have a chat and let me know what you are looking for in Kronoberg! Press the Get Started button below :)"
        }
      };
      
      fbGraph.sendAPI_setThread(messageData,function(response){
        return response;
      });

    },
    
    //set the get started button 
    startBtn: function(){
      var messageData = {
        "setting_type":"call_to_actions",
        "thread_state":"new_thread",
        "postback":{
          "payload":"start"
        }
      };
      fbGraph.sendAPI_setThread(messageData,function(response){
        return response;
      });
    },
    
    //persistent start menu 
    pers_startmenu: function(){
      var messageData = {
        setting_type: "call_to_actions",
        thread_state: "existing_thread",
        call_to_actions:[
          {
            type:"postback",
            title:"Accomodations",
            payload:"accomodation"
          }, {
            type:"postback",
            title:"Eatings",
            payload:"eat"
          },{
            type:"postback",
            title:"Places to visit",
          payload:"attraction"
          },{
            type:"web_url",
            title:"Link to my Website",
            url:"https://kronoberg-tourist-chatbot.herokuapp.com/"
          }]
      };

      fbGraph.sendAPI_setThread(messageData,function(response){
        return response;
      });
    },

    //Send a read receipt to indicate the message has been read
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
    },
    
    //Send a Structured Message (Generic Message type) using the Send API.
    sendGenericMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [{
                title: "rift",
                subtitle: "Next-generation virtual reality",
                item_url: "https://www.oculus.com/en-us/rift/",               
                image_url: appJS.server_url + "/assets/rift.png",
                buttons: [{
                  type: "web_url",
                  url: "https://www.oculus.com/en-us/rift/",
                  title: "Open Web URL"
                }, {
                  type: "postback",
                  title: "Call Postback",
                  payload: "Payload for first bubble",
                }],
              }, {
                title: "touch",
                subtitle: "Your Hands, Now in VR",
                item_url: "https://www.oculus.com/en-us/touch/",               
                image_url: appJS.server_url + "/assets/touch.png",
                buttons: [{
                  type: "web_url",
                  url: "https://www.oculus.com/en-us/touch/",
                  title: "Open Web URL"
                }, {
                  type: "postback",
                  title: "Call Postback",
                  payload: "Payload for second bubble",
                }]
              }]
            }
          }
        }
      };  
    
      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
    },
    
    //Send a Structured Message (Generic Message type) using the Send API.
    generic: function(recipientId, data){
      var parsed = JSON.parse(data);
      //console.log(data);
     
      //extract the maps url
      var gmapsURL = parsed['results'][10].photos[0].html_attributions[0]
      gmapsURL = gmapsURL.replace(/['"]+/g, '');
      gmapsURL = gmapsURL.slice(8);
      gmapsURL = gmapsURL.substring(0, gmapsURL.indexOf('>'));
      
      //get all types
      var types = getAllTypes(parsed['results'][10].types);

      //getPhoto(photoRef);
      
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [{
                title: parsed['results'][10].name,
                subtitle: parsed['results'][10].types[0],
                //item_url: gmapsURL,               
                buttons: [{
                  type: "web_url",
                  url: gmapsURL,
                  title: "view on map"
                }],
              }, {
                title: "touch",
                subtitle: "Your Hands, Now in VR",
                item_url: "https://www.oculus.com/en-us/touch/",               
                image_url: appJS.server_url + "/assets/touch.png",
                buttons: [{
                  type: "web_url",
                  url: "https://www.oculus.com/en-us/touch/",
                  title: "Open Web URL"
                }, {
                  type: "postback",
                  title: "Call Postback",
                  payload: "Payload for second bubble",
                }]
              }]
            }
          }
        }
      };  
      
      console.log(gmapsURL);

      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });

    },

    //Send a receipt message using the Send API.
    sendReceiptMessage: function(recipientId){
  
      // Generate a random receipt ID as the API requires a unique ID
      var receiptId = "order" + Math.floor(Math.random()*1000);
    
      var messageData = {
        recipient: {
          id: recipientId
        },
        message:{
          attachment: {
            type: "template",
            payload: {
              template_type: "receipt",
              recipient_name: "Peter Chang",
              order_number: receiptId,
              currency: "USD",
              payment_method: "Visa 1234",        
              timestamp: "1428444852", 
              elements: [{
                title: "Oculus Rift",
                subtitle: "Includes: headset, sensor, remote",
                quantity: 1,
                price: 599.00,
                currency: "USD",
                image_url: appJS.server_url + "/assets/riftsq.png"
              }, {
                title: "Samsung Gear VR",
                subtitle: "Frost White",
                quantity: 1,
                price: 99.99,
                currency: "USD",
                image_url: appJS.server_url + "/assets/gearvrsq.png"
              }],
              address: {
                street_1: "1 Hacker Way",
                street_2: "",
                city: "Menlo Park",
                postal_code: "94025",
                state: "CA",
                country: "US"
              },
              summary: {
                subtotal: 698.99,
                shipping_cost: 20.00,
                total_tax: 57.67,
                total_cost: 626.66
              },
              adjustments: [{
                name: "New Customer Discount",
                amount: -50
              }, {
                name: "$100 Off Coupon",
                amount: -100
              }]
            }
          }
        }
      };

      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
    }, 
    
    //Send a video using the Send API.
    sendVideoMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "video",
            payload: {
              url: appJS.server_url + "/assets/allofus480.mov"
            }
          }
        }
      };
    
      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
  },
    
    //Send a file using the Send API.
    sendFileMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "file",
            payload: {
              url: appJS.server_url + "/assets/test.txt"
            }
          }
        }
      };
    
      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
  },

  //Send a text message using the Send API.
  sendTextMessage: function(recipientId, messageText){
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText,
        metadata: "DEVELOPER_DEFINED_METADATA"
      }
    };
  
    fbGraph.callSendAPI(messageData,function(response){
      return response;
    });
  },

  //Send a button message using the Send API.
  sendButtonMessage: function(recipientId){
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "This is test text",
            buttons:[{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Trigger Postback",
              payload: "DEVELOPER_DEFINED_PAYLOAD"
            }, {
              type: "phone_number",
              title: "Call Phone Number",
              payload: "+16505551234"
            }]
          }
        }
      }
    };  
  
        fbGraph.callSendAPI(messageData,function(response){
              return response;
        });
    }, 
    
  //Send an image using the Send API.
  sendImageMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "image",
            payload: {
              url: appJS.server_url + "/assets/rift.png"
            }
          }
        }
      };
    
      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
  },

  //Send a Gif using the Send API.
  sendGifMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "image",
            payload: {
              url: appJS.server_url + "/assets/instagram_logo.gif"
            }
          }
        }
      };

      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
  },

  //Send audio using the Send API.
  sendAudioMessage: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "audio",
            payload: {
              url: appJS.server_url + "/assets/sample.mp3"
            }
          }
        }
      };

      fbGraph.callSendAPI(messageData,function(response){
            return response;
      });
  },
  
/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */
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
};

function getAllTypes(typesArr){
  
  if(typesArr.length != null){
        console.log(typesArr.length);
      }
}
