CREATE DATABASE IF NOT EXISTS adocao_pets;
USE adocao_pets;

CREATE TABLE IF NOT EXISTS especies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie_id INT NOT NULL,
  idade INT NOT NULL,
  porte ENUM('pequeno','medio','grande') NOT NULL,
  descricao TEXT,
  foto_url VARCHAR(255),
  status ENUM('disponivel','em_processo','adotado') NOT NULL DEFAULT 'disponivel',
  FOREIGN KEY (especie_id) REFERENCES especies(id)
);

INSERT IGNORE INTO especies (nome) VALUES ('Cachorro'), ('Gato'), ('Coelho');