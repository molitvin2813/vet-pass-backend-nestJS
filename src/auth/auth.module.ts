import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorTable } from '../entities/DoctorTable';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './const';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthClientService } from './auth-client.service';
import { ClientTable } from 'src/entities/ClientTable';
@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorTable, ClientTable]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    AuthClientService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, AuthService, AuthClientService],
})
export class AuthModule {}
