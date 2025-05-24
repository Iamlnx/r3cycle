# Arquitetura do Backend R3Cycle

O backend do R3Cycle foi desenvolvido com **Python** e **Flask**, seguindo uma arquitetura modular, orientada a serviços RESTful.

## Componentes principais

- **app.py**: Ponto de entrada da aplicação, inicializa extensões, CORS, e registra as blueprints de rotas.
- **models.py**: Define os modelos do banco de dados usando SQLAlchemy.
- **routes_crud.py**: Endpoints de CRUD protegidos para Estados, Cidades, Usuários, Pontos de Coleta e Conexões.
- **routes_auth.py**: Endpoints de autenticação e sessão (register, login, logout, status).
- **routes_rota.py**: Endpoint que calcula e retorna rotas (TSP, Dijkstra) e elementos do grafo para visualização.
- **routes_grafo.py**: Endpoint para retornar o grafo puro de uma cidade.
- **graphs.py**: Funções para gerar o grafo a partir do banco e marcar arestas de destaque.
- **tsp.py** / **dijkstra.py**: Algoritmos de roteamento implementados.
- **extensions.py**: Inicialização do banco (SQLAlchemy) e bcrypt.
- **config.py**: Carrega variáveis de ambiente e configurações do Flask.

## Banco de dados

- **ORM**: SQLAlchemy
- **Modelos**: Estado, Cidade, Usuario, PontoColeta, Conexao
- **Relacionamentos**: 
  - Cidade pertence a Estado
  - PontoColeta pertence a Cidade
  - Conexao liga dois Pontos de Coleta

## Segurança

- **Autenticação** por sessão Flask.
- **Proteção de endpoints**: 
  - Todos os endpoints de listagem/leitura requerem login.
  - Endpoints de escrita/alteração/remover requerem usuário admin.

## Fluxo geral

1. Usuário faz login para obter sessão.
2. Realiza operações CRUD conforme permissões.
3. Para visualização de rotas, acessa `/grafo_rota` com o id da cidade.
4. Backend calcula e retorna estrutura pronta para frontend consumir e visualizar.

