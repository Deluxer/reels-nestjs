import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify' ;
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    
  await app.listen(process.env.PORT, () => {
    console.log(`Listen port: ${ process.env.PORT }`);
  });
}
bootstrap();
