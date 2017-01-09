var express = require('express');
var router = express.Router();
var path = require('path');
var controller = require(path.join(__dirname, '/../controller/main.js'))

/* 
 * Description: a routing API for HTTP verb methods. 
 * Provided by the Express.js Router and a RESTful interface.
 * The routing interface also redirects to the corresponding functions in 
 * in the app controller (/controller/main.js and /controller/events.js).
 */

/* GET home page. */
router.use(function (req,res,next) {
    next(); /* next() is passing the control to the next handler. Otherwise this middleware router.use-fkn would not end the request-response cycle. The the request would then be left hanging.*/
});

//authorizing the chatbot
router.get('/authorize', controller.authorize);

//subscribing to the webhook and establish a chat event channel
router.get("/webhook", controller.get_webhook);

//recieving new messages from the chatbot user
router.post("/webhook", controller.post_webhook);

module.exports = router;
