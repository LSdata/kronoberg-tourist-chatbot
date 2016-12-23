var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const http = require('http');

// Geocode an address.
module.exports = {

  weatherByCity: function(city, callback){

    var key = appJS.wunderground_api_key;
    var url = "http://api.wunderground.com/api/"+key+"/geolookup/conditions/q/IA/Cedar_Rapids.json";

    http.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        callback(city);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function checkCity(cityName){
    return "ok";
}