import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://threads-taupe-rho.vercel.app/',
});

export default instance;
