import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import Button from '../../components/Button'

import { ButtonContainer } from './style'

const Home = () => {
  
  const Auth = useContext(AuthContext);

  let navigate = useNavigate();
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    Auth.setToken("");
    navigate("/");
  }

  const handleGoToEditData = () => {
    navigate("/update");
  }

  return (
    <main>
      <h2>Ações</h2>
      <ButtonContainer>
        <Button width="full" mainColor="primary" styleType="solid" onClick={handleGoToEditData}>Editar dados cadastrais</Button>
        <Button width="full" mainColor="secondary" styleType="solid" onClick={handleLogOut}>Sair</Button>
      </ButtonContainer>
    </main>
  )
}

export default Home
