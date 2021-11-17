import React, {useState, useContext, useEffect} from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import EditData from './pages/EditData';
import Home from './pages/Home';

import BackButton from './components/BackButton';

import { getUserDetails } from './services/UserService';
import {AuthContext} from './contexts/auth';

import {Route, Routes, useLocation} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const Auth = useContext(AuthContext);

  const location = useLocation();

  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  const getUserName = async (token:string) => {
    return getUserDetails(token).then(res => {
      return res.user.name;
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    const token = Auth.getToken();
    if (token){
      setIsLogged(true); 
      getUserName(token).then(name => {
        setUserName(name);
      })
    } else {
      setIsLogged(false);
    }
  }, [Auth]);

  return (
    <div className="wrapper">
      <header>
        <div className="backButtonContainer">
          {location.pathname !== "/" && <BackButton/>}
        </div>
        <h1>Olá, {!isLogged ? "visitante" : userName}</h1>
      </header>

      <Routes>
        <Route path="/home" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/update" element={
          <PrivateRoute>
            <EditData setUserName={setUserName}/>
          </PrivateRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
