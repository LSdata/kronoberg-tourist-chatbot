var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
/*
var googleMapsClient = require('@google/maps').createClient({
  key: appJS.google_api_key
});*/
var googleMapsClient = require('@google/maps').createClient({
  clientId: '862360386930-n7h6v499sosui80buvcptho54n898sqt.apps.googleusercontent.com',
  clientSecret: '5Zf7cqa6H3t3pBaIzIIbDXEi',
});

// Geocode an address.
module.exports = {
  google_geocode: function(){
    
    googleMapsClient.geocode({
        
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
        }, function(err, response) {
          if (!err) {
            console.log(response.json.results);
            return "okok"
          }
          
        });
    }
}
