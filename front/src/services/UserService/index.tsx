import api from '../api';

const registerUser = async (data:{}) => {
  console.log(data);
  api.post('/register', data).then((response) => {
    console.log(response);
    const token = response.data.token;
    window.alert("Cadastro feito com sucesso!");
    return token;
  }, (err => console.log(err)));
}

export {registerUser};