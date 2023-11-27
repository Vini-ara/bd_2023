import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Injectable()
export class EmprestimoService {
  constructor(private dbService: DbService) {}

  async create(createEmprestimoDto: CreateEmprestimoDto) {
    await this.dbService.query(
      'INSERT INTO emprestimo (id_item, id_usuario, data_emprestimo, data_devolucao, status) VALUES ($1, $2, $3, $4, $5)',
      [
        createEmprestimoDto.id_item,
        createEmprestimoDto.id_usuario,
        createEmprestimoDto.data_emprestimo,
        createEmprestimoDto.data_devolucao,
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
      'UPDATE emprestimo SET status = $1 WHERE id_emprestimo = $2',
      [updateEmprestimoDto.status, id],
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
