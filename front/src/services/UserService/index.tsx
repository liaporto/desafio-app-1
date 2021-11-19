import api from '../api';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const registerUser = async (data:{}) => {
  return api.post('/register', data).then((response) => {
    return response.data;
  }, (err => console.log(err)));
}

const loginUser = async (data:{}) => {
  return api.post('/login', data, config).then((response) => {
    return response;
  }).catch((err) => {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error(err.request);
    } else {
      throw new Error(err.message);
    }
  });
}

const checkIfUserIsLogged = async () => {
  return api.get('/private/auth', config).then(response => {
    return response;
  }, (err => {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error(err.request);
    } else {
      throw new Error(err.message);
    }
  }));
}

const getUserDetails = async () => {
  return api.get('/private/getDetails').then((response) => {
    return response.data;
  }, (err => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  ));
}

const updateUser = async (data:{}) => {
  return api.put("/private/update", data).then((response) => {
    return response.data;
  }, (err => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  ));
}

const deleteUser = async () => {
  return api.delete('/private/remove').then(response => {
    return response;
  }, (err => {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error(err.request);
    } else {
      throw new Error(err.message);
    }
  }));
}

const logoutUser = async () => {
  return api.get('/logout').then(response => {
    return response.status;
  }, (err => {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error(err.request);
    } else {
      throw new Error(err.message);
    }
  }));
}

export {registerUser, loginUser, checkIfUserIsLogged, getUserDetails, updateUser, deleteUser, logoutUser};