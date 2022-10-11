"use strict";
var https = require("https");
var line_api = /** @class */ (function () {
    // constructor
    function line_api() {
        // property
        this.messages = [];
    }
    // readonly fields
    // meethods
    line_api.prototype.addMessage = function (message) {
        var messageSizeLimit = 5; // LINE API limit
        if (this.messages.length < messageSizeLimit) {
            this.messages.push(message);
        }
        else {
            console.error("Too many messages");
        }
    };
    line_api.prototype.sendPushMessage = function () {
        var accessToken = process.env.LINE_ACCESS_TOKEN;
        var userId = process.env.LINE_USER_ID;
        var options = {
            hostname: "https://api.line.me",
            path: "v2/bot/message/push",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(accessToken)
            }
        };
        var data = {
            to: userId,
            messages: this.messages
        };
        var req = https.request(options, function (res) { });
        req.write(JSON.stringify(data));
        req.on("error", function (err) { return console.log(err); });
        req.end();
    };
    return line_api;
}());
// export an instance as a module
// I'm not sure what object oriented js should be like
module.exports = new line_api();
