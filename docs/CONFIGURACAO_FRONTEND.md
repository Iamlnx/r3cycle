# Configuração do Frontend R3Cycle

## Pré-requisitos

- Node.js 16+
- npm

## Instalação

```bash
cd client
npm install
```

## Configuração de ambiente

Crie um arquivo `.env` se necessário. O endpoint da API já está configurado em `src/services/api.js` para produção:

```js
baseURL: 'https://r3cycle.onrender.com'
```
Para desenvolvimento local, altere para:
```js
baseURL: 'http://localhost:5000'
```

## Execução

```bash
npm start
```
Acesse em [http://localhost:5173](http://localhost:5173) (ou a porta que o Vite/React indicar).

## Build para produção

```bash
npm run build
```

---

## Outras dicas

- O projeto utiliza o [TailwindCSS](https://tailwindcss.com/) para estilização.
- As imagens e logos ficam em `src/assets/`.

