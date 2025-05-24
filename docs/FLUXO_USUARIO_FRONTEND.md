# Fluxos do Usuário - Frontend

## 1. Autenticação

- Usuário acessa `/login` e insere e-mail e senha.
- Após sucesso, sessão é mantida via Context API e cookies.
- Usuário pode se registrar em `/register`.

## 2. Visualização de Rotas

- Após login, usuário acessa a página principal.
- Seleciona uma cidade para visualizar os grafos e rotas de coleta/retorno.
- As rotas são exibidas visualmente e destacadas conforme TSP/Dijkstra.

## 3. Acesso ao CRUD de Banco de Dados

- Usuário admin pode acessar `/cadastros`.
- Cada aba permite CRUD de entidades (estados, cidades, usuários, pontos, conexões).
- Todos os formulários e tabelas são responsivos.

## 4. Responsividade

- Menus, formulários e tabelas se adaptam para mobile e desktop.
- Menu hamburger é exibido em telas pequenas.

## 5. Logout

- O botão "Sair" encerra a sessão e retorna o usuário para o login.

