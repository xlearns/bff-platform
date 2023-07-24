import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function swagger(app, url: string) {
  return new Promise<void>((resolve) => {
    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription(' API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(url, app, document);
    resolve();
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await swagger(app, configService.get('RESTFUL_API'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
