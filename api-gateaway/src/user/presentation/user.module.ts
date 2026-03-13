import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { ServiceName } from 'src/shared/infrastructure/enums/service-name.enum';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceName.USER_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
            queue: configService.get<string>(
              'RABBITMQ_USER_QUEUE',
              'user_queue',
            ),
            queueOptions: {
              durable: configService.get<boolean>(
                'RABBITMQ_USER_QUEUE_DURABLE',
                false,
              ),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
