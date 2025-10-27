import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcioneDto } from './create-inscripcione.dto';
import { IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { EstadoPago } from './create-inscripcione.dto';

export class UpdateInscripcioneDto extends PartialType(CreateInscripcioneDto) {
  @IsOptional()
  @IsEnum(EstadoPago)
  estado_pago?: EstadoPago;

  @IsOptional()
  @IsBoolean()
  asistencia?: boolean;
}
