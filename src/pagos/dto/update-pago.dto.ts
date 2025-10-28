import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';
import { EstadoPago, MetodoPago, TipoPago } from '../entities/pago.entity';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
    @IsOptional()
    @IsNumber()
    id_usuario?: number;

    @IsOptional()
    @IsNumber()
    id_evento?: number;

    @IsOptional()
    @IsNumber()
    id_sala?: number;

    @IsOptional()
    @IsNumber()
    monto?: number;

    @IsOptional()
    @IsEnum(TipoPago)
    tipo_pago?: TipoPago;

    @IsOptional()
    @IsEnum(MetodoPago)
    metodo?: MetodoPago;

    @IsOptional()
    @IsString()
    fecha_pago?: string;

    @IsOptional()
    @IsEnum(EstadoPago)
    estado?: EstadoPago;
}
