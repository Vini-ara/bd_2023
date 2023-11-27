import { Module } from '@nestjs/common';
import { MaterialDidaticoService } from './material-didatico.service';
import { MaterialDidaticoController } from './material-didatico.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [MaterialDidaticoController],
  providers: [MaterialDidaticoService],
  imports: [DbModule],
})
export class MaterialDidaticoModule {}
