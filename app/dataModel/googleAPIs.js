var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))

var googleMapsClient = require('@google/maps').createClient({
  key: appJS.google_api_key
});

// Geocode an address.
module.exports = {
  google_geocode: function(){
    return "ok here google_geocode()"
/*
    googleMapsClient.geocode({
        
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
        }, function(err, response) {
          if (!err) {
            console.log(response.json.results);
            return response.json.results
          }
          
        });*/
    }
}
