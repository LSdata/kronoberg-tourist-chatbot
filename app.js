/*
 This file is starting the app and is setting up the server runtime environment. 
 */

/* jshint node: true, devel: true */
'use strict';

const 
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),  
  request = require('request'),
  routes = require('./app/router/routes.js'),
  path = require("path"); 

var app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static(path.resolve(__dirname, 'app/public')));
app.use('/', routes)


// App Secret is retrieved from the App Dashboard (https://developers.facebook.com/apps/)
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? 
  process.env.MESSENGER_APP_SECRET :
  config.get('appSecret');
module.exports.app_secret = APP_SECRET;

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken');
module.exports.validation_token = VALIDATION_TOKEN;

// Page access token is generated for the page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');
module.exports.page_access_token = PAGE_ACCESS_TOKEN;

// URL where the app is running (include protocol). Used to point to scripts and 
// assets located at this address. 
const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');
module.exports.server_url = SERVER_URL;

//Google API key
const GOOGLE_API_KEY = (process.env.GOOGLE_API_KEY) ?
  (process.env.GOOGLE_API_KEY) :
  config.get('googleAPIkey');
module.exports.google_api_key = GOOGLE_API_KEY;

//Wunderground API key
const WUNDERGROUND_API_KEY = (process.env.WUNDERGROUND_API_KEY) ?
  (process.env.WUNDERGROUND_API_KEY) :
  config.get('wundergroundAPIkey');
module.exports.wunderground_api_key = WUNDERGROUND_API_KEY;

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

/*
 * Verifies that the callback came from Facebook. Using the App Secret from 
 * the App Dashboard, the signature is verified that it is sent with each 
 * callback in the x-hub-signature field, located in the header.
 *
 * (https://developers.facebook.com/docs/graph-api/webhooks#setup)
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    console.error("Couldn't validate the signature.");
    throw new Error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}


// Start server
// Webhooks must be available via SSL with a certificate signed by a valid 
// certificate authority.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;

