# Arquitetura do Frontend R3Cycle

O frontend do R3Cycle é uma SPA (Single Page Application) desenvolvida em **React** com uso extensivo de **React Router**, **Context API** para autenticação, e **React Flow** para visualização de grafos.

## Estrutura de Pastas

- `src/components/`: componentes reutilizáveis (NavBar, Login, Register, GraphView, etc)
- `src/routes/`: páginas/rotas principais (Home, CRUD)
- `src/contexts/`: contexto de autenticação (AuthContext)
- `src/services/api.js`: configuração do Axios para chamadas à API Flask
- `src/index.css`: estilos globais com TailwindCSS

## Principais Responsabilidades

- **Login e Autenticação:** gerenciamento de sessão via Context API, integrando com cookies de sessão do backend Flask.
- **Proteção de Rotas:** componentes `ProtectedRoute` e `AdminRoute` bloqueiam acesso conforme o tipo do usuário.
- **Visualização de Rotas:** página Home exibe grafos e rotas otimizadas usando React Flow.
- **CRUD de Entidades:** tela `/cadastros` permite cadastro e edição de estados, cidades, usuários, pontos e conexões.
- **Responsividade:** interface adaptável, menus e formulários responsivos para mobile e desktop.

## Fluxo de Navegação

- `/login` – tela de login
- `/register` – tela de cadastro
- `/` – dashboard principal (rotas), exige login
- `/cadastros` – painel de banco de dados, exige admin

---

## Comunicação com o Backend

- Todas as requisições são feitas via Axios para a API Flask (`client/src/services/api.js`)
- Autenticação baseada em cookies de sessão
- Endpoints RESTful conforme documentação do backend

