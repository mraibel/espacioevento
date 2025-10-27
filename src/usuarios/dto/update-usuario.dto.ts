import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsNotEmpty()
    @IsString()
    nombre?: string;

    @IsNotEmpty()
    @IsString()
    apellido?: string;

    @IsNotEmpty()
    @IsEmail()
    correo?: string;

    @IsNotEmpty()
    @IsString()
    contraseña?: string;

    @IsNotEmpty()
    @IsEnum(['administrador', 'organizador', 'asistente'])
    rol?: 'administrador' | 'organizador' | 'asistente';
}
