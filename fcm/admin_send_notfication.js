//import * as admin from 'firebase-admin';
const admin = require('firebase-admin');
var serviceAccount = require('../fcm/rojgar-1b39c-firebase-adminsdk-8d8k9-baabdd2b16.json')
var adminInit = false;


module.exports = {

  sendFcmNotification(req, res, title, call_token, channel_name, body, tokens, account) {
    if (adminInit == false) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://rojgar-1b39c.firebaseio.com'
      });
      adminInit = true;
    }

    const message = {
      data: {
        title: title,
        body: body,
        call_token: call_token,
        channel_name: channel_name,
        account: account
      },
      // notification: {
      //   // "click_action" : ".MainActivity", 
      //   title: title,
      //   body: body,
      //   call_token:call_token,
      //   channel_name: channel_name
      // },
      tokens: tokens,
    };

    admin.messaging().sendMulticast(message)
      .then((response) => {
        if (response.failureCount > 0) {
          const failedTokens = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(tokens[idx]);
            }
          });
          console.log('List of tokens that caused failures: ' + failedTokens);
          res.json({ "message": "List of tokens that caused failures: " + failedTokens })
          res.end();
        } else {
          console.log({ "token": call_token});
          res.json({ "token": call_token})
          res.end();
        }

      });
  }
}