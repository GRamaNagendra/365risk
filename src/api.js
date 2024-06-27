import axios from 'axios';

const api = axios.create({
    baseURL: "https://symmetrical-carnival-wwp99rv5vvq2g5jr-8080.app.github.dev/",
    
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

export default api;
