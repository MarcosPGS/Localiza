import axios from 'axios';

export const fetchTest = () => {
  axios.defaults.headers.get = {
    'Cache-Control': 'no-cache',
  };
  return axios.get('http://localhost:8080/curso');
};
