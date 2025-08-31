import axios from 'axios';

const getBaseUrl = (): string => {
  return 'http://localhost:3000/';
};

export const api = axios.create({
  baseURL: getBaseUrl(),
});
