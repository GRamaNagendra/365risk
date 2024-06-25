// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'https://special-lamp-6jqrr9v555vc5p79-8081.app.github.dev/api',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     withCredentials: true
// });

// export default api;



import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust this URL based on your backend setup
});

export default api;
