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
//var key = 'AIzaSyBxcTmedg4YyUznphWnIvZIishP6oRSCpw';
var key = 'AIzaSyC3NLfEx9mW-CMBymzLAjrxJByQzzxN1mg';

// Geocode an address.
module.exports = {

  google_geocode: function(searchquery, callback){
    
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
        return callback(parsed['results'][0].formatted_address); //json format
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
}

