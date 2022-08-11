import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class LoginDTO {
  @IsString()
  @ApiProperty()
  login: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginBody extends LoginDTO {}

export class RegisterDTO extends LoginDTO {}

export class RegisterBody {
  @ApiProperty()
  user: RegisterDTO;
}

export class UpdateUserDTO {
  //@IsOptional()
  login: string;
}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}

export interface AuthPayload {
  login: string;
}

export interface UserResponse {
  login: string;
}

export interface AuthResponse extends UserResponse {
  token: string;
  idUser: number;
}
