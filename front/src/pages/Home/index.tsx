import React from 'react'

import Button from '../../components/Button'

import { ButtonContainer } from './style'

const Home = () => {
  return (
    <ButtonContainer>
      <Button width="full" mainColor="primary" styleType="solid">Editar dados cadastrais</Button>
      <Button width="full" mainColor="secondary" styleType="solid">Sair</Button>
    </ButtonContainer>
  )
}

export default Home
