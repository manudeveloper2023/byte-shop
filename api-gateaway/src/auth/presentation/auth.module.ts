import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        publicKey: readFileSync(
          configService.getOrThrow<string>('jwt.public_key_path'),
        ),
        verifyOptions: {
          algorithms: ['RS256'],
          issuer: configService.getOrThrow<string>('jwt.issuer'),
          audience: configService.getOrThrow<string>('jwt.audience'),
        },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
