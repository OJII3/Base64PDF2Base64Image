"use strict";

const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const https = require("https");
const lineApi = require("./line_api.js");
const { send } = require("process");


const port = process.env.PORT || 3000;
const app = express();

const contentType = {
  base64image: "Image/Base64",
  html: "text/html",
  pdf: "application/pdf",
  json: "application/json",
  plainText: "text/plain",
  jpeg: "image/jpeg",
};

let html = "Hello World";


app.get("/", (req, res) => {
  res.sendStatus(200);
});


app.get("/example.jpeg", (req, res) => {

  lineApi.addMessage({ type: "text", text: "hello" });
  lineApi.sendPushMessage();

  (async () => {
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
      ]
    });
    const page = await browser.newPage();
    await page.goto("https://www.yahoo.co.jp/");
    await page.screenshot({ path: "example.jpeg" }).then(buffer => {
      // Create an HTML img tag
      var imageElem = document.createElement('img');
      // Just use the toString() method from your buffer instance
      // to get date as base64 type
      imageElem.src = 'data:image/jpeg;base64,' + buffer.toString('base64');
      res.send(imageElem);
    });
    await browser.close();
  })();
  res.send();
});


app.post("/", (req, res) => {
  console.log("post recieved");
  const options = {
    root: path.join(__dirname)
  };

  html = req.body;

  (async () => {
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
      ]
    });
    const page = await browser.newPage();
    await page.goto("https://www.yahoo.co.jp/");
    await page.screenshot({ path: "example.jpeg" });
    await browser.close();
  })();

  sendImageMessage();
  res.setHeader("Content-Type", contentType.jpeg);
  res.sendFile("example.jpeg", options, (err) => {
    console.log(err);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
