"use strict";

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
import { LineApi } from './src/lineApi';
import { Screenshot } from './src/screenshot';

const lineApi = new LineApi();
const screenshot = new Screenshot();
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


let html = "Hello World";


app.get("/", (req: any, res: any) => {
  console.log(req.data);
  screenshot.shot();
  const options = {
    root: path.join(__dirname)
  };
  res.sendFile("img/example.jpeg", options, (err: any) => console.error(err));
});


app.get("/example.jpeg", (req: any, res: any) => {

  const imageUrl = 'ImageURL';

  lineApi.addMessage({
    type: 'image',
    originalContentUrl: imageUrl,
    previewImageUrl: imageUrl
  });
  lineApi.sendPushMessage();

  screenshot.shot();

  const options = {
    root: path.join(__dirname)
  };
  res.sendFile("img/example.jpeg", options, (err: any) => {
    console.log(err);
  });
});

app.post("/", (req: any, res: any) => {
  console.log("post recieved");
  const options = {
    root: path.join(__dirname)
  };

  html = req.body;

  screenshot.shot();
  res.setHeader("Content-Type", contentType.jpeg);
  res.sendFile("img/example.jpeg", options, (err: any) => {
    console.log(err);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
