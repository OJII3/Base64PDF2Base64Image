"use strict";

const https = require("https");

interface textMessage {
  type: string,
  text: string
}

class line_api {
  
  // property
  messages: any[] = [];
  
  // constructor
  constructor() {}
  
  // readonly fields
  
  // meethods
  addMessage(message: textMessage) {
    const messageSizeLimit = 5; // LINE API limit
    if(this.messages.length < messageSizeLimit) {
      this.messages.push(message);
    } else {
      console.error("Too many messages");
    }
  }
  
  sendPushMessage() {
    const accessToken = process.env.LINE_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;
    const options = {
      hostname: "https://api.line.me",
      path: "v2/bot/message/push",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    };
    const data = {
      to: userId,
      messages: this.messages
    };
    
    const req = https.request(options, (res: any) => {});
    req.write(JSON.stringify(data));
    req.on("error", (err: any) => console.log(err));
    req.end();
  }
}


// export an instance as a module
// I'm not sure what object oriented js should be like
module.exports = new line_api();