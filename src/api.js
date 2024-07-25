import axios from 'axios';

const api = axios.create({
    // baseURL: "https://symmetrical-carnival-wwp99rv5vvq2g5jr-8080.app.github.dev/",
// baseURL:"http://localhost:8080",
baseURL:"https://fantastic-halibut-6jqrr9v54q7f4jww-8080.app.github.dev/",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

export default api;
