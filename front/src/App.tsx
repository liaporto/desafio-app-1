import React, {useState} from 'react';
import Button from './components/Button';
import Login from './pages/Login';
import Register from './pages/Register';
import EditData from './pages/EditData';

import { Icon } from '@iconify/react';


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const [currentScreen, setCurrentScreen] = useState("login");

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
      <EditData submitData={postEditData} getUserData={getUserData}/>
      {/* {!isLogged ?
      (
        currentScreen === "login" ? (
          <>
            <h2>Login</h2>
            <Login submitData={postLoginData}/>
            <Button mainColor="primary" styleType="outline" onClick={() => setCurrentScreen("register")}>Ainda não tenho cadastro</Button>
          </>
        )
        :
        (
          <>
            <div className="">
              <Button mainColor="primary" styleType="outline" onClick={() => setCurrentScreen("login")}>
                <Icon icon="akar-icons:arrow-left"/>
              </Button>
              <h2>Cadastre-se</h2>
            </div>
            <Register submitData={postRegisterData}/>
          </>
        )
      ) :
      (
        <div>placeholder</div>
      )
      } */}
    </div>
  );
}

export default App;
