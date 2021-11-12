import React, {useState, useContext} from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import EditData from './pages/EditData';
import Home from './pages/Home';

import {AuthContext} from './contexts/auth';

import {Route, Routes, Navigate} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const Auth = useContext(AuthContext);

  const [isLogged, setIsLogged] = useState(false);
  
  const postEditData = (data:{}) => {
    console.log(data);
  }

  const getUserData = async (userId:string) => {
    return Promise.resolve({
      cpf: "222.222.222-22",
      pis: "222.2222.222-2",
      name: "Teste",
      email: "teste@email.com",
      password: "pass1",
      country: "Brasil",
      state: "RJ",
      city: "Rio das Ostras",
      postalCode: "22222-222",
      street: "Rua do Limoeiro",
      number: "22",
      additionalInfo: "Ap. 202"
    })
  }

  return (
    <div className="main">
      <h1>Olá, {!isLogged ? "visitante" : ""}</h1>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
        <Route path="/update" element={
          <PrivateRoute>
            <EditData submitData={postEditData} getUserData={getUserData}/>
          </PrivateRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
