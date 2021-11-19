import api from '../api';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const registerUser = async (data: {}) =>
  api
    .post('/register', data)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    });

const loginUser = async (data: {}) =>
  api
    .post('/login', data, config)
    .then((response) => response)
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    });

const checkIfUserIsLogged = async () =>
  api.get('/private/auth', config).then(
    (response) => response,
    (err) => {
      if (err.response) {
        throw new Error(err.response.data);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  );

const getUserDetails = async () =>
  api.get('/private/getDetails').then(
    (response) => response.data,
    (err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  );

const updateUser = async (data: {}) =>
  api.put('/private/update', data).then(
    (response) => response.data,
    (err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  );

const deleteUser = async () =>
  api.delete('/private/remove').then(
    (response) => response,
    (err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  );

const logoutUser = async () =>
  api.get('/logout').then(
    (response) => response.status,
    (err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else if (err.request) {
        throw new Error(err.request);
      } else {
        throw new Error(err.message);
      }
    }
  );

export {
  registerUser,
  loginUser,
  checkIfUserIsLogged,
  getUserDetails,
  updateUser,
  deleteUser,
  logoutUser,
};
