var path = require('path');
var appJS = require(path.join(__dirname, '/../../app.js'));
var chat_info = require(path.join(__dirname, 'chat-info.js'))
const https = require('https');

// Geocode an address.
module.exports = {

  google_eatings: function(searchquery, type, callback){
    var key = appJS.google_api_key;
    //var searchquery = 'kronoberg'; //not åäö --> aao as Vaxjo
    //var type = 'bakery|restaurant|cafe'
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + "key=" + key + "&query="+searchquery+ "&type="+type;

    https.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
      //var parsed = JSON.parse(data);
      //console.log(parsed['results'][0].name);
        //return callback(data) //json format
        var placeArr = generatePlaceArr(data);
        return callback(placeArr);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};

function generatePlaceArr(data){
  var placeArr = [];
  var parsed = JSON.parse(data);
  var len = parsed['results'].length;

  //get 10 google place items. Place in array.
  for(var i=0; i<len; i++){
    try{
      var name = parsed['results'][i].name;
      var type = parsed['results'][i].types;
      var address = parsed['results'][i].formatted_address;
      var photo_htmlattr = parsed['results'][i].photos[0].html_attributions[0];
      var photo_ref = parsed['results'][i].photos[0].photo_reference;
      var photo = "photo"; //getPlacePhoto();
      
      if( (address != 'undefined') && (photo_htmlattr!= 'undefined') && (name != 'undefined') 
      && (photo_ref != 'undefined') ){
          placeArr[i] = []; //place nr
          for(var j=0; j<5; j++){
            placeArr[i] = [name, type, address, photo_htmlattr, photo];
          }
          console.log("PLACEARR LEN= "+placeArr.length)
      }else
        continue;
      } catch(err) {
        console.log("Place property is missing i="+i);
      }
  }

  //extract the maps url
  /*
  var gmapsURL1 = getGmapsURL(parsed['results'][0].photos[0].html_attributions[0]);
  var gmapsURL2 = getGmapsURL(parsed['results'][1].photos[0].html_attributions[0]);
  var gmapsURL3 = getGmapsURL(parsed['results'][2].photos[0].html_attributions[0]);

  //get all types of 5 places
  var types1 = getAllTypes(parsed['results'][0].types);
  var types2 = getAllTypes(parsed['results'][1].types);
  var types3 = getAllTypes(parsed['results'][2].types);
  */
  return data;
}


function getAllTypes(typesArr){
  
  if(typesArr.length != null){
    var len = typesArr.length;
    var typesTxt = "Categories: ";
    for(var i=0; i<len; i++){
      typesTxt += typesArr[i] +", ";
    }
    typesTxt = typesTxt.substring(0, typesTxt.length - 2); //remove last ', '
    return typesTxt;
  } else
    return "(This place is in an undefined category)";
}

function getGmapsURL(gmapsURL){
    gmapsURL = gmapsURL.replace(/['"]+/g, '');
    gmapsURL = gmapsURL.slice(8);
    gmapsURL = gmapsURL.substring(0, gmapsURL.indexOf('>'));
    return gmapsURL;
}


