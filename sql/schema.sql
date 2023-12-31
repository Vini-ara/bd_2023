DROP TABLE IF EXISTS autor;

DROP TABLE IF EXISTS livro;

DROP TABLE IF EXISTS materialDidatico;

DROP TABLE IF EXISTS emprestimo;

DROP TABLE IF EXISTS item;

DROP TABLE IF EXISTS usuario;

create table usuario (
	id_usuario BIGSERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	sobrenome VARCHAR(150) NOT NULL,
	funcao VARCHAR(30) NOT NULL,
	login VARCHAR(50) NOT NULL,
	senha VARCHAR(250) NOT NULL,
	url_foto_de_usuario VARCHAR(150)
);

create table item (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	descricao VARCHAR(50),
	categoria VARCHAR(150) NOT NULL,
	dataAquisicao DATE NOT NULL,
	estadoConservacao VARCHAR(50) NOT NULL,
	localizacao VARCHAR(150) NOT NULL,
	url_foto_de_item VARCHAR(150)
);

create table emprestimo (
  id_emprestimo BIGSERIAL NOT NULL,
	id_item BIGSERIAL NOT NULL,
  id_usuario BIGSERIAL NOT NULL,
	data_emprestimo DATE,
  data_devolucao DATE,
  status CHAR,
	PRIMARY KEY(id_item, id_usuario, id_emprestimo),
	CONSTRAINT fk_item
        FOREIGN KEY (id_item)
        REFERENCES item (id),
    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario)
);

create table livro (
	id_item BIGSERIAL NOT NULL,
  titulo VARCHAR(100) NOT NULL,
	isbn VARCHAR(100) NOT NULL,
    PRIMARY KEY (isbn, id_item),
    CONSTRAINT fk_item
        FOREIGN KEY (id_item)
        REFERENCES item (id)   
);

create table materialDidatico (
	id_item BIGSERIAL NOT NULL,
	numSerie INT NOT NULL,
	PRIMARY KEY(id_item, numSerie),
	CONSTRAINT fk_item
		FOREIGN KEY (id_item)
		REFERENCES item(id)
);

create table autor (
	id_item BIGSERIAL NOT NULL,
	isbn_livro VARCHAR(50) NOT NULL,
	nome_autor VARCHAR(50) NOT NULL,
	PRIMARY KEY(isbn_livro, id_item, nome_autor),
	CONSTRAINT fk_livro
		FOREIGN KEY (isbn_livro, id_item)
		REFERENCES livro(isbn, id_item)
);

--INSERCAO DE LINHAS

-- Inserindo dados na tabela "usuario"
INSERT INTO usuario (nome, sobrenome, funcao, login, senha, url_foto_de_usuario)
VALUES ('Joao', 'Silva', 'Membro', 'joao.silva', '$2a$10$.kP5WV4ApqHBBme73AHPQ.SmT5E3g7vgrneERmfphQcKgXjvG1/XW$2a$10$.kP5WV4ApqHBBme73AHPQ.SmT5E3g7vgrneERmfphQcKgXjvG1/XW', 'url_foto_joao'),
       ('Maria', 'Santos', 'Adiministrador', 'maria.santos', '$2a$10$Mx5.4fXDPUvKoS2hZCbnFeqoqQBa87BU1y6MLUnpYXmKUOZtLPG6C', 'url_foto_maria'),
       ('Pedro', 'Almeida', 'Estudante', 'pedro.almeida', '$2a$10$RhMWqJcvlLLmr47Mr86GIOyKFqZSlKWU3m71YuuiQxv3YoS8KUulu', 'url_foto_pedro');

-- Inserindo dados na tabela "item"
INSERT INTO item (descricao, categoria, dataAquisicao, estadoConservacao, localizacao, url_foto_de_item)
VALUES ('Livro de Fisica', 'Livros', '2023-01-15', 'Bom estado', 'Biblioteca', 'url_foto_livro_fisica'),
       ('Notebook Dell', 'Eletronicos', '2023-02-20', 'Novo', 'Sala 301', 'url_foto_notebook'),
       ('Projetor Epson', 'Eletronicos', '2023-03-10', 'Usado', 'Auditorio', 'url_foto_projetor'),
       ('Livro de Matematica', 'Livros', '2023-01-20', 'Novo', 'Sala 504', 'url_foto_livro_matematica'),
       ('Impressora Caspian', 'Eletronicos', '2023-06-23', 'Usado', 'Cordenadoria 3', 'url_foto_impressora'),
       ('Livro de Portugues', 'Livros', '2023-08-12', 'Novo', 'Sala 102', 'url_foto_livro_portugues');

-- Inserindo dados na tabela "livro"
INSERT INTO livro (id_item, titulo, isbn)
VALUES (1, 'Relatividade','978-85-221-1495-1'),
       (4, 'Calculo 1','978-85-359-0277-3'),
       (6, 'Gramática' ,'978-85-7858-032-5');

-- Inserindo dados na tabela "materialDidatico"
INSERT INTO materialDidatico (id_item, numSerie)
VALUES (2, 123),
       (3, 456),
       (5, 789);

-- Inserindo dados na tabela "autor"
INSERT INTO autor (id_item, isbn_livro, nome_autor)
VALUES (1, '978-85-221-1495-1', 'Albert Einstein'),
       (4, '978-85-359-0277-3', 'Stephen Hawking'),
       (6, '978-85-7858-032-5', 'Isaac Newton');
