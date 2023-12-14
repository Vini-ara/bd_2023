import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MaterialDidaticoService } from './material-didatico.service';
import { CreateMaterialDidaticoDto } from './dto/create-material-didatico.dto';
import { UpdateMaterialDidaticoDto } from './dto/update-material-didatico.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('material-didatico')
export class MaterialDidaticoController {
  constructor(
    private readonly materialDidaticoService: MaterialDidaticoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMaterialDidaticoDto: CreateMaterialDidaticoDto,
    @Req() req: any,
  ) {
    this.materialDidaticoService.validateCrete(req);
    return this.materialDidaticoService.create(createMaterialDidaticoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.materialDidaticoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialDidaticoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDidaticoDto: UpdateMaterialDidaticoDto,
    @Req() req: any,
  ) {
    this.materialDidaticoService.validateUpdate(req);
    return this.materialDidaticoService.update(+id, updateMaterialDidaticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    this.materialDidaticoService.validateDelete(req);
    return this.materialDidaticoService.remove(+id);
  }
}
