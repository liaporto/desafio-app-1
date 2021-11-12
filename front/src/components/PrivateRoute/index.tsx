import React, {useContext} from 'react'
import { Navigate, Route } from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children}:PrivateRouteProps) => {
  const { signed } = useContext(AuthContext);

  return signed
    ? children
    : <Navigate to="/login" />;
  
  // return <Route path={path} element={finalElement} />;
}

export default PrivateRoute;
