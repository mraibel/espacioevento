import { IsEmail, IsEnum, IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];
}
