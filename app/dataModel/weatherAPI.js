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
              //day 2
              weatherArr[1] = [];
              weatherArr[1]['img'] = weather2d.forecast.txt_forecast.forecastday[2].icon_url;
              weatherArr[1]['dayName'] = weather2d.forecast.txt_forecast.forecastday[2].title;
              weatherArr[1]['d2tempC'] = weather2d.forecast.simpleforecast.forecastday[1].high.celsius;
              weatherArr[1]['d2cond'] = weather2d.forecast.simpleforecast.forecastday[1].conditions;
              
              //day 3
              weatherArr[2] = [];
              weatherArr[2]['dayName'] = weather2d.forecast.txt_forecast.forecastday[4].title;
              weatherArr[2]['img'] = weather2d.forecast.txt_forecast.forecastday[4].icon_url;
              weatherArr[2]['d3tempC'] = weather2d.forecast.simpleforecast.forecastday[2].high.celsius;
              weatherArr[2]['d3cond'] = weather2d.forecast.simpleforecast.forecastday[2].conditions;

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
          return callback(parsed);//parsed

        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
}

