import React from 'react'
import {useNavigate} from 'react-router-dom';

import Button from '../../components/Button'

import { ButtonContainer } from './style'

const Home = () => {
  let navigate = useNavigate();
  
  const handleLogOut = () => {
  navigate("/login");
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
