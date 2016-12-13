var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
const https = require('https');

// Geocode an address.
module.exports = {

  google_geocode: function(searchquery, callback){
    var key = appJS.google_api_key;
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    var type = 'lodging'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
      var parsed = JSON.parse(data);
      console.log(parsed['results'][0].formatted_address);
        //return callback(data)
        //return "API RESULTS: "+parsed['results'][0].formatted_address
        return callback(parsed['results'][0].name); //json format
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
}

