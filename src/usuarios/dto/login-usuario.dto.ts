import { IsEmail, IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  correo: string;

  @IsString()
  password: string;
}