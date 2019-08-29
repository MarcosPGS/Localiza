import axios from 'axios';
import {Platform} from 'react-native';

export const fetchTest = () => {
  return Platform.OS === 'android'
    ? axios.get('http://127.0.0.1:8080/professor')
    : axios.get('http://localhost:8080/professor');
};
