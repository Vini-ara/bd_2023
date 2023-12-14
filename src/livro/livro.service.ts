import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LivroService {
  constructor(private dbService: DbService) {}

  async create(createLivroDto: CreateLivroDto) {
    await this.dbService.query(
      'WITH ins AS ( INSERT INTO item (descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id), second_ins as ( INSERT INTO livro (id_item, titulo, isbn) VALUES ( (SELECT id FROM ins), $7, $8) RETURNING id_item, isbn) INSERT INTO autor (id_item, isbn_livro, nome_autor) VALUES ((SELECT id_item FROM second_ins), (SELECT isbn FROM second_ins), $9)',
      [
        createLivroDto.descricao,
        createLivroDto.categoria,
        createLivroDto.dataAquisicao,
        createLivroDto.estadoConservacao,
        createLivroDto.localizacao,
        createLivroDto.url_foto_de_item,
        createLivroDto.titulo,
        createLivroDto.isbn,
        createLivroDto.nome_autor,
      ],
    );

    return 'Livro criado com sucesso!';
  }

  async findAll() {
    const res = await this.dbService.query(
      'SELECT id, descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item, titulo, isbn, nome_autor FROM item, livro, autor WHERE livro.id_item = id AND autor.id_item = id;',
    );

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.dbService.query(
      'SELECT id, descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item, titulo, isbn, nome_autor FROM item, livro, autor WHERE livro.id_item = id AND autor.id_item = id AND id = $1',
      [id],
    );

    return res.rows[0];
  }

  async update(id: number, updateLivroDto: UpdateLivroDto) {
    const client = await this.dbService.connect();

    try {
      await client.query('BEGIN');
      await client.query(
        'UPDATE item SET descricao = $1, categoria = $2, dataAquisicao =  $3, estadoConservacao = $4, localizacao = $5, url_foto_de_item = $6 WHERE id = $7',
        [
          updateLivroDto.descricao,
          updateLivroDto.categoria,
          updateLivroDto.dataAquisicao,
          updateLivroDto.estadoConservacao,
          updateLivroDto.localizacao,
          updateLivroDto.url_foto_de_item,
          id,
        ],
      );
      await client.query('UPDATE livro SET titulo = $1 WHERE id_item = $2', [
        updateLivroDto.titulo,
        id,
      ]);
      await client.query(
        'UPDATE autor SET nome_autor = $1 WHERE id_item = $2',
        [updateLivroDto.nome_autor, id],
      );
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      new BadRequestException(e.message);
    } finally {
      client.release();
    }

    return 'Livro atualizado com sucesso!';
  }

  async remove(id: number) {
    const client = await this.dbService.connect();
    await client.query('BEGIN');

    try {
      await client.query('DELETE FROM autor WHERE id_item = $1', [id]);
      await client.query('DELETE FROM livro WHERE id_item = $1', [id]);
      await client.query('DELETE FROM item WHERE id = $1', [id]);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      new BadRequestException(e.message);
    } finally {
      client.release();
    }

    return `Livro com id ${id} removido com sucesso!`;
  }
}
