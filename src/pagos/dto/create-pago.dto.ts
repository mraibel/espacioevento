import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoPago, MetodoPago, EstadoPago } from '../entities/pago.entity';

export class CreatePagoDto {
@IsNumber()
  id_usuario: number;

  @IsNumber()
  id_evento?: number;

  @IsNumber()
  id_sala?: number;

  @IsNumber()
  monto: number;

  @IsEnum(TipoPago)
  tipo_pago: TipoPago;

  @IsEnum(MetodoPago)
  metodo: MetodoPago;

  @IsString()
  fecha_pago: string;

  @IsEnum(EstadoPago)
  @IsOptional()
  estado?: EstadoPago; // por defecto es 'pendiente'
}
