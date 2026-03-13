import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const configService = appContext.get(ConfigService);
  const rabbitMqUserQueue = configService.getOrThrow<string>('RABBITMQ_USER_QUEUE');
  const rabbitMqUserQueueDurable = configService.get<boolean>('RABBITMQ_USER_QUEUE_DURABLE', false);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
        queue: rabbitMqUserQueue,
        queueOptions: {
          durable: rabbitMqUserQueueDurable,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
