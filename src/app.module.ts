import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'espacioeventodb',
    autoLoadEntities: true,
    synchronize: true,
  }), EventosModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
