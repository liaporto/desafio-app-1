import React from 'react';
import { Navigate } from 'react-router-dom';

import {useCookies} from 'react-cookie';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({children}:PrivateRouteProps) => {
  const [cookies, setCookies] = useCookies();

  return cookies.isSigned === "true"
    ? children
    : <Navigate to="/" />;
}

export default PrivateRoute;
