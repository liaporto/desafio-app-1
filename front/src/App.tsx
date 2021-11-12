import React, {useState} from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import EditData from './pages/EditData';
import Home from './pages/Home';

import {Route, Routes} from 'react-router-dom';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const postLoginData = (data:{}) => {
    console.log(data);
  }

  const postRegisterData = (data:{}) => {
    console.log(data);
  }

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
        <Route path="/" element={<Login submitData={postLoginData}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/update" element={<EditData submitData={postEditData} getUserData={getUserData}/>}/>
      </Routes>
    </div>
  );
}

export default App;
