DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL,
  nome varchar(255) NOT NULL,
  sobrenome varchar(255) NOT NULL,
  funcao varchar(255) NOT NULL,
  login varchar(255) NOT NULL,
  senha varchar(255) NOT NULL,
  foto varchar(255) NOT NULL,
  PRIMARY KEY (id));
