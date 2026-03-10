import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { ServiceName } from 'src/shared/infrastructure/enums/service-name.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceName.USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST ?? 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT ?? '3001'),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
