import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EmprestimoService } from './emprestimo.service';
import { EmprestimoController } from './emprestimo.controller';

@Module({
  controllers: [EmprestimoController],
  providers: [EmprestimoService],
  imports: [DbModule],
})
export class EmprestimoModule {}
