import { IsEnum, IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateSalaDto {
    @IsString()
    nombre: string;

    @IsString()
    ubicación: string;

    @IsInt()
    @Min(1)
    capacidad: number;

    @IsNumber()
    @Min(0)
    precio_arriendo: number;

    @IsEnum(['disponible', 'arrendada', 'inactiva'])
    estado: 'disponible' | 'arrendada' | 'inactiva';
}
