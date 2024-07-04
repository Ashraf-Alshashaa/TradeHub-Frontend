import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000"
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;
    const localStorageUser = localStorage.getItem("user");
    const user = localStorageUser ? JSON.parse(localStorageUser) : null;
    if(user){
      token = user.access_token
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;