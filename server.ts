"use strict";

const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
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


async function screenshot() {
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
}


let html = "Hello World";


app.get("/", (req: any, res: any) => {
  res.sendStatus(200);
});


app.get("/example.jpeg", (req: any, res: any) => {

  lineApi.addMessage({ type: "text", text: "hello" });
  lineApi.sendPushMessage();
  screenshot();
  res.send();
});


app.post("/", (req: any, res: any) => {
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

  res.setHeader("Content-Type", contentType.jpeg);
  res.sendFile("example.jpeg", options, (err: any) => {
    console.log(err);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
