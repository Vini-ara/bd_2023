import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaterialDidaticoDto } from './dto/create-material-didatico.dto';
import { UpdateMaterialDidaticoDto } from './dto/update-material-didatico.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class MaterialDidaticoService {
  constructor(private dbService: DbService) {}

  async validateCrete(req: any) {
    const user = req?.user;

    if (user?.funcao === 'Estudante') {
      throw new BadRequestException(
        'Estudante não pode cadastrar material didático',
      );
    }
  }

  async validateUpdate(req: any) {
    const user = req.user;

    if (user?.funcao === 'Estudante') {
      throw new BadRequestException(
        'Estudante não pode atualizar material didático',
      );
    }
  }

  async validateDelete(req: any) {
    const user = req.user;

    if (user?.funcao === 'Estudante') {
      throw new BadRequestException(
        'Estudante não pode deletar material didático',
      );
    }
  }

  async create(createMaterialDidaticoDto: CreateMaterialDidaticoDto) {
    await this.dbService.query(
      'WITH ins AS (INSERT INTO item (descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id) INSERT INTO materialDidatico (id_item, numSerie) VALUES ((SELECT id FROM ins), $7)',
      [
        createMaterialDidaticoDto.descricao,
        createMaterialDidaticoDto.categoria,
        createMaterialDidaticoDto.dataAquisicao,
        createMaterialDidaticoDto.estadoConservacao,
        createMaterialDidaticoDto.localizacao,
        createMaterialDidaticoDto.url_foto_de_item,
        createMaterialDidaticoDto.numSerie,
      ],
    );

    return 'Material didático criado com sucesso!';
  }

  async findAll() {
    const res = await this.dbService.query(
      'SELECT id, descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item, numSerie FROM item, materialDidatico WHERE materialDidatico.id_item = id',
    );

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.dbService.query(
      'SELECT id, descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item, numSerie FROM item, materialDidatico WHERE materialDidatico.id_item = $1 AND item.id = $1',
      [id],
    );

    return res.rows[0];
  }

  async update(
    id: number,
    updateMaterialDidaticoDto: UpdateMaterialDidaticoDto,
  ) {
    await this.dbService.query(
      'UPDATE item SET descricao = $1, categoria = $2, dataAquisicao =  $3, estadoConservacao = $4, localizacao = $5, url_foto_de_item = $6 WHERE id = $7',
      [
        updateMaterialDidaticoDto.descricao,
        updateMaterialDidaticoDto.categoria,
        updateMaterialDidaticoDto.dataAquisicao,
        updateMaterialDidaticoDto.estadoConservacao,
        updateMaterialDidaticoDto.localizacao,
        updateMaterialDidaticoDto.url_foto_de_item,
        id,
      ],
    );

    return `Material didático atualizado com id = ${id} com sucesso!`;
  }

  async remove(id: number) {
    const client = await this.dbService.connect();
    await client.query('BEGIN');

    try {
      await client.query('DELETE FROM materialDidatico WHERE id_item = $1', [
        id,
      ]);
      await client.query('DELETE FROM item WHERE id = $1', [id]);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      new BadRequestException(e.message);
    } finally {
      client.release();
    }

    return `Material didático com id ${id} removido com sucesso!`;
  }
}
