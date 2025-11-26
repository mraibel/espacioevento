import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];
}
