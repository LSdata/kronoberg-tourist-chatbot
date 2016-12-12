var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
const https = require('https');

/*
var googleMapsClient = require('@google/maps').createClient({
  key: appJS.google_api_key
});
var googleMapsClient = require('@google/maps').createClient({
  clientId: '552041030436-6efdtnunvlgle915es42jeubmoaphgoh.apps.googleusercontent.com',
  clientSecret: 'pbeO_72C4z-8IJGWH2YBWXd7',
});*/
var key = 'AIzaSyCi7eN9DeaU1cIH3Jz2pF0DKnCKATa3qOE';

// Geocode an address.
module.exports = {

  google_geocode: function(searchquery, callback){
    
    //var searchquery = 'ramlosa wok'; //not åäö --> aao as Vaxjo
    var type = 'restaurant'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
      var parsed = JSON.parse(data);
      console.log(parsed['results'][0].formatted_address);
        return parsed['results'][0].formatted_address
        //return callback(data); //json format
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
}

