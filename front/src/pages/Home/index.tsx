import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

import {checkIfUserIsLogged, logoutUser} from "../../services/UserService";
import { useCookies } from "react-cookie";

import Button from '../../components/Button'

import { ButtonContainer } from './style'

const Home = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(["isSigned"]);

  let navigate = useNavigate();
  
  const handleLogOut = () => {
    logoutUser().then(() => {
      removeCookie("isSigned");
      navigate("/");
    }).catch(err => {
      console.log(err);
      window.alert("Erro ao deslogar usuário");
    })
  }

  const handleGoToEditData = () => {
    navigate("/update");
  }

  useEffect(() => {
    checkIfUserIsLogged().then(() => {
      console.log("Is logged!");
    }).catch(err => {
      console.log(err);
      removeCookie("isSigned");
      window.alert("Algo deu errado. Por favor faça login novamente.");
      navigate("/");
    });
  }, []);

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
