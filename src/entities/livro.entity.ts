import { IsNumber, IsString } from 'class-validator';

export class LivroEnity {
  @IsNumber()
  id_item: number;

  @IsString()
  isbn: string;

  @IsString()
  titulo: string;
}
