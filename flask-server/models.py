from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Estado(db.Model):
    __tablename__ = 'estado'
    id_estado = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)

class Cidade(db.Model):
    __tablename__ = 'cidade'
    id_cidade = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    id_estado = db.Column(db.Integer, db.ForeignKey('estado.id_estado'), nullable=False)

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    id_cidade = db.Column(db.Integer, db.ForeignKey('cidade.id_cidade'), nullable=False)

class PontoColeta(db.Model):
    __tablename__ = 'ponto_coleta'
    id_ponto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(150))
    tipo_residuo = db.Column(db.String(100))
    cidade_id = db.Column(db.Integer, db.ForeignKey('cidade.id_cidade'), nullable=False)

class Conexao(db.Model):
    __tablename__ = 'conexao'
    id_conexao = db.Column(db.Integer, primary_key=True)
    ponto_origem_id = db.Column(db.Integer, db.ForeignKey('ponto_coleta.id_ponto'), nullable=False)
    ponto_destino_id = db.Column(db.Integer, db.ForeignKey('ponto_coleta.id_ponto'), nullable=False)
    peso = db.Column(db.Integer, nullable=False)

