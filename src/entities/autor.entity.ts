import { IsNumber, IsString } from 'class-validator';

export class AutorEntity {
  @IsNumber()
  id_item: number;

  @IsString()
  isbn_livro: string;

  @IsString()
  nome_autor: string;
}
