import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ReelsService } from './reels.service';
import { ReelsController } from './reels.controller';
import { Reel, ReelSchema } from './entities/reel.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Reel.name,
        schema: ReelSchema,
      },
    ]),    
    UsersModule
  ],
  controllers: [ReelsController],
  providers: [
    ReelsService,
  ],
})
export class ReelsModule {}
