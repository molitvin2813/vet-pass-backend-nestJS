import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { DoctorTable } from '../entities/DoctorTable';
import {
  LoginDTO,
  RegisterDTO,
  UpdateUserDTO,
  AuthResponse,
} from 'src/models/user.model';
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
      await console.log(credentials);
      const idUser = await (await this.userRepo.save(user)).iddoctorTable;
      const payload = { login: user.login };
      const token = this.jwtService.sign(payload);
      const login = user.login;
      return { login, token, idUser };
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
      const idUser = user.iddoctorTable;
      await console.log(dd);
      const isValid = await user.comparePassword(dd.password);
      await console.log(isValid);
      if (!isValid) {
        throw new UnauthorizedException('Ошибка входа');
      }
      const payload = { login: user.login };
      const token = this.jwtService.sign(payload);

      return { login, token, idUser };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
