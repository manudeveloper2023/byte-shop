import { Module } from '@nestjs/common';
import { UserModule } from './user/presentation/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './auth/presentation/infrastructure/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/presentation/guards/auth.guard';
import { AuthModule } from './auth/presentation/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    AuthModule,
    UserModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
