import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
console.log('🔌 API Base URL:', baseURL || 'UNDEFINED (This is the issue if on Vercel!)');

const api = axios.create({
    baseURL,
});

export default api;
