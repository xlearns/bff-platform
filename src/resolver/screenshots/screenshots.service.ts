import { Injectable } from '@nestjs/common';
import { IParamsScreenshotDto } from './interface';
import puppeteer from 'puppeteer';

@Injectable()
export class ScreenshotsService {
  private defaultConfig = {
    width: 1920,
    height: 1080,
  };
  private filterParams(obj: Object) {
    var result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  // BUG: Only supports Node versions 18 and above.
  async actions(params: IParamsScreenshotDto) {
    let screenshotBuffer;

    const config = Object.assign(
      {},
      this.defaultConfig,
      this.filterParams(params),
    ) as IParamsScreenshotDto;

    const { url, width, height, dom } = config;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--font-render-hinting=medium'],
      headless: 'new',
      devtools: false,
    });

    const page = await browser.newPage();

    await page.goto(url);

    await page.evaluate((config) => {
      console.log('ok', config);
    }, config);

    await page.setViewport({ width, height });

    await page.goto(url);

    if (!dom) {
      screenshotBuffer = await page.screenshot({
        encoding: 'binary',
        fullPage: true,
      });
    } else {
      const body = await page.$(dom);
      screenshotBuffer = await body.screenshot({
        encoding: 'binary',
      });
    }

    await browser.close();

    return screenshotBuffer;
  }
}
