import React, {useState} from 'react';
import Button from './components/Button';
import Login from './pages/Login';


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const [currentScreen, setCurrentScreen] = useState("login");

  const postLoginData = (data:{}) => {
    console.log(data);
  }

  return (
    <div className="main">
      <h1>Olá, {!isLogged ? "visitante" : ""}</h1>

      {!isLogged ?
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
            <h2>Cadastre-se</h2>
            <div>placeholder</div>
          </>
        )
      ) :
      (
        <div>placeholder</div>
      )
      }
    </div>
  );
}

export default App;
