var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const https = require('https');

// Geocode an address.
module.exports = {

  weatherByCity: function(type, callback){

    
    var url = "https://...";

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        
        
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function checkCity(cityName){
    return "ok";
}