# Configuração do Backend R3Cycle

## Requisitos

- Python 3.8+
- Banco de dados: SQLite (default), MySQL ou PostgreSQL
- Variáveis de ambiente: `.env`

## Instalação

```bash
git clone https://github.com/Iamlnx/r3cycle.git
cd r3cycle/flask-server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Variáveis de ambiente

Crie um arquivo `.env`:

```
DATABASE_URL=sua_url
SECRET_KEY=sua_chave_secreta
```

Altere `DATABASE_URL` para conexão MySQL ou PostgreSQL se desejar.

## Inicialização

```bash
python app.py
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Testes

Para rodar testes (se houver):

```bash
pytest
```

## Notas

- Para produção, utilize um servidor WSGI como Gunicorn.
- O CORS já está habilitado para o frontend em localhost e produção.
