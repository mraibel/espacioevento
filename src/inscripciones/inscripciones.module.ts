import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcione } from './entities/inscripcione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcione])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [InscripcionesService],
})
export class InscripcionesModule { }
