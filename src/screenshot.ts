'use strict';

const puppeteer = require('puppeteer');

export class Screenshot {

  url = 'https://youtube.com';

  buffer: Buffer | null = null;

  constructor (url: string = '') {
    this.url = url;
  }

  shot (): Buffer | null {
    async () => {
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
      await page.goto(this.url);
      await page.screenshot({
        path: "img/example.jpeg",
        fullPage: true
      }).then((value: Buffer) => this.buffer = value);
      await browser.close();
    }

    return this.buffer;
  }
}