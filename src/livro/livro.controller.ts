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
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('livro')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLivroDto: CreateLivroDto, @Req() req: any) {
    this.livroService.validateCrete(req);
    return this.livroService.create(createLivroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.livroService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livroService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLivroDto: UpdateLivroDto,
    @Req() req: any,
  ) {
    this.livroService.validateUpdate(req);
    return this.livroService.update(+id, updateLivroDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    this.livroService.validateDelete(req);
    return this.livroService.remove(+id);
  }
}
