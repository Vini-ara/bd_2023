import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.dbService.query(
      'INSERT INTO usuario (nome, sobrenome, login, senha, funcao, url_foto_de_usuario) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        createUserDto.nome,
        createUserDto.sobrenome,
        createUserDto.login,
        createUserDto.senha,
        createUserDto.funcao,
        createUserDto.url_foto_de_usuario,
      ],
    );
  }

  async findAll() {
    const res = await this.dbService.query('SELECT * FROM usuario');

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.dbService.query(
      'SELECT * FROM usuario WHERE id_usuario = $1',
      [id],
    );

    return res.rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.dbService.query(
      'UPDATE usuario SET nome = $1, sobrenome = $2, login = $3, senha = $4, funcao = $5, url_foto_de_usuario = $6 WHERE id_usuario = $7',
      [
        updateUserDto.nome,
        updateUserDto.sobrenome,
        updateUserDto.login,
        updateUserDto.senha,
        updateUserDto.funcao,
        updateUserDto.url_foto_de_usuario,
        id,
      ],
    );
  }

  async remove(id: number) {
    return await this.dbService.query(
      'DELETE FROM usuario WHERE id_usuario = $1',
      [id],
    );
  }
}
