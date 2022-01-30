import {
  Controller,
  Get,
  Post,
  Redirect,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('index.html')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('api/fileanalyse')
  @UseInterceptors(FileInterceptor('upfile'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { name: file.originalname, type: file.mimetype, size: file.size };
  }
}
