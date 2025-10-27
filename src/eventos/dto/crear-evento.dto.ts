import { IsString, IsDateString, IsNumber, Min, Length, IsEnum, IsOptional } from 'class-validator';
import { TipoEvento, EstadoEvento } from '../entities/evento.entity';

export class CrearEventoDto {
  @IsNumber()
  id_organizador: number;

  @IsNumber()
  id_sala: number;

  @IsString()
  @Length(3, 255)
  nombre_evento: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsString()
  hora_inicio: string;

  @IsString()
  hora_fin: string;
  
  @IsNumber()
  @Min(1)
  cupos_totales: number;

  @IsNumber()
  precio_entrada: number;

  @IsEnum(TipoEvento)
  tipo_evento: TipoEvento;

  @IsOptional()
  @IsEnum(EstadoEvento)
  estado?: EstadoEvento;
}
