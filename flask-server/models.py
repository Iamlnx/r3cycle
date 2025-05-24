from extensions import db

class Estado(db.Model):
    __tablename__ = 'estado'
    id_estado = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    
    def __init__(self, nome):
        self.nome = nome

class Cidade(db.Model):
    __tablename__ = 'cidade'
    id_cidade = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    id_estado = db.Column(db.Integer, db.ForeignKey('estado.id_estado'), nullable=False)
    
    def __init__(self, nome, id_estado):
        self.nome = nome
        self.id_estado = id_estado

class Usuario(db.Model):
    __tablename__ = 'usuario'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    tipo_usuario = db.Column(db.String(255), nullable=True)

    def __init__(self, nome, email, senha, id_cidade=None, tipo_usuario=None):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.tipo_usuario = tipo_usuario

class PontoColeta(db.Model):
    __tablename__ = 'ponto_coleta'
    id_ponto = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(150))
    tipo_residuo = db.Column(db.String(100))
    cidade_id = db.Column(db.Integer, db.ForeignKey('cidade.id_cidade'), nullable=False)
    x = db.Column(db.Integer, nullable=True)
    y = db.Column(db.Integer, nullable=True)

    def __init__(self, nome, cidade_id, endereco=None, tipo_residuo=None, x=None, y=None):
        self.nome = nome
        self.cidade_id = cidade_id
        self.endereco = endereco
        self.tipo_residuo = tipo_residuo
        self.x = x
        self.y = y

class Conexao(db.Model):
    __tablename__ = 'conexao'
    id_conexao = db.Column(db.Integer, primary_key=True)
    ponto_origem_id = db.Column(db.Integer, db.ForeignKey('ponto_coleta.id_ponto'), nullable=False)
    ponto_destino_id = db.Column(db.Integer, db.ForeignKey('ponto_coleta.id_ponto'), nullable=False)
    peso = db.Column(db.Integer, nullable=False)

    def __init__(self, ponto_origem_id, ponto_destino_id, peso):
        self.ponto_origem_id = ponto_origem_id
        self.ponto_destino_id = ponto_destino_id
        self.peso = peso
