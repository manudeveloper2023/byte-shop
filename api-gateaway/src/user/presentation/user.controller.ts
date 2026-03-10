import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/auth/presentation/decorators/public.decorator';
import { ServiceName } from 'src/shared/infrastructure/enums/service-name.enum';

@Controller('users')
export class UserController {
  constructor(
    @Inject(ServiceName.USER_SERVICE) private readonly client: ClientProxy,
  ) {}
  @Get()
  @Public()
  getUsers() {
    return this.client.send({ cmd: 'get_users' }, {});
  }
}
