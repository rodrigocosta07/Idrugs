const axios = require('axios').default;

const instanceApi = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
});

export default instanceApi