import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children}:PrivateRouteProps) => {
  const Auth = useContext(AuthContext);
  const token = Auth.getToken();

  return token !== ""
    ? children
    : <Navigate to="/" />;
}

export default PrivateRoute;
