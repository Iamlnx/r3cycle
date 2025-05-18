-- Criação do banco de dados (se ainda não existir)
CREATE DATABASE IF NOT EXISTS r3cycle;
USE r3cycle;

-- -------------------------
-- TABELA: estado
-- -------------------------
CREATE TABLE IF NOT EXISTS estado (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- -------------------------
-- TABELA: cidade
-- -------------------------
CREATE TABLE IF NOT EXISTS cidade (
    id_cidade INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado(id_estado)
);

-- -------------------------
-- TABELA: usuario
-- -------------------------
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, -- Senha deve ser salva já criptografada
    id_cidade INT NOT NULL,
    FOREIGN KEY (id_cidade) REFERENCES cidade(id_cidade)
);

-- -------------------------
-- TABELA: ponto_coleta
-- -------------------------
CREATE TABLE IF NOT EXISTS ponto_coleta (
    id_ponto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(150),
    tipo_residuo VARCHAR(100),
    cidade_id INT NOT NULL,
    FOREIGN KEY (cidade_id) REFERENCES cidade(id_cidade)
);

-- -------------------------
-- TABELA: conexao
-- -------------------------
CREATE TABLE IF NOT EXISTS conexao (
    id_conexao INT AUTO_INCREMENT PRIMARY KEY,
    ponto_origem_id INT NOT NULL,
    ponto_destino_id INT NOT NULL,
    peso INT NOT NULL, -- Peso representa o tempo estimado em MINUTOS
    FOREIGN KEY (ponto_origem_id) REFERENCES ponto_coleta(id_ponto),
    FOREIGN KEY (ponto_destino_id) REFERENCES ponto_coleta(id_ponto)
);