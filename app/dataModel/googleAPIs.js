var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const https = require('https');

// Geocode an address.
module.exports = {

  getPlaces: function(type, callback){

    var key = appJS.google_api_key;
    //key1: AIzaSyBxcTmedg4YyUznphWnIvZIishP6oRSCpw
    //key2: AIzaSyDo-eLFaHyTTJR-Sgyvz2JJPOHc93LJ6MY
    //key3: AIzaSyANfovlzb3AdCG0ZJ69coocSCjXl3NDQmY
    var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    //var type = 'bakery|restaurant|cafe' //syntax for multiple categories
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        
        
        generatePlaceArr(data, function(arr) {
          
          //get place websites from google place detail search by place ID
          getPlaceWebsite(arr[0][6], function(website) {
            arr[0][6] = website;
          });
          getPlaceWebsite(arr[1][6], function(website) {
            arr[1][6] = website;
          });
          getPlaceWebsite(arr[2][6], function(website) {
            arr[2][6] = website;
          });
          getPlaceWebsite(arr[3][6], function(website) {
            arr[3][6] = website;
          });
          getPlaceWebsite(arr[4][6], function(website) {
            arr[4][6] = website;
          });
          //5 callbacks to get photo and add to array
          getPlacePhoto(arr[0][3], function(photo_ref0) {
              arr[0][3] = photo_ref0;
              getPlacePhoto(arr[1][3], function(photo_ref1) {
                arr[1][3] = photo_ref1;
                getPlacePhoto(arr[2][3], function(photo_ref2) {
                  arr[2][3] = photo_ref2;
                  getPlacePhoto(arr[3][3], function(photo_ref3) {
                    arr[3][3] = photo_ref3;
                    getPlacePhoto(arr[4][3], function(photo_ref4) {
                      arr[4][3] = photo_ref4;
                      callback(arr);
                    });
                  });
                });
              });
          });
        });
        
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function generatePlaceArr(data, callback){
  var placeArr = [];
  var parsed = JSON.parse(data);
  var len = parsed['results'].length;
  var counter = -1; //init
  var flagFirst = 0;

  //get 7 google place items. Place in array.
  for(var i=0; i<len; i++){
      var name = parsed['results'][i].name;
      var type="Categories: "
      var address = parsed['results'][i].formatted_address;
      var photo = "photo"; //getPlacePhoto();
      var lat = parsed['results'][i].geometry.location.lat;
      var lng = parsed['results'][i].geometry.location.lng;
      var ref ="ref";
      var images = parsed['results'][i].photos;
      var categTypes = parsed['results'][i].types;
      var placeID = parsed['results'][i].place_id;
        
      if(images && categTypes && name && address && lat && lng && counter <4 && placeID){
        counter++;
        ref = parsed['results'][i].photos[0].photo_reference;
        
        //get place categories
        var typesArr = parsed['results'][i].types;
        var typesLen = typesArr.length;
        
        for(var k=0; k<typesLen; k++){
          type += typesArr[k]+", ";
        }
        type = type.substring(0, type.length - 2); //remove last ', '
        placeArr[counter] = [name, type, address, ref, lat, lng, placeID];
      }
    }
    return callback(placeArr);
}

function getPlacePhoto(photo_ref, callback){
    
    var key = appJS.google_api_key;
    var url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=752&photoreference="+photo_ref+"&key="+key;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        data = data.substring(168, data.length - 29); //remove last ', '
        callback(data);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
  
  function getPlaceWebsite(placeID, callback){
    
    var key = appJS.google_api_key;
    var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key="+key;
    
    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        var parsed = JSON.parse(data);
        var website = parsed['result'].website;
        if(website)
          console.log('WEBSITE EXISTS')
        else
          var place_website = 'www.google.com';
        console.log('WEBSITE: '+website)

        callback(place_website);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }