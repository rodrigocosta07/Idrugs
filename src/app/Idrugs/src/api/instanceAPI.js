const axios = require('axios').default;

const instanceApi = axios.create({
    baseURL: 'https://protected-chamber-86891.herokuapp.com',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' }
});

export default instanceApi