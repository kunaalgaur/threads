import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://threads-taupe-rho.vercel.app/',
    baseURL: 'http://localhost:3000',
});

export default instance;
