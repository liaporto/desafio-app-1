import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './globalStyle';
import App from './App';
import reportWebVitals from './reportWebVitals';

import AuthProvider from './contexts/auth';

import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
