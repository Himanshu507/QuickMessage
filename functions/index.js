const functions = require('firebase-functions');
const axios = require('axios');

const admin = require('firebase-admin');
admin.initializeApp();

var http = require('http');
var urlencode = require('urlencode');
var msg = urlencode('hello js');
var username = 'saurabh.bansal@zersey.com';
var hash = 'cee35847d9235a4e44bb7115a17ddb27e4c09d006ad6b0a99e0f54f022c847f1'; // The hash key could be found under Help->All Documentation->Your hash key. Alternatively you can use your Textlocal password in plain text.
var sender = 'Himanshu';

//var validOptions = { apikey: 'S2F/7ZrnfXo-PJL1FVDQf1wu4rMyKG2IAbyeRcB2SX' };
//var tl = require('textlocal')(validOptions);

 // Create and Deploy Your First Cloud Functions
 // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send(request.body.data);

  let phone = request.body.data;
  for(let i=0; i<phone.length; i++){
     var toNumber = "07011179564";
     //tl.sendSMS(phone[i], 'This is a test message', 'Sender', function (err, data) {});
     var data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
     var options = {
       host: 'api.textlocal.in', path: '/send?' + data
     };
     callback = function (response) {
        console.log("Started");
       var str = '';//another chunk of data has been recieved, so append it to `str`
       response.on('data', function (chunk) {
         str += chunk;
       });//the whole response has been recieved, so we just print it out here
       response.on('end', function () {
         console.log(str);
         console.log("Finished");
       });
     }//console.log('hello js'))
     http.request(options, callback).end();
  }

 });
