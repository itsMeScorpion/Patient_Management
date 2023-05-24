import axios from 'axios';
let instance;

instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem('accesstoken')}`;
  return config;
});

export default instance;
