from flask import Blueprint, request, jsonify, session
from models import Usuario
from extensions import db, bcrypt

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    tipo_usuario = data.get('tipo_usuario')
    if not nome or not email or not senha:
        return jsonify({'erro': 'Nome, email e senha são obrigatórios'}), 400
    if Usuario.query.filter_by(email=email).first():
        return jsonify({'erro': 'Email já cadastrado'}), 400
    senha_hash = bcrypt.generate_password_hash(senha).decode('utf-8')
    novo_usuario = Usuario(nome=nome, email=email, senha=senha_hash, tipo_usuario=tipo_usuario)
    db.session.add(novo_usuario)
    db.session.commit()
    return jsonify({'mensagem': 'Usuário registrado com sucesso'})

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')
    usuario = Usuario.query.filter_by(email=email).first()
    print("Usuário:", usuario)
    print("Senha enviada:", senha)
    print("Hash armazenado:", usuario.senha if usuario else None)
    print("Senha confere:", bcrypt.check_password_hash(usuario.senha, senha) if usuario else None)
    if usuario and bcrypt.check_password_hash(usuario.senha, senha):
        session['usuario_id'] = usuario.id_usuario
        session['usuario_nome'] = usuario.nome
        session['usuario_email'] = usuario.email
        session['tipo_usuario'] = usuario.tipo_usuario
        return jsonify({'mensagem': 'Login realizado com sucesso'})
    return jsonify({'erro': 'Email ou senha inválidos'}), 401

@auth_routes.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'mensagem': 'Logout realizado com sucesso'})

@auth_routes.route('/status', methods=['GET'])
def status():
    if 'usuario_id' in session:
        return jsonify({
            'usuario': {
                'id': session['usuario_id'],
                'nome': session['usuario_nome'],
                'email': session['usuario_email'],
                'tipo_usuario': session['tipo_usuario']
            }
        })
    return jsonify({'usuario': None}), 401
