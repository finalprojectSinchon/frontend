import axios from 'axios';
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://192.168.0.209:8080',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // 요청 인터셉터 추가하여 토큰 포함
  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = ` ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;