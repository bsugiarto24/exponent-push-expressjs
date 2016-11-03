/*
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/* ES5 code for the original exponent-node-sdk */
var app = require('express')();

var bdy = require('body-parser');

app.use(bdy.json());

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPushNotificationAsync = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Sends a push notification with the given options and data
 *
 */
var sendPushNotificationAsync = exports.sendPushNotificationAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts) {
    var exponentPushToken, message, body, response, json;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exponentPushToken = opts.exponentPushToken;

            if (isExponentPushToken(exponentPushToken)) {
              _context.next = 3;
              break;
            }

            throw new Error('Missing `exponentPushToken`. Should be something like `ExponentPushToken[Re4MeUKjYWNd0FXSj8Eppi]` but instead got `' + exponentPushToken + '`');

          case 3:
            message = opts.message || undefined;
            body = (0, _extends3.default)({}, opts.data, {
              exponentPushToken: exponentPushToken,
              message: message
            });
            _context.next = 7;
            return (0, _nodeFetch2.default)(BASE_API_URL + '/notify', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: new _nodeFetch.Headers({
                'Content-Type': 'application/json'
              })
            });

          case 7:
            response = _context.sent;

            if (!(response.status === 400)) {
              _context.next = 10;
              break;
            }

            throw new Error('Invalid Exponent Push Token: ' + exponentPushToken);

          case 10:
            if (!(response.status === 200)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt('return', undefined);

          case 14:
            _context.next = 16;
            return response.json();

          case 16:
            json = _context.sent;
            throw new Error('Error sending push notification: ' + json.err);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function sendPushNotificationAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.isExponentPushToken = isExponentPushToken;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'https://exp.host/'; /**
                                     * exponent-server-sdk
                                     *
                                     * Use this if you are running Node on your server backend when you are working with Exponent
                                     * https://getexponent.com/
                                     *
                                     */

var BASE_API_URL = BASE_URL + '--/api';

/**
 * Returns `true` if the token is an Exponent push token
 *
 */
 function isExponentPushToken(token) {
  return typeof token === 'string' && /^ExponentPushToken.+/.test(token);
}



/* Routes */ 

/* temporally storage for tokens receveid */
var tokenList = [];

app.post("/token", function (req, res){
    
      /* is a valid token? */
      var val = isExponentPushToken(req.body.token.value);
      
      if (val){
           if ( tokenList.indexOf(val) < 0 ){
                        val.push(req.body.token.value);
           }
      }

      res.end();
});



app.post("/publishNotification", function(req, res){

     /* loop over all tokens receveid, sending the same message = broadcast */
      tokenList.forEach( function(el, ind){

            sendPushNotificationAsync({
                  exponentPushToken: el, // The push token for the app user you want to send the notification to
                  message: req.body.message,
                  data: req.body.data,
                  });
      });
            res.end();
});

/* process.env.PORT recommend for working with heroku, which automatically assigns a port address */
app.listen( process.env.PORT || 3000, function(err,suc){
  if (suc){
      console.log("R U N N I N G...");
   }
});
