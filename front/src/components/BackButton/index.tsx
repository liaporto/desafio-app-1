import React, {useContext} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

import Button from '../Button';

import { AuthContext } from '../../contexts/auth';

import {FiArrowLeft} from 'react-icons/fi';
import { StyledArrowIcon } from './style';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const Auth = useContext(AuthContext);

  const handleClick = () => {
    if(location.pathname === "/home"){
      localStorage.removeItem("token");
      Auth.setToken("");
    }
    navigate(-1);
  }
  return (
    <Button
      type="button"
      styleType="outline"
      mainColor="primary"
      width="third"
      ariaLabel="Voltar"
      onClick={handleClick}
    >
      <StyledArrowIcon/>
    </Button>
  )
}

export default BackButton
