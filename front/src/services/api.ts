import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/api`,
});

api.defaults.withCredentials = true;

api.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // default;
};

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
