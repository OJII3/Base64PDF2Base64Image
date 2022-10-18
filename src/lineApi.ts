'use strict';

import * as https from 'https';
require('dotenv').config();

interface textMessage {
  type: string,
  text: string
}

interface imageMessage {
  type: string,
  originalContentUrl: string,
  previewImageUrl: string
}

export class LineApi {

  // property
  messages: any[] = [];

  // constructor
  constructor() { }

  // meethods
  addMessage(message: textMessage | imageMessage) {
    const messageSizeLimit: number = 5; // LINE Messaging API's limit
    if (this.messages.length < messageSizeLimit) {
      this.messages.push(message);
    } else {
      console.error("Too many messages");
    }
  }

  sendPushMessage() {
    const accessToken = process.env.LINE_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;
    
    if (!(accessToken && userId)) {
      console.error('Access Token or User ID is undefined!');
      return;
    }
    
    const data = {
      to: userId,
      messages: this.messages
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charaset=UTF-8",
        Authorization: `Bearer ${accessToken}`
      }
    };

    const url = "https://api.line.me/v2/bot/message/push/";
    const req = https.request(url, options, (res) => {
      console.log('statusCode', res.statusCode);
      console.log('headers', res.headers);
    });
    req.write(JSON.stringify(data));
    req.on("error", (err: any) => console.log(err));
    req.end();
  }
}
