import React, {createContext, useEffect, useState} from 'react';

interface Data{
  token: string;
  setToken: any;
  signed: boolean;
}

export const AuthContext = createContext<Data>({} as Data);

const AuthProvider = (props:any) => {
  const [authorization, setAuthorization] = useState("");
  const [checkLogin, setCheckLogin] = useState(false);

  const getToken = async () => {
    let token = '';
    try {
        const value = localStorage.getItem('token');
        if(value !== null) {
            token = 'Bearer '.concat(value);
            return token;
        }
    } catch (e) {
        console.log("Sem token.")
    }
    return token;
  };

  const checkIsLoggedIn = () => {
    if(authorization !== ""){
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
  }

  useEffect(()=> {
    getToken().then(token => {
      setAuthorization(token);
    })
  }, [])

  useEffect(()=>{
    checkIsLoggedIn();
  }, [authorization, checkLogin])

  return (
    <AuthContext.Provider value={{token: authorization, setToken: setAuthorization, signed: checkLogin}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;