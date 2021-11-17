import api from '../api';

const registerUser = async (data:{}) => {
  return api.post('/register', data).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

const loginUser = async (data:{}) => {
  return api.post('/login', data).then((response) => {
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  }, ((err) => console.log(err.message)));
}

const findUser = async (userId:string) => {
  return api.get(`/users/${userId}`).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

export {registerUser, loginUser};