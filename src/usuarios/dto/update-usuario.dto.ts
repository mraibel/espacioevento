import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellido?: string;

    @IsOptional()
    @IsEmail()
    correo?: string;

    @IsOptional()
    @IsString()
    contraseña?: string;

    @IsOptional()
    @IsEnum(RolUsuario)
    rol?: RolUsuario;
}
