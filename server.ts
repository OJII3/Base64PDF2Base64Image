"use strict";

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
import { LineApi } from './src/lineApi.js';

const lineApi = new LineApi();
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

/**
 * Screenshot the web site and save as example.jpeg
 */
async function screenshot() {
  let buffer: Buffer;
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
  await page.goto("https://github.com/OJII3");
  await page.screenshot({
    path: "example.jpeg",
    fullPage: true
  }).then((value: Buffer) => buffer = value);
  await browser.close();
}

let html = "Hello World";


app.get("/", (req: any, res: any) => {
  (async function screenshot() {
    let buffer: Buffer;
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
    await page.goto("https://github.com/OJII3");
    await page.screenshot({
      path: "example.jpeg",
      fullPage: true
    }).then((value: Buffer) => {
      const options = {
        root: path.join(__dirname)
      };
      res.sendFile("example.jpeg", options, (err: any) => console.error(err));
    });
    await browser.close();
  })();
});


app.get("/example.jpeg", (req: any, res: any) => {

  const imageUrl = 'ImageURL';

  lineApi.addMessage({
    type: 'image',
    originalContentUrl: imageUrl,
    previewImageUrl: imageUrl
  });
  lineApi.sendPushMessage();

  screenshot();

  const options = {
    root: path.join(__dirname)
  };
  res.sendFile("example.jpeg", options, (err) => {
    console.log(err);
  });
});

app.post("/", (req: any, res: any) => {
  console.log("post recieved");
  const options = {
    root: path.join(__dirname)
  };

  html = req.body;

  screenshot();
  res.setHeader("Content-Type", contentType.jpeg);
  res.sendFile("example.jpeg", options, (err: any) => {
    console.log(err);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
