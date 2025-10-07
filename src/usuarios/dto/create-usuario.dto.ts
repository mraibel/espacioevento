import { IsEmail, IsString } from "class-validator";


export class CreateUsuarioDto {

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsEmail()
    correo: string;

    @IsString()
    password: string;

    @IsString()
    rol: string;
}
