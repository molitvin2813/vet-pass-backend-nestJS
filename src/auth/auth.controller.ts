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

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterBody })
  register(
    @Body(ValidationPipe) credentials: RegisterDTO,
  ): Promise<AuthResponse> {
    console.log(credentials);
    return this.authService.register(credentials);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginBody })
  login(@Body(ValidationPipe) credentials: LoginDTO): Promise<AuthResponse> {
    return this.authService.login(credentials);
  }
}
