import { IsNumber } from 'class-validator';

export class MaterialDidaticoEntity {
  @IsNumber()
  id_item: number;

  @IsNumber()
  numSerie: number;
}
