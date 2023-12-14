import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEnity } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './dto/jwt-payload.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEnity) {
    const userData = await this.userService.findOne(user.id_usuario);

    const payload: JwtPayload = {
      id_usuario: userData.id_usuario,
      funcao: userData.funcao,
      nome: userData.nome,
      login: userData.login,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      user: userData,
    };
  }

  async validateCredentials(login: string, senha: string) {
    const user = await this.userService.findOneByLogin(login);

    if (!user) throw new UnauthorizedException();

    const passowrdMatch = await bcrypt.compare(senha, user.senha);

    if (!passowrdMatch) throw new UnauthorizedException();

    return user;
  }
}
