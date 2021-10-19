const express = require('express')
const { json } = require("body-parser");
const app = express()
const RtcToken = require('./rtc_token');
const FCM = require('./fcm/fcmController');
//const SendCallNotification = require('./my_call/send_call_notification');
const admin = require('firebase-admin');
var serviceAccount = require('./my_call/individual-apps-86ea9-firebase-adminsdk-9ld1w-63713a4b27.json')
var adminInit = false;

//Middleware...
app.use(express.json())
app.use("/fcm", FCM);
app.get('/generateToken',function (req,res){
    RtcToken.generateRtcToken(req, res);
});

app.post('/sendCallNotification', function (req, res) {
  //  SendCallNotification.sendCallNotification(req, res);
  const{ type, channel_name, channelToken} = req.query;
  if (adminInit == false) { 
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://individual-apps-86ea9.firebaseio.com'
    });
    adminInit = true;
  }

  const message = {
    data: {
      type: type,
      channel_name: channel_name,
      channelToken: channelToken
    },
    // notification: {
    //   // "click_action" : ".MainActivity", 
    //   title: title,
    //   body: body,
    //   call_token:call_token,
    //   channel_name: channel_name
    // },
    tokens: req.body.fcm_tokens
  };

  admin.messaging().sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(req.body.fcm_tokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
        res.json({ "message": "List of tokens that caused failures: " + failedTokens })
        res.end();
      } else {
        console.log({ "token": req.body.fcm_tokens});
        res.json({ "message": "Call Notification sent to: "+req.body.fcm_tokens})
        res.end();
      }

    });
});

app.get('/',function (req,res){
    res.end('<h1>This is Home page</h1>')
});

const PORT = process.env.PORT || 1010
app.listen(PORT, function (err) {
    if (err){
        console.log(err)
    }else {
    console.log('Server is running on port: ' + PORT)
    }
});