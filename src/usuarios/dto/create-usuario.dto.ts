import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
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
    contraseña: string;

    @IsNotEmpty()
    @IsEnum(RolUsuario)
    rol: RolUsuario;
}
