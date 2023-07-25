import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  HttpCode,
  Param,
  Res,
  HttpException,
  UploadedFiles,
  Req,
  Query,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname, join, resolve } from 'path';
import { randomUUID } from 'crypto';
import type { Response, Request } from 'express';

// resume transfer.
import * as Busboy from 'busboy';
import { GetGuid } from 'src/common/Guid';
import { Readable } from 'stream';
import * as fs from 'fs';
import { promisify } from 'util';
import { IFileDetails } from './interface';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  static getLink(req: Request): string {
    return req.protocol + '://' + req.headers.host + req.url;
  }
  static uploadDir = 'upload';

  // @HttpCode(200)
  // @UseInterceptors(
  //   FilesInterceptor('files', 10, {
  //     storage: diskStorage({
  //       destination: UploadController.uploadDir,
  //       filename: (req, file, cb) => {
  //         const name = file.originalname.split('.')[0];
  //         const fileExtName = extname(file.originalname);
  //         cb(null, `${name}${randomUUID()}${fileExtName}`);
  //       },
  //     }),
  //   }),
  // )

  @Post('resume-request')
  async uploadResumeRequest(@Body('fileName') fileName: string) {
    if (!fileName) {
      throw new HttpException(`the fileName is a required field.`, 400);
    }
    const fileId = GetGuid.create();
    fs.createWriteStream(this.getFilePath(fileName, fileId), {
      flags: 'w',
    });
    return { fileId, fileName };
  }

  @Get('resume-status')
  async uploadResumeStatus(
    @Query('fileName') fileName,
    @Query('fileId') fileId,
  ) {
    if (!fileName || !fileId) {
      throw new HttpException(
        `the ${!fileName ? 'fileName' : 'fileId'} is a required field.`,
        400,
      );
    }

    try {
      const { size } = await this.getFileDetails(
        this.getFilePath(fileName, fileId),
      );
      return {
        totalChunkUploaded: size,
      };
    } catch (e) {
      throw new HttpException('No corresponding files.', 500);
    }
  }

  @Post('resume')
  uploadResume(@Req() request: Request, @Res() response: Response) {
    if (
      !request.headers['content-type'] ||
      !request.headers['content-type'].includes('multipart/form-data')
    ) {
      throw new HttpException('the file is a required field.', 400);
    }
    const busboy = new Busboy({ headers: request.headers });
    const fileId = GetGuid.create();
    const readable = new Readable();

    busboy.on('file', async (field, file, fileName) => {
      const filePath = this.getFilePath(fileName, fileId);
      if (!fileId) {
        request.pause();
      }
      try {
        const fileDetail = await this.getFileDetails(filePath);
        console.log(fileDetail);
        // const writable = fs.createWriteStream(filePath, { start, flags: 'a' });
        file.on('data', (data) => {
          readable.push(data);
        });
      } catch (e) {}
    });

    busboy.on('error', (e) => {
      throw new HttpException(`the file upload error for ${e}.`, 500);
    });

    busboy.on('finish', () => {
      response.json({
        code: 200,
        message: 'ok',
      });
      response.end();
    });

    return request.pipe(busboy);
  }

  // Explanation: The request header must be "multipart/form-data" in order to trigger the @UploadedFile.
  @Post('file')
  async uploadFile(@UploadedFiles() files) {
    if (!files || (Array.isArray(files) && files.length < 1)) {
      throw new HttpException('the files is a required field. ', 400);
    }
    return {
      code: 200,
      message: 'ok',
    };
  }

  @Get('file:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join('upload', filename);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.sendFile(filePath);
  }

  private getFilePath(fileName, fileId) {
    return `./upload/file-${fileId}-${fileName}`;
  }
  private getFileDetails = (path: string) => {
    return promisify(fs.stat)(path) as unknown as Promise<IFileDetails>;
  };
}
