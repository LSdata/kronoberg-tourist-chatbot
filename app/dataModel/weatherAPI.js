var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const http = require('http');

// Geocode an address.
module.exports = {

  weatherByCity: function(city, callback){

    var key = appJS.wunderground_api_key;
    var url = "http://api.wunderground.com/api/"+key+"/geolookup/conditions/q/Sweden/"+city+".json";

    http.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        console.log(data);
        var parsed = JSON.parse(data);
        
        if(parsed.response.error){
          console.log("City name is not valid!");
        }else{
            var weatherArr = [];
            weatherArr['city'] = parsed.current_observation.display_location.full;
            weatherArr['img'] = parsed.current_observation.icon_url;
            weatherArr['weather'] = parsed.current_observation.weather;
            weatherArr['tempC'] = parsed.current_observation.temp_c;
            weatherArr['detail_url'] = parsed.current_observation.ob_url;

            callback(weatherArr);

        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

