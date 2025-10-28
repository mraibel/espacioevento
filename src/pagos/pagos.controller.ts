import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get('usuario/:id_usuario')
  findByUsuario(@Param('id_usuario', ParseIntPipe) id_usuario: number) {
    return this.pagosService.findByUsuario(id_usuario);
  }

  @Get('evento/:id_evento')
  findByEvento(@Param('id_evento', ParseIntPipe) id_evento: number) {
    return this.pagosService.findByEvento(id_evento);
  }

  @Get('sala/:id_sala')
  findBySala(@Param('id_sala', ParseIntPipe) id_sala: number) {
    return this.pagosService.findBySala(id_sala);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.remove(id);
  }
}