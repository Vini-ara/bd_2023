import { IsNumber, IsString } from 'class-validator';

export class UserEnity {
  @IsNumber()
  id_usuario: number;

  @IsString()
  nome: string;

  @IsString()
  sobrenome: string;

  @IsString()
  funcao: string;

  @IsString()
  login: string;

  @IsString()
  senha: string;

  @IsString()
  url_foto_de_usuario: string;
}
