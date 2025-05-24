import axios from 'axios';

const api = axios.create({
  baseURL: 'https://r3cycle.onrender.com',
  withCredentials: true, // Para cookies de sessão!
});

export default api;
