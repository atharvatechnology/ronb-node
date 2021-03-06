import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }));
  // implment global validation pipeline for explicit transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const PORT = configService.get('PORT') || 3000;
  await app.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
bootstrap();
