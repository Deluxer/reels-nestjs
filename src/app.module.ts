import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReelsModule } from './reels/reels.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','/src/client')
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    ReelsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
