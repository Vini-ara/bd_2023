import { OmitType } from '@nestjs/mapped-types';
import { CreateMaterialDidaticoDto } from './create-material-didatico.dto';

export class UpdateMaterialDidaticoDto extends OmitType(
  CreateMaterialDidaticoDto,
  ['numSerie'],
) {}
