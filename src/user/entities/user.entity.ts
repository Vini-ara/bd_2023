import { IsNumber, IsString } from 'class-validator';

export class UserEnity {
  @IsNumber()
  id: number;

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
  foto: string;
}
