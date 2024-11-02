import axios from 'axios';

export default axios.create({
    baseURL: 'https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com',
    timeout: 5000,
});