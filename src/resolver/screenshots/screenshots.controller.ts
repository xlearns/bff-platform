import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  Res,
} from '@nestjs/common';
import { ScreenshotsService } from './screenshots.service';
import type { Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

@Controller('screenshots')
export class ScreenshotsController {
  constructor(private readonly screenshotsService: ScreenshotsService) {}

  @Get()
  async gscreenshot(
    @Query('url') url: string,
    @Query('dom') dom: string,
    @Query('width') width: number,
    @Query('height') height: number,
    @Res() res: Response,
  ) {
    const data = this.getReqParam({ url, width, height, dom });
    const Buffer = await this.screenshotsService.actions(data);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=screenshot.png');
    res.end(Buffer, 'binary');
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
        dom: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
      },
    },
  })
  @Post()
  async pscreenshot(
    @Body('url') url: string,
    @Body('dom') dom: string,
    @Body('width') width: number,
    @Body('height') height: number,
    @Res() res: Response,
  ) {
    const data = this.getReqParam({ url, width, height, dom });
    const Buffer = await this.screenshotsService.actions(data);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=screenshot.png');
    res.end(Buffer, 'binary');
  }
  private isHttpUrl(url) {
    return /^https?:\/\//.test(url);
  }

  private getReqParam({ url, width, height, dom }) {
    if (!url) {
      throw new HttpException(`the URL is a required field. `, 400);
    }
    if (!this.isHttpUrl(url)) {
      throw new HttpException(
        `Invalid URL, please ensure that the protocol is either http or https.`,
        500,
      );
    }
    return {
      url,
      width,
      height,
      dom,
    };
  }
}
