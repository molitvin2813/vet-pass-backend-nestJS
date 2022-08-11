import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { DoctorTable } from '../entities/DoctorTable';
import { AuthPayload } from 'src/models/user.model';
import { jwtConstants } from './const';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(DoctorTable) private userRepo: Repository<DoctorTable>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthPayload) {
    console.log('JwtStrategy.validate ' + JSON.stringify(payload));
    const { login } = payload;
    const user = this.userRepo.find({ where: { login } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
