import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common';

async function bootstrap() {
  const logger = new Logger('main.ts', { timestamp: true });
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');

    app.useGlobalInterceptors(new ResponseInterceptor());
    app.enableCors();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.use(compression());
    app.use(helmet());
    const config = new DocumentBuilder()
      .setTitle('All Apis')
      .setDescription('Nest Basic app api documentation')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    logger.log(`Server started on port ${await app.getUrl()}`);
  } catch (error) {
    logger.error(error.stack);
  }
}
bootstrap();
