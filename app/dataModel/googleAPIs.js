var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'))
const https = require('https');

// Geocode an address.
module.exports = {

  google_eatings: function(callback){
    var key = appJS.google_api_key;
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    var type = 'bakery|restaurant|cafe'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
      var parsed = JSON.parse(data);
      console.log(parsed['results'][0].name);
        //return callback(data) //json format
        placesInfo(data);
        return callback(parsed['results'][0].name); 
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
}

function placesInfo(data) {
      var parsed = JSON.parse(data);
      console.log("OKOKOK!!: "+parsed['results'][0].name);
/*
    $.getJSON(data, function (data) {
        var dataLen = data.results.length;
        console.log("dataLen"+dataLen)
        //if there is an error_message
        if(dataLen==0){
            console.log(data.error_message);
        }
        //else display search result table
        else{
            var totalLen;
            
            if(dataLen<5){
                totalLen = dataLen;
            }else
                totalLen = 5;

            for(var i=0; i<totalLen; i++) {
                var itemName = data.results[i].name;
                var itemAddress = data.results[i].formatted_address;
                var itemRating = data.results[i].rating;
                var lat = data.results[i].geometry.location.lat;
                var lng = data.results[i].geometry.location.lng;
                
            }
        }
    });
    */
}

