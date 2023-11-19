import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.dbService.query(
      'INSERT INTO users (nome, sobrenome, login, senha, funcao, foto) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        createUserDto.nome,
        createUserDto.sobrenome,
        createUserDto.login,
        createUserDto.senha,
        createUserDto.funcao,
        createUserDto.foto,
      ],
    );
  }

  async findAll() {
    const res = await this.dbService.query('SELECT * FROM users');

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.dbService.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    return res.rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.dbService.query(
      'UPDATE users SET nome = $1, sobrenome = $2, login = $3, senha = $4, funcao = $5, foto = $6 WHERE id = $7',
      [
        updateUserDto.nome,
        updateUserDto.sobrenome,
        updateUserDto.login,
        updateUserDto.senha,
        updateUserDto.funcao,
        updateUserDto.foto,
        id,
      ],
    );
  }

  async remove(id: number) {
    return await this.dbService.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
