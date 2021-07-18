const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')




module.exports = {
    generateRtcToken(req, res){
        const {channelName, uid, account } = req.query;

// Rtc Examples
const appID = 'e7ae104bbb694f0992066f4b04d429ce';
const appCertificate = '22141ac603ad48ca93f457f1bfbfaa2a';
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 3600

const currentTimestamp = Math.floor(Date.now() / 1000)

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

// // Build token with uid
// const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
// console.log("Token With Integer Number Uid: " + tokenA);

// Build token with user account
const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
console.log("Token With UserAccount: " + tokenB);

res.json({"token": tokenB});
res.end();

    }
}