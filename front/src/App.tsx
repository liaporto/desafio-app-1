import React, {useState} from 'react';
import Login from './pages/Login';


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const postLoginData = (data:{}) => {
    console.log(data);
  }

  return (
    <div className="main">
      <h1>Olá, {!isLogged ? "visitante" : ""}</h1>

      <h2>{!isLogged ? "Login" : "Cadastre-se"}</h2>
      {!isLogged ?
      (
        <Login submitData={postLoginData}/>
      ) :
      (
        <div>placeholder</div>
      )
      }
    </div>
  );
}

export default App;
