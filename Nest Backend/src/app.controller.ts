import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { Helper } from './shared/helper';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload')
  @UseInterceptors(
    FileInterceptor('file-var', {
      storage: diskStorage({
        destination: Helper.filePath,
        filename: Helper.customFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() files): string {
    return 'success';
  }

  @Get('file-serve/:filename')
  findFile(@Param('filename') filename, @Res() res): Observable<any> {
    return of(res.sendFile(join(process.cwd(), './images/' + filename)));
  }

  @Delete('file-delete')
  deleteFile() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');

    const path = './images/video1.mp4';

    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }
}
