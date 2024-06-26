import axios from 'axios';

const api = axios.create({
    baseURL: "https://expert-umbrella-5wj44gvrx663vvpp-8080.app.github.dev/",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

export default api;
