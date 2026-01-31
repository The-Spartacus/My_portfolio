import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('🔌 API Base URL:', baseURL);

const api = axios.create({
    baseURL,
});

export default api;
