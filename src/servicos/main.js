import axios from 'axios';
import { Platform } from 'react-native';

export const fetchTest = () => {
  return Platform.OS === 'android'
    ? axios.get('http://127.0.0.1:8080/professor')
    : axios.get('http://localhost:8080/professor');
};

export const putAnotacao = (objectProfessor) => {
  return Platform.OS === 'android'
    ? axios.put('http://127.0.0.1:8080/professor', objectProfessor)
    : axios.put('http://localhost:8080/professor', objectProfessor);
}