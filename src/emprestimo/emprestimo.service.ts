import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Injectable()
export class EmprestimoService {
  constructor(private dbService: DbService) {}

  async validateCrete(req: any, createEmprestimoDto: CreateEmprestimoDto) {
    const user = req.user;

    if (user?.funcao !== 'Estudante') {
      throw new BadRequestException(
        'Somente estudantes podem realizar empréstimos',
      );
    }

    const res = await this.dbService.query(
      'SELECT * FROM emprestimo WHERE id_item = $1 AND status = $2',
      [createEmprestimoDto.id_item, 'E'],
    );

    if (res.rows.length > 0) {
      throw new BadRequestException('Este item já está emprestado');
    }
  }

  async validateUpdate(id: number, req: any) {
    const user = req.user;

    if (user?.funcao !== 'Estudante') return;

    const res = await this.dbService.query(
      'SELECT * FROM emprestimo WHERE id_emprestimo = $1',
      [id],
    );

    if (res.rows[0].id_usuario !== user.id_usuario) {
      throw new BadRequestException(
        'Você não pode atualizar um empréstimo que não é seu',
      );
    }
  }

  async validateDelete(req: any) {
    const user = req.user;

    if (user?.funcao !== 'Estudante') return;

    throw new BadRequestException('Você não pode deletar um empréstimo');
  }

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    await this.dbService.query(
      'INSERT INTO emprestimo (id_item, id_usuario, data_emprestimo, status) VALUES ($1, $2, $3, $4)',
      [
        createEmprestimoDto.id_item,
        createEmprestimoDto.id_usuario,
        createEmprestimoDto.data_emprestimo,
        'E',
      ],
    );

    return 'Empréstimo realizado com sucesso!';
  }

  async findAll() {
    const res = await this.dbService.query('SELECT * FROM emprestimo');

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.dbService.query(
      'SELECT * FROM emprestimo WHERE id_emprestimo = $1',
      [id],
    );

    return res.rows;
  }

  async update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    await this.dbService.query(
      'UPDATE emprestimo SET status = $1, data_devolucao = $2 WHERE id_emprestimo = $3',
      [updateEmprestimoDto.status, updateEmprestimoDto.data_devolucao, id],
    );

    return 'Empréstimo atualizado com sucesso!';
  }

  async remove(id: number) {
    await this.dbService.query(
      'DELETE FROM emprestimo WHERE id_emprestimo = $1',
      [id],
    );

    return 'Empréstimo removido com sucesso!';
  }
}
