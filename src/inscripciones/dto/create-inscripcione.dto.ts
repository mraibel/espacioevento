import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export enum EstadoPago {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
}

export class CreateInscripcioneDto {
  @IsNumber()
  id_evento: number;

  @IsNumber()
  id_usuario: number;

  @IsOptional()
  @IsEnum(EstadoPago)
  estado_pago?: EstadoPago;

  @IsOptional()
  @IsBoolean()
  asistencia?: boolean;

  @IsOptional()
  @IsDateString()
  fecha_inscripcion?: string;
}
