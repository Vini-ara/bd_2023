import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('emprestimo')
export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createEmprestimoDto: CreateEmprestimoDto,
    @Req() req: any,
  ) {
    await this.emprestimoService.validateCrete(req, createEmprestimoDto);
    return await this.emprestimoService.create(createEmprestimoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.emprestimoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emprestimoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmprestimoDto: UpdateEmprestimoDto,
    @Req() req: any,
  ) {
    await this.emprestimoService.validateUpdate(+id, req);
    return await this.emprestimoService.update(+id, updateEmprestimoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    this.emprestimoService.validateDelete(req);
    return this.emprestimoService.remove(+id);
  }
}
