import React, {useState, useEffect} from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import EditData from './pages/EditData';
import Home from './pages/Home';

import BackButton from './components/BackButton';

import { useCookies } from "react-cookie";
import { getUserDetails } from './services/UserService';

import {Route, Routes, useLocation} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  const [cookies, setCookies] = useCookies();

  const location = useLocation();

  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    return getUserDetails().then(res => {
      return res.user.name;
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if(cookies.isSigned === "true"){
      getUserName().then(name => {
        if(name !== userName){
          setUserName(name);
        }
      })
    }
  }, [cookies.isSigned, getUserName]);

  return (
    <div className="wrapper">
      <header>
        <div className="backButtonContainer">
          {(location.pathname !== "/" && location.pathname !== "/home") && <BackButton/>}
        </div>
        <h1>Olá, {!cookies.isSigned ? "visitante" : userName}</h1>
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
