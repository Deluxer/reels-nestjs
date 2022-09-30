import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReelDto } from './dto/create-reel.dto';
import { UpdateReelDto } from './dto/update-reel.dto';
import { Reel } from './entities/reel.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class ReelsService {

  constructor(
    @InjectModel(Reel.name)
    private readonly reelModel: Model<Reel>,
  ) {}

  async create(createReelDto: CreateReelDto): Promise<Reel> {
    const reel = await this.reelModel.create(createReelDto);
    
    return reel;
  }

  async findAll(user: User) {

    const reels = await this.reelModel.find({
      userId: user.id
    });

    return reels;
  }

  async findById(id: string): Promise<Reel> {
    const reel = await this.reelModel.findById(id);

    if(!reel) return;

    return reel;
    
  }

  async remove(id: string) {
    
    const { urlImage, url } = await this.findById(id);
    await this.reelModel.deleteOne({id});
    const pathPhoto = this.getPhoto(urlImage)
    const pathVideo = this.getVideo(url)
    
    unlinkSync(pathPhoto)
    unlinkSync(pathVideo)
    return 'Reel deleted';
  }

  getVideo(videoName: string) {

    const path = join(__dirname, '../../static/videos', videoName);

    if(!existsSync(path)) throw new BadRequestException(`Video not found: ${ videoName }`)

    return path;
  }

  getPhoto(photoName: string) {

    const path = join(__dirname, '../../static/screenshots', photoName);

    if(!existsSync(path)) throw new BadRequestException(`Photo not found: ${ photoName }`)

    return path;
  }
}
