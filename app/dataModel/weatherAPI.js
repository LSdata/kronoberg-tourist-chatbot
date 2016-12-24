var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const http = require('http');

// Geocode an address.
module.exports = {

    //todays weather
  weatherByCity: function(city, callback){

    var key = appJS.wunderground_api_key;
    
    //the weather today by city
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
            weatherArr[0] = [];
            weatherArr[0]['city'] = parsed.current_observation.display_location.full;
            weatherArr[0]['img'] = parsed.current_observation.icon_url;
            weatherArr[0]['weather'] = parsed.current_observation.weather;
            weatherArr[0]['tempC'] = parsed.current_observation.temp_c;
            weatherArr[0]['detail_url'] = parsed.current_observation.ob_url;
            
            //new API call for weather day 2 and 3
            weatherNext2days(city, function(weather2d) {
              weatherArr[1] = [];
              weatherArr[1]['img'] = weather2d;
              callback(weatherArr);
              
            });


        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

//weather forecast 3 days
function weatherNext2days(city, callback){
    var key = appJS.wunderground_api_key;
    var url = "http://api.wunderground.com/api/"+key+"/geolookup/forecast10day/q/Sweden/"+city+".json";

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
            
            console.log("PERIOD NR: "+parsed.forecast.txt_forecast.forecastday[2].period);
            return callback("ok");//parsed

        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
}

