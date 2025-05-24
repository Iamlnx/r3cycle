# R3Cycle

Sistema web para gerenciamento de rotas de coleta seletiva, cadastro de cidades, pontos de coleta, conexões, usuários e visualização de rotas otimizadas (TSP/Dijkstra) em um grafo interativo.

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Documentação](#documentação)
- [Testes](#testes)
- [Contato](#contato)

---

## Sobre o projeto

O R3Cycle possui frontend em React (client/) e backend em Flask (flask-server/), ambos prontos para rodar localmente ou em produção.

---

## Funcionalidades

- Cadastro de cidades, estados, usuários, pontos de coleta e conexões entre pontos
- Visualização gráfica das rotas de coleta e retorno à central (algoritmos TSP/Dijkstra)
- Interface responsiva
- Login e autenticação para usuários
- Painel CRUD completo via interface web

---

## Tecnologias Utilizadas

- **Frontend:** React, Tailwind CSS, React Flow
- **Backend:** Flask, SQLAlchemy, Flask-Bcrypt, Flask-CORS
- **Banco de Dados:** (SQLite por padrão, compatível com outros)
- **Outros:** Axios, Python-dotenv

---

## Instalação e Execução

Veja detalhes nas documentações específicas:

- [Configuração do Backend](docs/CONFIGURACAO.md)
- [Configuração do Frontend](docs/CONFIGURACAO_FRONTEND.md)

---

## Documentação

A documentação detalhada está dividida nos seguintes arquivos:

- **Arquitetura Backend:** [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)
- **Arquitetura Frontend:** [`docs/ARQUITETURA_FRONTEND.md`](docs/ARQUITETURA_FRONTEND.md)
- **API Backend:** [`docs/API.md`](docs/API.md)
- **Fluxo do Usuário Backend:** [`docs/FLUXO_USUARIO.md`](docs/FLUXO_USUARIO.md)
- **Fluxo do Usuário Frontend:** [`docs/FLUXO_USUARIO_FRONTEND.md`](docs/FLUXO_USUARIO_FRONTEND.md)
- **Testes Backend:** (descrever ou incluir exemplos em `/tests`)
- **Testes Frontend:** [`docs/TESTES_FRONTEND.md`](docs/TESTES_FRONTEND.md)
- **Configuração Backend:** [`docs/CONFIGURACAO.md`](docs/CONFIGURACAO.md)
- **Configuração Frontend:** [`docs/CONFIGURACAO_FRONTEND.md`](docs/CONFIGURACAO_FRONTEND.md)

---

## Contato

Dúvidas ou sugestões?  
Abra uma issue ou envie e-mail para [seu-email@exemplo.com](mailto:seu-email@exemplo.com).

---
