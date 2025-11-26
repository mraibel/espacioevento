import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,

        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET') || 'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id_usuario: +id });

        if (!user) throw new UnauthorizedException('Token not valid');

        // if (!user.isActive)
        //   throw new UnauthorizedException('User is inactive, talk with an admin');

        return user;
    }
}
