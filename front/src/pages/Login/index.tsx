import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import NumberFormat from 'react-number-format';
import { loginUser } from '../../services/UserService';

import { StyledLoginForm, Container, RadioInputRow } from './style';

import FormControl from '../../components/FormControl';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import Fieldset from '../../components/Fieldset';

interface LoginData {
  loginId: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['isSigned']);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({ mode: 'onChange' });

  const [selectedLoginType, setSelectedLoginType] = useState('email');

  const loginInputTypes = [
    {
      label: 'email',
      element: (
        <TextInput
          data-testid="email_input"
          id="loginId"
          type="text"
          aria-label="E-mail"
          placeholder="email@exemplo.com"
          defaultValue=""
          register={register('loginId', {
            required: 'Login não pode ficar vazio',
            pattern: {
              value: /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+/i,
              message: 'Email inválido',
            },
          })}
        />
      ),
    },
    {
      label: 'cpf',
      element: (
        <Controller
          control={control}
          name="loginId"
          defaultValue=""
          render={({ field: { value, onChange } }: any) => (
            <NumberFormat
              format="###.###.###-##"
              mask="_"
              value={value}
              onChange={onChange}
              customInput={TextInput}
              data-testid="cpf_input"
              id="loginId"
              type="text"
              aria-label="CPF"
              placeholder="111.111.111-11"
            />
          )}
          rules={{
            required: 'Login não pode ficar vazio',
            pattern: {
              value: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/i,
              message: 'CPF inválido',
            },
          }}
        />
      ),
    },
    {
      label: 'pis',
      element: (
        <Controller
          control={control}
          name="loginId"
          defaultValue=""
          render={({ field: { value, onChange } }: any) => (
            <NumberFormat
              format="###.####.###-#"
              mask="_"
              value={value}
              onChange={onChange}
              customInput={TextInput}
              data-testid="pis_input"
              id="loginId"
              type="text"
              aria-label="PIS"
              placeholder="111.1111.111-1"
            />
          )}
          rules={{
            required: 'Login não pode ficar vazio',
            pattern: {
              value: /^\d{3}\.?\d{4}\.?\d{3}-?\d{1}$/i,
              message: 'PIS inválido',
            },
          }}
        />
      ),
    },
  ];

  const redirectIfLoggedIn = () => {
    if (cookies.isSigned === 'true') {
      navigate('/home');
    }
  };

  const handleLoginTypeChange = (e: any) => {
    const { value } = e.target;
    setSelectedLoginType(value);
  };

  const onSubmit = (data: LoginData) => {
    loginUser(data)
      .then(() => {
        setCookie('isSigned', 'true', {
          path: '/',
        });
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        window.alert(`Login inválido: ${err.message}`);
      });
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  useEffect(() => {
    redirectIfLoggedIn();
  }, []);

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
                  checked={selectedLoginType === 'email'}
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
                  checked={selectedLoginType === 'cpf'}
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
                  checked={selectedLoginType === 'pis'}
                />
                <label htmlFor="loginType--PIS">PIS</label>
              </FormControl>
            </RadioInputRow>
          </Fieldset>
          <Fieldset>
            <FormControl>
              {
                loginInputTypes.find(
                  (loginType) => loginType.label === selectedLoginType
                )?.element // Renderiza o input do tipo de Login selecionado
              }
              {errors.loginId && <span>{errors.loginId.message}</span>}
            </FormControl>
            <FormControl>
              <TextInput
                id="password"
                type="password"
                aria-label="Senha"
                placeholder="Senha"
                defaultValue=""
                register={register('password', {
                  required: 'A senha não pode estar vazia',
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </FormControl>
          </Fieldset>
          <Button
            width="full"
            styleType="solid"
            mainColor="primary"
            type="submit"
          >
            Entrar
          </Button>
        </StyledLoginForm>
        <Button
          width="full"
          styleType="outline"
          mainColor="primary"
          onClick={handleGoToRegister}
        >
          Ainda não tenho cadastro
        </Button>
      </Container>
    </main>
  );
}

export default Login;
