"use strict";

import express = require('express');
import path = require('path');
import { LineApi } from './src/lineApi';
import { Screenshotter } from './src/screenshotter';
import { ContentType } from './src/contentType';

const lineApi = new LineApi();
const screenshotter = new Screenshotter('https://youtube.com');

const port = process.env.PORT || 3000;
const app = express();

let html = "Hello World";


app.get("/", (req: any, res: any) => {
  console.log(req.data);
  screenshotter.shot();
  const options = {
    root: path.join(__dirname)
  };
  res.sendFile("img/example.jpeg", options, (err: any) => console.error(err));
});

app.get("/example.jpeg", (req: any, res: any) => {
  console.log(req.data);
  screenshotter.shot();
  const options = {
    root: path.join(__dirname)
  };
  res.sendFile("img/example.jpeg", options, (err: any) => console.error(err));
});

app.get("/send", (req: any, res: any) => {

  const imageUrl = 'ImageURL';

  lineApi.addMessage({
    type: 'image',
    originalContentUrl: imageUrl,
    previewImageUrl: imageUrl
  });
  lineApi.sendPushMessage();
});

app.post("/", (req: any, res: any) => {
  console.log("post recieved");
  const options = {
    root: path.join(__dirname)
  };

  html = req.body;

  screenshotter.shot();
  res.setHeader("Content-Type", ContentType.jpeg);
  res.sendFile("img/example.jpeg", options, (err: any) => {
    console.log(err);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
