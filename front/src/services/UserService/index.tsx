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

const getUserDetails = async (token:string) => {
  return api.get('/private/getDetails', {headers: {'Authorization': `${token}`}}).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

const updateUser = async (id:number, data:{}) => {
  return api.put(`/update/${id}`, data).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

export {registerUser, loginUser, getUserDetails, updateUser};