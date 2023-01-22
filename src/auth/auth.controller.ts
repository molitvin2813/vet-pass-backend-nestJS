import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  RegisterBody,
  LoginBody,
} from '../models/user.model';
import { ResponseObject } from 'src/models/response.model';
import { DoctorTable } from 'src/entities/DoctorTable';
import { AuthClientService } from './auth-client.service';
import { ClientTable } from 'src/entities/ClientTable';

@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authClientService: AuthClientService,
  ) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterBody })
  register(
    @Body(ValidationPipe) credentials: RegisterDTO,
  ): Promise<AuthResponse> {
    return this.authService.register(credentials);
  }

  @Post('/register/client')
  @ApiCreatedResponse({ description: 'Client Registration' })
  @ApiBody({ type: RegisterBody })
  registerClient(
    @Body(ValidationPipe) credentials: ClientTable,
  ): Promise<AuthResponse> {
    return this.authClientService.registerClient(credentials);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  login(@Body(ValidationPipe) credentials: LoginDTO): Promise<AuthResponse> {
    return this.authService.login(credentials);
  }

  @Post('/login/client')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  loginClient(
    @Body(ValidationPipe) credentials: LoginDTO,
  ): Promise<AuthResponse> {
    console.log('sdfsdf');
    return this.authClientService.loginClient(credentials);
  }
}
