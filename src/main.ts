import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { LoggerErrorInterceptor } from 'pino-nestjs';
import { CatchEverythingFilter } from './app/core/filters/exception.filter';
import { LoggingService } from './app/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(),
  });
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get(LoggingService);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter, logger));
  app.useGlobalPipes(new ValidationPipe());

  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(4000);
}
bootstrap();
