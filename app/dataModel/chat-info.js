var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))
var appJS = require(path.join(__dirname, '/../../app.js'))

const request = require('request');

/*
 * Send a message with the account linking call-to-action
 *
 */
module.exports = {
    
    //Send a message with Quick Reply buttons.
    sendQuickReply: function(recipientId){
      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          text: "Ok! Please share your location below! I can then show you on a map ;)",
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
            title:"Restaurants",
            payload:"eat"
          },{
            type:"postback",
            title:"Historical places",
            payload:"histplace"
          },{
            type:"postback",
            title:"Your position on map",
            payload:"mylocation"
          }, {
            type:"postback",
            title:"Weather",
            payload:"weather"
          }]
      };

      fbGraph.sendAPI_setThread(messageData,function(response){
        return response;
      });
    },

    //Send a read receipt to indicate the message has been read.
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
    generic: function(recipientId, placeArr){
    //placeArr[counter] = [name, type, address, ref, lat, lng];

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
            title: placeArr[0][0],
            image_url: placeArr[0][3], 
            subtitle: placeArr[0][1],
            item_url: placeArr[0][6],               
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[0][4] +","+placeArr[0][5],
              title: placeArr[0][2]
            }]
          }, {
            title: placeArr[1][0],
            image_url: placeArr[1][3], 
            subtitle: placeArr[1][1],
            item_url: placeArr[1][6],               
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[1][4] +","+placeArr[1][5],
              title: placeArr[1][2]
            }]
            }, {
            title: placeArr[2][0],
            image_url: placeArr[2][3], 
            subtitle: placeArr[2][1],
            item_url: placeArr[2][6],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[2][4] +","+placeArr[2][5],
              title: placeArr[2][2]
            }]
            }, {
            title: placeArr[3][0],
            image_url: placeArr[3][3], 
            subtitle: placeArr[3][1],
            item_url: placeArr[3][6],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[3][4] +","+placeArr[3][5],
              title: placeArr[3][2]
            }]
            }, {
            title: placeArr[4][0],
            image_url: placeArr[4][3], 
            subtitle: placeArr[4][1],
            item_url: placeArr[4][6],
            buttons: [{
              type: "web_url",
              url: "http://maps.google.com/maps?q=loc:"+placeArr[4][4] +","+placeArr[4][5],
              title: placeArr[4][2]
            }]
            }
            ]
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
    
  //Send a button message using the Send API.
  histplace_btns: function(recipientId){
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Ok ;) What type of historical place?",
            buttons:[{
              type: "postback",
              title: "museums",
              payload: "museum"
            }, {
              type: "postback",
              title: "churches",
              payload: "church"
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
  
  userProfile: function(recipientId, callback){
    var access_token = appJS.page_access_token;
    var url=  'https://graph.facebook.com/v2.6/'+recipientId+'?fields=first_name&access_token='+access_token;
    
    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        var name = data.first_name;
        console.log('USER NAME: '+ name);
        return callback(name);
        
      
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
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
