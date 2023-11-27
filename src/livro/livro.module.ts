import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [LivroController],
  providers: [LivroService],
  imports: [DbModule],
})
export class LivroModule {}
