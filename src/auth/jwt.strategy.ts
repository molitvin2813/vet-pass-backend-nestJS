import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { DoctorTable } from '../entities/DoctorTable';
import { AuthPayload } from 'src/models/user.model';
import { jwtConstants } from './const';
import { ClientTable } from 'src/entities/ClientTable';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(
    @InjectRepository(DoctorTable) private userRepo: Repository<DoctorTable>,
    @InjectRepository(ClientTable) private clientRepo: Repository<ClientTable>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthPayload) {
    try {
      console.log('JwtStrategy.validate ' + JSON.stringify(payload));
    } catch (err) {
      throw new InternalServerErrorException();
    }

    const { login, role } = payload;
    let user = null;
    //let isValid = false;
    if (role == 3) {
      user = this.clientRepo.find({ where: { login } });
    } else {
      user = this.userRepo.find({ where: { login } });
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
