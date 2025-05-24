from flask import Blueprint, request, jsonify
from models import db, Estado, Cidade, Usuario, PontoColeta, Conexao

routes = Blueprint('routes', __name__)

# --- CRUD Estado ---
@routes.route('/estados', methods=['GET'])
def get_estados():
    estados = Estado.query.all()
    return jsonify([{'id_estado': e.id_estado, 'nome': e.nome} for e in estados])

@routes.route('/estados/<int:id_estado>', methods=['GET'])
def get_estado(id_estado):
    e = Estado.query.get_or_404(id_estado)
    return jsonify({'id_estado': e.id_estado, 'nome': e.nome})

@routes.route('/estados', methods=['POST'])
def create_estado():
    data = request.get_json()
    e = Estado(nome=data['nome'])
    db.session.add(e)
    db.session.commit()
    return jsonify({'id_estado': e.id_estado, 'nome': e.nome}), 201

@routes.route('/estados/<int:id_estado>', methods=['PUT'])
def update_estado(id_estado):
    e = Estado.query.get_or_404(id_estado)
    data = request.get_json()
    e.nome = data.get('nome', e.nome)
    db.session.commit()
    return jsonify({'id_estado': e.id_estado, 'nome': e.nome})

@routes.route('/estados/<int:id_estado>', methods=['DELETE'])
def delete_estado(id_estado):
    e = Estado.query.get_or_404(id_estado)
    db.session.delete(e)
    db.session.commit()
    return '', 204

# --- CRUD Cidade ---
@routes.route('/cidades', methods=['GET'])
def get_cidades():
    cidades = Cidade.query.all()
    return jsonify([{'id_cidade': c.id_cidade, 'nome': c.nome, 'id_estado': c.id_estado} for c in cidades])

@routes.route('/cidades/<int:id_cidade>', methods=['GET'])
def get_cidade(id_cidade):
    c = Cidade.query.get_or_404(id_cidade)
    return jsonify({'id_cidade': c.id_cidade, 'nome': c.nome, 'id_estado': c.id_estado})

@routes.route('/cidades', methods=['POST'])
def create_cidade():
    data = request.get_json()
    c = Cidade(nome=data['nome'], id_estado=data['id_estado'])
    db.session.add(c)
    db.session.commit()
    return jsonify({'id_cidade': c.id_cidade, 'nome': c.nome, 'id_estado': c.id_estado}), 201

@routes.route('/cidades/<int:id_cidade>', methods=['PUT'])
def update_cidade(id_cidade):
    c = Cidade.query.get_or_404(id_cidade)
    data = request.get_json()
    c.nome = data.get('nome', c.nome)
    c.id_estado = data.get('id_estado', c.id_estado)
    db.session.commit()
    return jsonify({'id_cidade': c.id_cidade, 'nome': c.nome, 'id_estado': c.id_estado})

@routes.route('/cidades/<int:id_cidade>', methods=['DELETE'])
def delete_cidade(id_cidade):
    c = Cidade.query.get_or_404(id_cidade)
    db.session.delete(c)
    db.session.commit()
    return '', 204

# --- CRUD Usuario ---
@routes.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{
        'id_usuario': u.id_usuario,
        'nome': u.nome,
        'email': u.email,
        'tipo_usuario': u.tipo_usuario
    } for u in usuarios])

@routes.route('/usuarios/<int:id_usuario>', methods=['GET'])
def get_usuario(id_usuario):
    u = Usuario.query.get_or_404(id_usuario)
    return jsonify({
        'id_usuario': u.id_usuario,
        'nome': u.nome,
        'email': u.email,
        'tipo_usuario': u.tipo_usuario
    })

@routes.route('/usuarios/<int:id_usuario>', methods=['PUT'])
def update_usuario(id_usuario):
    u = Usuario.query.get_or_404(id_usuario)
    data = request.get_json()
    u.nome = data.get('nome', u.nome)
    u.email = data.get('email', u.email)
    u.senha = data.get('senha', u.senha)
    u.tipo_usuario = data.get('tipo_usuario', u.tipo_usuario)
    db.session.commit()
    return jsonify({
        'id_usuario': u.id_usuario,
        'nome': u.nome,
        'email': u.email,
        'tipo_usuario': u.tipo_usuario
    })

@routes.route('/usuarios/<int:id_usuario>', methods=['DELETE'])
def delete_usuario(id_usuario):
    u = Usuario.query.get_or_404(id_usuario)
    db.session.delete(u)
    db.session.commit()
    return '', 204

