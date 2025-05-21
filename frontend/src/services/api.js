import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000", // <-- isso aqui tem que estar correto
});

export default api;
