var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
/*
var googleMapsClient = require('@google/maps').createClient({
  key: appJS.google_api_key
});*/
var googleMapsClient = require('@google/maps').createClient({
  clientId: '552041030436-6efdtnunvlgle915es42jeubmoaphgoh.apps.googleusercontent.com',
  clientSecret: 'pbeO_72C4z-8IJGWH2YBWXd7',
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
