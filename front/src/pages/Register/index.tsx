import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import NumberFormat from 'react-number-format';
import { registerUser } from '../../services/UserService';

import {
  countryOptions,
  brazilianStatesOptions,
} from '../../utils/selectOptions';

import Fieldset from '../../components/Fieldset';
import FormControl from '../../components/FormControl';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import Button from '../../components/Button';

import StyledRegisterForm from './style';

interface FormData {
  cpf: string;
  pis: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  number: string;
  additionalInfo?: string;
}

function Register() {
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['isSigned']);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const watchCountry = watch('country', 'Brasil');
  const watchPassword = watch('password');

  const onSubmit = (data: FormData) => {
    const { confirmPassword: string, ...registerData } = data; // Cria um objeto registerData sem a propriedade confirmPassword
    registerUser(registerData)
      .then((responseData: any) => {
        if (responseData) {
          setCookie('isSigned', 'true', {
            path: '/',
          });
          window.alert('Cadastro feito com sucesso!');
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert('Ocorreu um erro. Por favor tente novamente.');
      });
  };

  return (
    <main>
      <h2>Cadastre-se</h2>
      <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
        <Fieldset legend="Dados pessoais">
          <FormControl inputLabel="CPF*" htmlFor="cpf" controlWidth="half">
            <Controller
              control={control}
              name="cpf"
              defaultValue=""
              render={({ field: { value, onChange } }: any) => (
                <NumberFormat
                  format="###.###.###-##"
                  mask="_"
                  value={value}
                  onChange={onChange}
                  customInput={TextInput}
                  id="cpf"
                  type="text"
                  placeholder="111.111.111-11"
                />
              )}
              rules={{
                required: 'CPF não pode ficar vazio',
                pattern: {
                  value: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/i,
                  message: 'CPF inválido',
                },
              }}
            />
            {errors.cpf && <span>{errors.cpf.message}</span>}
          </FormControl>
          <FormControl inputLabel="PIS*" htmlFor="pis" controlWidth="half">
            <Controller
              control={control}
              name="pis"
              defaultValue=""
              render={({ field: { value, onChange } }: any) => (
                <NumberFormat
                  format="###.####.###-#"
                  mask="_"
                  value={value}
                  onChange={onChange}
                  customInput={TextInput}
                  id="pis"
                  type="text"
                  placeholder="111.1111.111-1"
                />
              )}
              rules={{
                required: 'PIS não pode ficar vazio',
                pattern: {
                  value: /^\d{3}\.?\d{4}\.?\d{3}-?\d{1}$/i,
                  message: 'PIS inválido',
                },
              }}
            />
            {errors.pis && <span>{errors.pis.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Primeiro nome*"
            htmlFor="name"
            controlWidth="half"
          >
            <TextInput
              id="name"
              type="text"
              placeholder="Fulano"
              register={register('name', {
                required: 'Nome não pode ficar vazio',
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </FormControl>
          <FormControl inputLabel="Email*" htmlFor="email" controlWidth="half">
            <TextInput
              id="email"
              type="email"
              placeholder="fulano@email.com"
              register={register('email', {
                required: 'Email não pode ficar vazio',
                pattern: {
                  value: /[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+/i,
                  message: 'Email inválido',
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Senha*"
            htmlFor="password"
            controlWidth="half"
          >
            <TextInput
              id="password"
              type="password"
              placeholder="Insira uma senha"
              register={register('password', {
                required: 'A senha não pode ficar vazia',
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Confirmar senha*"
            htmlFor="confirmPassword"
            controlWidth="half"
          >
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              register={register('confirmPassword', {
                required: 'A confirmação de senha não pode ficar vazia',
                validate: (value) => {
                  if (value !== watchPassword) {
                    return 'As senhas não estão iguais';
                  }
                  return true;
                },
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </FormControl>
        </Fieldset>
        <hr />
        <Fieldset legend="Endereço">
          <FormControl inputLabel="País*" htmlFor="country" controlWidth="half">
            <Select
              id="country"
              selectOptions={countryOptions}
              register={register('country', {
                required: 'País não pode ficar vazio',
              })}
            />
            {errors.country && <span>{errors.country.message}</span>}
          </FormControl>
          <FormControl inputLabel="Estado*" htmlFor="state" controlWidth="half">
            {watchCountry === 'Brasil' ? (
              <Select
                id="state"
                testId="stateSelectInput"
                selectOptions={brazilianStatesOptions}
                register={register('state', {
                  required: 'Estado não pode ficar vazio',
                })}
              />
            ) : (
              <TextInput
                id="state"
                data-testid="stateTextInput"
                name="state"
                type="text"
                placeholder=""
                defaultValue=""
                register={register('state', {
                  required: 'Estado não pode ficar vazio',
                })}
              />
            )}
            {errors.state && <span>{errors.state.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Município*"
            htmlFor="city"
            controlWidth="half"
          >
            <TextInput
              id="city"
              name="city"
              type="text"
              placeholder="Rio de Janeiro"
              defaultValue=""
              register={register('city', {
                required: 'Município não pode ficar vazio',
              })}
            />
            {errors.city && <span>{errors.city.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="CEP*"
            htmlFor="postalCode"
            controlWidth="half"
          >
            <Controller
              control={control}
              name="postalCode"
              defaultValue=""
              render={({ field: { value, onChange } }: any) => (
                <NumberFormat
                  format="#####-###"
                  mask="_"
                  value={value}
                  onChange={onChange}
                  customInput={TextInput}
                  id="postalCode"
                  placeholder="22222-222"
                />
              )}
              rules={{
                required: 'CEP não pode ficar vazio',
                pattern: {
                  value: /^\d{5}-?\d{3}$/i,
                  message: 'CEP inválido',
                },
              }}
            />
            {errors.postalCode && <span>{errors.postalCode.message}</span>}
          </FormControl>
          <FormControl inputLabel="Rua*" htmlFor="street" controlWidth="full">
            <TextInput
              id="street"
              name="street"
              type="text"
              placeholder=""
              defaultValue=""
              register={register('street', {
                required: 'Rua não pode ficar vazia',
              })}
            />
            {errors.street && <span>{errors.street.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Número*"
            htmlFor="number"
            controlWidth="half"
          >
            <TextInput
              id="number"
              name="number"
              type="text"
              placeholder="22"
              defaultValue=""
              register={register('number', {
                required: 'Número não pode ficar vazio',
              })}
            />
            {errors.number && <span>{errors.number.message}</span>}
          </FormControl>
          <FormControl
            inputLabel="Complemento (opcional)"
            htmlFor="additionalInfo"
            controlWidth="half"
          >
            <TextInput
              id="additionalInfo"
              name="additionalInfo"
              type="text"
              placeholder=""
              defaultValue=""
              register={register('additionalInfo')}
            />
            {errors.additionalInfo && (
              <span>{errors.additionalInfo.message}</span>
            )}
          </FormControl>
        </Fieldset>
        <Button
          width="full"
          type="submit"
          styleType="solid"
          mainColor="primary"
        >
          Concluir cadastro
        </Button>
      </StyledRegisterForm>
    </main>
  );
}

export default Register;
