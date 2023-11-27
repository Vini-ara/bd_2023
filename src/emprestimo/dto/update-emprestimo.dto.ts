import { PickType } from '@nestjs/mapped-types';
import { EmprestimoEntity } from 'src/entities/emprestimo.entity';

export class UpdateEmprestimoDto extends PickType(EmprestimoEntity, [
  'status',
]) {}
