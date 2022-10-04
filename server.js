"use strict";

const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

const contentType = {
  base64image: "Image/Base64",
  html: "text/html",
  pdf: "application/pdf",
  Json: "application/json",
  plainText: "text/plain",
  jpeg: "image/jpeg",
};

let html = "Hello World";

app.get("/", (req, res) => {
  res.send(html);
});

app.post("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };

  html = req.body;

  (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://www.yahoo.co.jp/");
    await page.screenshot({ path: "example.jpeg" });
    await browser.close();
  })();

  res.setHeader("Content-Type", contentType.jpeg);
  res.sendFile("example.jpeg", options, (err) => {
    console.log(err);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
