import { IsString, IsDateString, IsNumber, Min, Length, Matches } from 'class-validator';

export class CrearEventoDto {
  @IsString()
  @Length(3, 255, { message: 'El nombre debe tener entre 3 y 255 caracteres' })
  nombre: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe estar en formato HH:MM (24h)',
  })
  hora: string;

  @IsNumber()
  @Min(1, { message: 'Los cupos deben ser al menos 1' })
  cupos: number;
}
