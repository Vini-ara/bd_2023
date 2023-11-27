import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { ItemEntity, MaterialDidaticoEntity } from 'src/entities';

export class CreateMaterialDidaticoDto extends IntersectionType(
  OmitType(MaterialDidaticoEntity, ['id_item']),
  OmitType(ItemEntity, ['id_item']),
) {}
