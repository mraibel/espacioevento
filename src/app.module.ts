import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';
import { SeedModule } from './seed/seed.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SalasModule } from './salas/salas.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '1234',
    database: 'espacioeventodb',
    autoLoadEntities: true,
    synchronize: true, //Solo para desarrollo
  }), EventosModule, SeedModule, UsuariosModule, SalasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
