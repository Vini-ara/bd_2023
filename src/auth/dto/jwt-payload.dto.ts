import { PickType } from '@nestjs/mapped-types';
import { UserEnity } from 'src/entities';

export class JwtPayload extends PickType(UserEnity, [
  'id_usuario',
  'funcao',
  'nome',
  'login',
]) {}
