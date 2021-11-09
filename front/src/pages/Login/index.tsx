import React from 'react';
import { useForm } from "react-hook-form";

import {StyledLoginForm} from './style';

import FormControl from '../../components/FormControl';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

type FormData = {
  loginId: string,
  password: string,
}

interface FormProps {
  submitData?:Function
}

const Login = ({submitData}:FormProps) => {
  const { register, handleSubmit, formState:{errors} } = useForm<FormData>({mode:"onChange"});

  const onSubmit = (data:FormData) => {
    console.log(data);
    if(submitData) submitData(data);
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <TextInput
          id="loginId"
          aria-label="Login: E-mail, CPF ou PIS"
          type="text"
          placeholder="E-mail, CPF ou PIS"
          defaultValue = ''
          register = {register("loginId", {
            required: "Login não pode estar vazio",
            pattern: {
              value: /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+|\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{3}\.?\d{4}\.?\d{3}-?\d{1}/i,
              message: "Login inválido"}
          })}
          />
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
      <Button styleType="solid" mainColor="primary" type="submit">Entrar</Button>
    </StyledLoginForm>
  )
}

export default Login
