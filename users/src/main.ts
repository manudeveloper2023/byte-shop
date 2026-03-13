import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const rabbitmqUrl = configService.getOrThrow<string>('RABBITMQ_URL');
  const queue = configService.getOrThrow<string>('RABBITMQ_USER_QUEUE');
  const durable = configService.get<boolean>('RABBITMQ_USER_QUEUE_DURABLE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue,
      queueOptions: {
        durable,
      },
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
