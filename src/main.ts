import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './exceptions/validation-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Constants } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<string>(Constants.port, '3000');
  await app.listen(port);
}
bootstrap();
