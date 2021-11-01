const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

module.exports = {
    generateRtcToken(req, res){
        const {channel_name, uid, account, role} = req.query;

// Rtc Examples
const appID = 'e7ae104bbb694f0992066f4b04d429ce';
const appCertificate = '22141ac603ad48ca93f457f1bfbfaa2a';

var user_role = RtcRole.PUBLISHER;
if(role == 2){
    user_role = RtcRole.SUBSCRIBER;
}

const expirationTimeInSeconds = 3600

const currentTimestamp = Math.floor(Date.now() / 1000)

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

// Build token with uid
const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel_name, uid, user_role, privilegeExpiredTs);
console.log("Token With Integer Number Uid: " + tokenA);
res.json({"token": tokenA});
res.end();

// Build token with user account
// const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channel_name, account, user_role, privilegeExpiredTs);
// console.log("Token With UserAccount: " + tokenB);
// res.send(tokenB);
// res.end();

//latest
// var data = req.body;
// console.log(data);
// var title = data.title;
// var body = data.body;
// console.log(req.query);
// var tokens = data.tokens;
//AdminSend.sendFcmNotification(req, res, title, tokenA, channel_name, body, tokens, uid);


    }
}