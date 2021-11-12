import api from '../api';

const registerUser = async (data:{}) => {
  return api.post('/register', data).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

const findUser = async (userId:string) => {
  return api.get(`/users/${userId}`).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

export {registerUser};