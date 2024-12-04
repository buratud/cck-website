import axios from 'axios';

export default axios.create({
    baseURL: 'https://ai-vpn.southeastasia.cloudapp.azure.com',
    timeout: 5000,
});