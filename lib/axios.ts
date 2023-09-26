import axios from 'axios';

const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://threads-taupe-rho.vercel.app/',
});

export default instance;
