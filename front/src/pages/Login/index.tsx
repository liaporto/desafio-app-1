import React from 'react';
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          id="loginId"
          aria-label="Login: E-mail, CPF ou PIS"
          type="text"
          placeholder="E-mail, CPF ou PIS"
          defaultValue = ''
          {...register("loginId", {
            required: "Login não pode estar vazio",
            pattern: {
              value: /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+|\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{3}\.?\d{4}\.?\d{3}-?\d{1}/i,
              message: "Login inválido"}
          })}
          />
        {errors.loginId && <span>{errors.loginId.message}</span>}
      </div>
      <div>
        <input
          id="password"
          type="password"
          aria-label="Senha"
          placeholder="Senha"
          defaultValue = ''
          {...register("password", {
            required: "A senha não pode estar vazia"
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Entrar</button>
    </form>
  )
}

export default Login
