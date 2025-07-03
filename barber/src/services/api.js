import axios from 'axios';

const api = axios.create({
  baseURL: 'https://json-barbearia.onrender.com', 
});

export default api;
