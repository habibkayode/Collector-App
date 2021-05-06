import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://api.scrapays.com',
  timeout: 50000,
  'Content-Type': 'application/x-www-form-urlencoded',
});

export const setClientToken = (token) => {
  http.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
