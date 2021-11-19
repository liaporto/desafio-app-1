import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

api.defaults.withCredentials = true;

api.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300; // default;
};

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
});

export default api;