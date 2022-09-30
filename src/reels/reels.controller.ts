import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UploadedFile, UseInterceptors, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReelsService } from './reels.service';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CutVideoInterceptor } from './interceptors/cut-video.interceptor';
import { fileName } from './helpers/fileName.helper';
import { Response } from 'express';
import { fileImageUrl, fileVideoUrl } from './helpers/file-url.helper';
import * as fs from 'fs';

@Controller('reels')
export class ReelsController {
  constructor(
    private readonly reelsService: ReelsService,
  ) {}

  @Get('videos/:videoName')
  findVideoImage(
    @Res() response: Response,
    @Param('videoName') videoName: string
  ){
    const path = this.reelsService.getVideo(videoName);

    response.sendFile(path);
  }

  @Get('photo/:photoName')
  findPhoto(
    @Res() response: Response,
    @Param('photoName') photoName: string
  ){
    const path = this.reelsService.getPhoto(photoName);

    response.sendFile(path);
  }

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileName
      })
    }),
    CutVideoInterceptor
  )
  create( 
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ) {
    const imageName = file.originalname.split('.');
    imageName.pop()
    const fileName = imageName.join('.');
    const urlVideo = fileVideoUrl(file.filename);
    const urlImage = fileImageUrl(file.filename);
    
    const createReelDto = new CreateReelDto(
      fileName,
      urlVideo,
      urlImage,
      user.id,
      new Date()
    );

    return this.reelsService.create(createReelDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(
    @GetUser() user: User,
  ) {
    return this.reelsService.findAll(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reelsService.remove(id);
  }
}
