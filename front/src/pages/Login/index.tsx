import React, {useState, useEffect, useContext} from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {loginUser} from "../../services/UserService";
import {AuthContext} from '../../contexts/auth';

import InputMask from "react-input-mask";

import {StyledLoginForm, Container, RadioInputRow} from './style';

import FormControl from '../../components/FormControl';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import Fieldset from '../../components/Fieldset';

interface LoginData {
  loginId: string,
  password: string,
}

const Login = () => {
  
  let navigate = useNavigate();

  const Auth = useContext(AuthContext);
  
  const { register, handleSubmit, control, formState:{errors} } = useForm<LoginData>({mode:"onChange"});

  const [selectedLoginType, setSelectedLoginType] = useState("email");


  const redirectIfLoggedIn = () => {
    const token = Auth.getToken();
    if(token !== ""){
      navigate("/home");
    }
  }

  const handleLoginTypeChange = (e:any) => {
    const {value} = e.target;
    setSelectedLoginType(value);
  }

  const onSubmit = (data:LoginData) => {
    loginUser(data).then(() => {
      Auth.setToken(Auth.getToken());
      navigate("/home");
    }).catch(err => {
      console.log(err);
      alert("Login inválido.");
    });
  }

  const handleGoToRegister = () => {
    navigate("/register");
  }

  useEffect(() => {
    redirectIfLoggedIn();
  }, [Auth, redirectIfLoggedIn])

  return (
    <main>
      <h2>Login</h2>
      <Container>
        <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
          <Fieldset legend="Escolha o tipo de login:">
            <RadioInputRow>
              <FormControl>
                <input
                  type="radio"
                  name="loginType"
                  id="loginType--email"
                  value="email"
                  onChange={handleLoginTypeChange}
                  checked={selectedLoginType === "email"}
                />
                <label htmlFor="loginType--email">Email</label>
              </FormControl>

              <FormControl>
                <input
                  type="radio"
                  name="loginType"
                  id="loginType--CPF"
                  value="cpf"
                  onChange={handleLoginTypeChange}
                  checked={selectedLoginType === "cpf"}
                />
                <label htmlFor="loginType--CPF">CPF</label>
              </FormControl>

              <FormControl>
                <input
                  type="radio"
                  name="loginType"
                  id="loginType--PIS"
                  value="pis" 
                  onChange={handleLoginTypeChange}
                  checked={selectedLoginType === "pis"}
                />
                <label htmlFor="loginType--PIS">PIS</label>
              </FormControl>
            </RadioInputRow>
          </Fieldset>
          <Fieldset>
            <FormControl>
              {selectedLoginType === "email" ?
              (
                <TextInput
                  data-testid="email_input"
                  id="loginId"
                  type="text"
                  aria-label="E-mail"
                  placeholder="email@exemplo.com"
                  defaultValue = ''
                  register = {register("loginId", {
                    required: "Login não pode ficar vazio",
                    pattern: {
                      value: /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+/i,
                      message: "Email inválido"}
                  })}
                />
              )
              :
              selectedLoginType === "cpf" ?
              ( 
                <Controller
                  control={control}
                  name="loginId"
                  defaultValue=''
                  render = {({field: {value, onChange, ref}}:any) => {
                    return (
                      <InputMask
                        mask="999.999.999-99"
                        value={value}
                        onChange = {onChange}>
                        {() => <TextInput
                                  data-testid="cpf_input"
                                  id="loginId"
                                  type="text"
                                  aria-label="CPF"
                                  inputRef={ref}
                                  placeholder="111.111.111-11"
                                />}
                      </InputMask>
                    )
                  }}
                  rules = {{
                    required: "Login não pode ficar vazio",
                    pattern: {
                      value: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/i,
                      message: "CPF inválido"}
                  }}
                />
              )
              :
              (
                <Controller
                  control={control}
                  name="loginId"
                  defaultValue=''
                  render = {({field: {value, onChange, ref}}:any) => {
                    return (
                      <InputMask
                        mask="999.9999.999-9"
                        value={value}
                        onChange = {onChange}>
                        {() => <TextInput
                                data-testid="pis_input"
                                id="loginId"
                                type="text"
                                aria-label="PIS"
                                inputRef={ref}
                                placeholder="111.1111.111-1"
                              />}
                      </InputMask>
                    )
                  }}
                  rules = {{
                    required: "Login não pode ficar vazio",
                    pattern: {
                      value: /^\d{3}\.?\d{4}\.?\d{3}-?\d{1}$/i,
                      message: "PIS inválido"}
                  }}
                />
              )
              }
              {errors.loginId && <span>{errors.loginId.message}</span>}
            </FormControl>
            <FormControl>
              <TextInput
                id="password"
                type="password"
                aria-label="Senha"
                placeholder="Senha"
                defaultValue = ''
                register = {register("password", {
                  required: "A senha não pode estar vazia"
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </FormControl>
          </Fieldset>
          <Button styleType="solid" mainColor="primary" type="submit">Entrar</Button>
        </StyledLoginForm>
        <Button styleType="outline" mainColor="primary" onClick={handleGoToRegister}>Ainda não tenho cadastro</Button>
      </Container>
    </main>
  )
}

export default Login
