import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CrearEventoDto } from './dto/crear-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  getAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CrearEventoDto) {
    return this.eventosService.create(dto);
  }

  @Post(':id/inscribir')
  inscribir(@Param('id') id: string) {
    return this.eventosService.inscribir(+id);
  }
}
