import axios from 'axios';

const api = axios.create({
  baseURL: 'https://r3cycle.onrender.com',
});

export default api;

