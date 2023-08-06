
import axios from 'axios';
import { API_KEY, API_URL } from './constant';

export default axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'content-type': 'application/json',
      'X-API-KEY': API_KEY,
    },
});