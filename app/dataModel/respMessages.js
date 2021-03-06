var path = require('path');
var fbGraph = require(path.join(__dirname, 'fbGraph.js'))
var appJS = require(path.join(__dirname, '/../../app.js'))
const request = require('request');

/*
 * Create a response message in JSON. 
 * Send the message to Facebook Graph Send API (in the fbGraph.js file).
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
    
    //create start page greetings that is above the Get Started button
    startGreetings: function(){
      var messageData = {
        setting_type:"greeting",
        greeting:{
          text:"Hi {{user_first_name}}!! :) Welcome! I'm a travel chatbot that can guide you when you visit Kronoberg. \n\nPress the Get Started button below to start the chat:)"
        }
      };
      fbGraph.sendAPI_setThread(messageData,function(response){
        return response;
      });
    },
    
    //create the Get Started button 
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
    
    //persistent main menu, at the three stacked lines left to the chat input field
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
    
    //Send a Structured Message (Generic Message type)
    generic: function(recipientId, placeArr){
    //placeArr[counter] = [name, type, address, ref, lat, lng, website];

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

  //Send a text message
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
    
  /*Send a button message of historical places. 
  The two button options are museums and churches*/
  histplace_btns: function(recipientId, username){
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Yes of course "+username+" ;) What type of historical place?",
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
    
  //Send weather list view from Wunderground API
  weatherList: function(recipientId, weatherArr){
    var messageData = {
      "recipient":{
        "id":recipientId
      }, 
      "message": {
        "attachment": {
          "type": "template",
          "payload": {
              "template_type": "list",
              "elements": [
                  {
                    "title": "Todays weather in "+weatherArr[0]['city'],
                    "image_url": weatherArr[0]['img'],
                    "subtitle": weatherArr[0]['weather']+". High "+weatherArr[0]['tempC']+" C."
                  }, {
                  "title": "Tomorrow "+weatherArr[1]['dayName']+"'s weather:",
                    "image_url": weatherArr[1]['img'],
                    "subtitle": weatherArr[1]['d2cond']+". High "+weatherArr[1]['d2tempC']+" C."
                  }, {
                    "title": "Weather on "+weatherArr[2]['dayName'],
                    "image_url": weatherArr[2]['img'],
                    "subtitle": weatherArr[2]['d3cond']+". High "+weatherArr[2]['d3tempC']+" C."
                  }
              ],
             "buttons": [
                {
                  "title": "View weather details at Wunderground.com",
                  "type": "web_url",
                  "url": weatherArr[0]['detail_url'],
                }
            ]  
        }
      }
    } 
  };
    
    fbGraph.callSendAPI(messageData,function(response){
      return response;
    });
  }
};
