# Fluxos do Usuário - Backend

## Cadastro

- Usuário acessa `/register` informando nome, email, senha.
- Após registro, faz `/login` para iniciar sessão.

## Sessão

- Usuário autenticado mantém sessão via cookies (gerenciado pelo frontend).
- `/status` retorna informações do usuário logado.

## CRUD de entidades

- Admin pode criar, editar e remover estados, cidades, usuários, pontos e conexões.
- Usuário comum pode apenas visualizar (GET) os dados.

## Visualização de rotas

- Para visualizar rotas, frontend faz POST em `/grafo_rota` com id da cidade.
- Backend calcula rota TSP (coleta) e Dijkstra (retorno), retorna elementos para frontend desenhar.

## Segurança

- Todo acesso exige login; CRUD exige admin.
- Sessão é mantida segura via Flask session.
