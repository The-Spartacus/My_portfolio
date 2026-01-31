import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://my-portfolio-8tqt.onrender.com';
console.log('🔌 API Base URL:', baseURL);

const api = axios.create({
    baseURL,
});

export default api;
