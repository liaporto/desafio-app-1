import React, {createContext, useEffect, useState} from 'react';

interface Data{
  token: string;
  setToken: any;
  signed: boolean;
  getToken: any;
}

export const AuthContext = createContext<Data>({} as Data);

const AuthProvider = (props:any) => {
  const [authorization, setAuthorization] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getToken = () => {
    let token = '';
    const value = localStorage.getItem('token');
    if(value !== null) {
      token = 'Bearer '.concat(value);
    } else {
      console.log("Sem token.");
    }
    return token;
  };
  
  useEffect(()=> {
    const token = getToken();
    setAuthorization(token);
  }, [])
  
  useEffect(()=>{
    if(authorization !== ""){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authorization]);

  return (
    <AuthContext.Provider value={{token: authorization, setToken: setAuthorization, signed: isLoggedIn, getToken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;