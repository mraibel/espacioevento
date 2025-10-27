import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const exist = await this.usuarioRepository.findOne({ where: { correo: createUsuarioDto.correo } });
    if (exist) {
      throw new ConflictException('El correo ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      contraseña: hashedPassword,
    });
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UpdateResult> {
    return await this.usuarioRepository.update({ id_usuario: id }, updateUsuarioDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usuarioRepository.delete({ id_usuario: id });
  }

  async login(loginDto: LoginUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo: loginDto.correo } });
    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    const isMatch = await bcrypt.compare(loginDto.contraseña, usuario.contraseña);
    if (!isMatch) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    return usuario;
  }
}
