import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ItemEntity {
  @IsNumber()
  id_item: number;

  @IsString()
  descricao: string;

  @IsString()
  categoria: string;

  @IsDateString()
  dataAquisicao: string;

  @IsString()
  estadoConservacao: string;

  @IsString()
  localizacao: string;

  @IsString()
  url_foto_de_item: string;
}
