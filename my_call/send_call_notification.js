const admin = require('firebase-admin');
var serviceAccount = require('./individual-apps-86ea9-firebase-adminsdk-9ld1w-63713a4b27.json')
var adminInit = false;


module.exports = {

  sendCallNotification(req, res) {

    const{ type, channel_name} = req.query;
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
        channel_name: channel_name
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
  }
}