import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { AutorEntity, ItemEntity, LivroEnity } from 'src/entities';

export class CreateLivroDto extends IntersectionType(
  OmitType(LivroEnity, ['id_item']),
  OmitType(ItemEntity, ['id_item']),
  OmitType(AutorEntity, ['id_item', 'isbn_livro']),
) {}