# --- CRUD PontoColeta ---
@routes.route('/pontos', methods=['GET'])
def get_pontos():
    pontos = PontoColeta.query.all()
    return jsonify([{
        'id_ponto': p.id_ponto,
        'nome': p.nome,
        'endereco': p.endereco,
        'tipo_residuo': p.tipo_residuo,
        'cidade_id': p.cidade_id,
        'x': p.x,
        'y': p.y
    } for p in pontos])

@routes.route('/pontos/<int:id_ponto>', methods=['GET'])
def get_ponto(id_ponto):
    p = PontoColeta.query.get_or_404(id_ponto)
    return jsonify({
        'id_ponto': p.id_ponto,
        'nome': p.nome,
        'endereco': p.endereco,
        'tipo_residuo': p.tipo_residuo,
        'cidade_id': p.cidade_id,
        'x': p.x,
        'y': p.y
    })

@routes.route('/pontos', methods=['POST'])
def create_ponto():
    data = request.get_json()
    p = PontoColeta(
        nome=data['nome'],
        endereco=data.get('endereco'),
        tipo_residuo=data.get('tipo_residuo'),
        cidade_id=data['cidade_id'],
        x=data['x'],
        y=data['y']
    )
    db.session.add(p)
    db.session.commit()
    return jsonify({
        'id_ponto': p.id_ponto,
        'nome': p.nome,
        'endereco': p.endereco,
        'tipo_residuo': p.tipo_residuo,
        'cidade_id': p.cidade_id,
        'x': p.x,
        'y': p.y
    }), 201

@routes.route('/pontos/<int:id_ponto>', methods=['PUT'])
def update_ponto(id_ponto):
    p = PontoColeta.query.get_or_404(id_ponto)
    data = request.get_json()
    p.nome = data.get('nome', p.nome)
    p.endereco = data.get('endereco', p.endereco)
    p.tipo_residuo = data.get('tipo_residuo', p.tipo_residuo)
    p.cidade_id = data.get('cidade_id', p.cidade_id)
    p.x = data.get('x', p.x)
    p.y = data.get('y', p.y)
    db.session.commit()
    return jsonify({
        'id_ponto': p.id_ponto,
        'nome': p.nome,
        'endereco': p.endereco,
        'tipo_residuo': p.tipo_residuo,
        'cidade_id': p.cidade_id,
        'x': p.x,
        'y': p.y
    })

@routes.route('/pontos/<int:id_ponto>', methods=['DELETE'])
def delete_ponto(id_ponto):
    p = PontoColeta.query.get_or_404(id_ponto)
    db.session.delete(p)
    db.session.commit()
    return '', 204

# --- CRUD Conexao ---
@routes.route('/conexoes', methods=['GET'])
def get_conexoes():
    conexoes = Conexao.query.all()
    return jsonify([{
        'id_conexao': c.id_conexao,
        'ponto_origem_id': c.ponto_origem_id,
        'ponto_destino_id': c.ponto_destino_id,
        'peso': c.peso
    } for c in conexoes])

@routes.route('/conexoes/<int:id_conexao>', methods=['GET'])
def get_conexao(id_conexao):
    c = Conexao.query.get_or_404(id_conexao)
    return jsonify({
        'id_conexao': c.id_conexao,
        'ponto_origem_id': c.ponto_origem_id,
        'ponto_destino_id': c.ponto_destino_id,
        'peso': c.peso
    })

@routes.route('/conexoes', methods=['POST'])
def create_conexao():
    data = request.get_json()
    c = Conexao(
        ponto_origem_id=data['ponto_origem_id'],
        ponto_destino_id=data['ponto_destino_id'],
        peso=data['peso']
    )
    db.session.add(c)
    db.session.commit()
    return jsonify({
        'id_conexao': c.id_conexao,
        'ponto_origem_id': c.ponto_origem_id,
        'ponto_destino_id': c.ponto_destino_id,
        'peso': c.peso
    }), 201

@routes.route('/conexoes/<int:id_conexao>', methods=['PUT'])
def update_conexao(id_conexao):
    c = Conexao.query.get_or_404(id_conexao)
    data = request.get_json()
    c.ponto_origem_id = data.get('ponto_origem_id', c.ponto_origem_id)
    c.ponto_destino_id = data.get('ponto_destino_id', c.ponto_destino_id)
    c.peso = data.get('peso', c.peso)
    db.session.commit()
    return jsonify({
        'id_conexao': c.id_conexao,
        'ponto_origem_id': c.ponto_origem_id,
        'ponto_destino_id': c.ponto_destino_id,
        'peso': c.peso
    })

@routes.route('/conexoes/<int:id_conexao>', methods=['DELETE'])
def delete_conexao(id_conexao):
    c = Conexao.query.get_or_404(id_conexao)
    db.session.delete(c)
    db.session.commit()
    return '', 204
