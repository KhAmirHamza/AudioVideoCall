const express = require("express");
const fcmRouter = express.Router();
const Send = require('../fcm/admin_send_notfication')

fcmRouter.post("/send", (req, res) => {
    Send.sendFcmNotification(
        req,
        res,
        req.body.title,
        req.body.call_token,
        req.body.channel_name,
        req.body.body,
        req.body.tokens);
})

module.exports = fcmRouter;


