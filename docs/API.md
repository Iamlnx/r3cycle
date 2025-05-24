# Documentação da API Backend R3Cycle

Base URL: `/` (http://localhost:3000/)

---

## Autenticação

### POST `/register`
Cria novo usuário.

**Body:**
```json
{ "nome": "Exemplo", "email": "a@b.com", "senha": "123", "tipo_usuario": "admin" }
```
**Resposta:**  
`{ "mensagem": "Usuário registrado com sucesso" }`

---

### POST `/login`
Efetua login (sessão).

**Body:**
```json
{ "email": "a@b.com", "senha": "123" }
```
**Resposta:**
`{ "mensagem": "Login realizado com sucesso" }`  
Em caso de erro: `{ "erro": "Email ou senha inválidos" }`

---

### POST `/logout`
Efetua logout.

---

### GET `/status`
Retorna dados do usuário logado (se houver).

---

## Estados

### GET `/estados`
Lista todos os estados (login obrigatório).

### POST `/estados`
Cria um estado (admin obrigatório).

**Body:** `{ "nome": "SP" }`

### PUT `/estados/<id>`
Edita estado (admin).

### DELETE `/estados/<id>`
Remove estado (admin).

---

## Cidades

### GET `/cidades`
Lista todas as cidades (login).

### POST `/cidades`
Cria cidade (admin).

**Body:** `{ "nome": "Campinas", "id_estado": 1 }`

### PUT/DELETE `/cidades/<id>`
Edita/Remove cidade (admin).

---

## Usuários

### GET `/usuarios`
Lista todos os usuários (login).

### POST `/usuarios`
Cria usuário (admin).

### PUT/DELETE `/usuarios/<id>`
Edita/Remove usuário (admin).

---

## Pontos de Coleta

### GET `/pontos`
Lista todos os pontos (login).

### POST `/pontos`
Cria ponto de coleta (admin).

**Body:**
```json
{
  "nome": "Central de Transportes",
  "cidade_id": 1,
  "x": 100,
  "y": 200,
  "endereco": "Rua X",
  "tipo_residuo": "Orgânico"
}
```

---

## Conexões

### GET `/conexoes`
Lista todas as conexões (login).

### POST `/conexoes`
Cria conexão (admin).

**Body:**  
`{ "ponto_origem_id": 1, "ponto_destino_id": 2, "peso": 10 }`

---

## Grafos e Rotas

### POST `/grafo_rota`
Retorna elementos do grafo, rota TSP e Dijkstra para uma cidade.

**Body:**  
`{ "id_cidade": 1 }`

**Resposta:**
```json
{
  "elements": [ ... ], // nós e arestas
  "tsp": ["Central de Transportes", "B", "C", ...],
  "tsp_valor": 120,
  "dijkstra": ["X", "Y", ...],
  "dijkstra_valor": 40
}
```

### GET `/grafo/<id_cidade>`
Retorna apenas a estrutura do grafo para a cidade.

---

## Observações

- Todos os endpoints (exceto login/register) exigem autenticação por sessão.
- Endpoints de escrita exigem usuário admin.
- Em caso de erro, a resposta será `{ "erro": "mensagem" }` e status HTTP apropriado.
