import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';

import { ClientTable } from 'src/entities/ClientTable';
import { LoginDTO, RegisterDTO, AuthResponse } from 'src/models/user.model';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthClientService {
  constructor(
    @InjectRepository(ClientTable) private userRepo: Repository<ClientTable>,
    private jwtService: JwtService,
  ) {}

  async registerClient(credentials: ClientTable): Promise<AuthResponse> {
    try {
      const user = plainToClass(ClientTable, credentials);
      if ((await this.userRepo.count({ where: { login: user.login } })) != 0) {
        throw new ConflictException();
      }
      const idUser = await (await this.userRepo.save(user)).idClient;
      const payload = { login: user.login, role: 3 };
      const token = this.jwtService.sign(payload);
      const login = user.login;
      const role = 3;
      return { login, token, idUser, role };
    } catch (err) {
      if (err.status === 409) {
        throw new ConflictException('login has already been taken');
      }
      console.log(err.status);
      throw new InternalServerErrorException();
    }

    return null;
  }

  async loginClient(dd: LoginDTO): Promise<AuthResponse> {
    try {
      const login = dd.login;

      const user = await this.userRepo.findOne({ where: { login } });
      if (user == null) throw new UnauthorizedException('Ошибка входа');
      const idUser = user.idClient;
      const isValid = await user.comparePassword(dd.password);
      if (!isValid) {
        throw new UnauthorizedException('Ошибка входа');
      }
      const role = 3;
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
