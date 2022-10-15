'use strict';
exports.__esModule = true;
exports.LineApi = void 0;
var https = require("https");
require('dotenv').config();
var LineApi = /** @class */ (function () {
    // constructor
    function LineApi() {
        // property
        this.messages = [];
    }
    // meethods
    LineApi.prototype.addMessage = function (message) {
        var messageSizeLimit = 5; // LINE Messaging API's limit
        if (this.messages.length < messageSizeLimit) {
            this.messages.push(message);
        }
        else {
            console.error("Too many messages");
        }
    };
    LineApi.prototype.sendPushMessage = function () {
        var accessToken = process.env.LINE_ACCESS_TOKEN;
        var userId = process.env.LINE_USER_ID;
        if (!(accessToken && userId)) {
            console.error('Access Token or User ID is undefined!');
            return;
        }
        var data = {
            to: userId,
            messages: this.messages
        };
        var options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charaset=UTF-8",
                Authorization: "Bearer ".concat(accessToken)
            },
            payload: data
        };
        var url = "https://api.line.me/v2/bot/message/push/";
        var req = https.request(url, options, function (res) {
            console.log('statusCode', res.statusCode);
            console.log('headers', res.headers);
        });
        req.write(JSON.stringify(data));
        req.on("error", function (err) { return console.log(err); });
        req.end();
    };
    return LineApi;
}());
exports.LineApi = LineApi;
