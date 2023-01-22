import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DoctorTable } from '../entities/DoctorTable';
import { LoginDTO, RegisterDTO, AuthResponse } from 'src/models/user.model';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DoctorTable) private userRepo: Repository<DoctorTable>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDTO): Promise<AuthResponse> {
    try {
      const user = plainToClass(DoctorTable, credentials);
      const idUser = await (await this.userRepo.save(user)).iddoctorTable;
      const payload = { login: user.login };
      const token = this.jwtService.sign(payload);
      const login = user.login;
      const role = user.isAdmin;
      return { login, token, idUser, role };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('login has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(dd: LoginDTO): Promise<AuthResponse> {
    try {
      const login = dd.login;
      const user = await this.userRepo.findOne({ where: { login } });
      if (user == null) throw new UnauthorizedException('Ошибка входа');
      const idUser = user.iddoctorTable;
      const isValid = await user.comparePassword(dd.password);
      if (!isValid) {
        throw new UnauthorizedException('Ошибка входа');
      }
      const role = user.isAdmin;
      const payload = {
        login: user.login,
        role: role,
      };
      const token = this.jwtService.sign(payload);
      return { login, token, idUser, role };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
