const express = require('express')
const { json } = require("body-parser");
const app = express()
const RtcToken = require('./rtc_token');
const FCM = require('./fcm/fcmController')
const SendCallNotification = require('./my_call/send_call_notification');

//Middleware...
app.use(express.json())
app.use("/fcm", FCM);
app.get('/generateToken',function (req,res){
    RtcToken.generateRtcToken(req, res);
});

app.post('/sendCallNotification', function (req, res) {
    SendCallNotification.sendCallNotification(req, res);
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