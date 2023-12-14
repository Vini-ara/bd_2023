import { OmitType } from '@nestjs/mapped-types';
import { EmprestimoEntity } from 'src/entities/emprestimo.entity';

export class CreateEmprestimoDto extends OmitType(EmprestimoEntity, [
  'status',
  'data_devolucao',
]) {}
