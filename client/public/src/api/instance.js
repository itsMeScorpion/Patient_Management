import axios from 'axios';
let instance;
// console.log('instance_token', localStorage.getItem('token'));

instance = axios.create({
  baseURL: 'http://localhost:5000',
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `${localStorage.getItem('token')}`;
//   return config;
// });

export default instance;
