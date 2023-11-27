import { OmitType } from '@nestjs/mapped-types';
import { CreateLivroDto } from './create-livro.dto';

export class UpdateLivroDto extends OmitType(CreateLivroDto, ['isbn']) {}
