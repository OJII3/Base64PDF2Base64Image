"use strict";

const https = require("https");
module.exports = new lineApi();


class lineApi {
  
  // property
  messages = [];
  
  // constructor
  constructor() {}
  
  // readonly fields
  #accessToken = process.env.LINE_ACCESS_TOKEN;
  #userId = process.env.LINE_USER_ID;
  #pushUrl = "https://api.line.me/v2/bot/message/push";
  
  // meethods
  addMessage(message) {
    const messageSizeLimit = 5; // LINE API limit
    if(this.messages.length < messageSizeLimit) {
      this.messages.push(message);
    } else {
      console.error("Too many messages");
    }
  }
  
  sendPushMessage() {
    const options = {
      hostname: "https://api.line.me",
      path: "v2/bot/message/push",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#accessToken}`
      }
    };
    const data = {
      to: this.#userId,
      messages: this.messages
    };
    
    const req = https.request(options, (res) => {
    });
    req.write(JSON.stringify(data));
    req.on("error", (err) => console.log(err));
    req.end();
  }
}
