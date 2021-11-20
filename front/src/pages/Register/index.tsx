import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import NumberFormat from 'react-number-format';
import { registerUser } from '../../services/UserService';

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

const countryOptions = [
  { value: 'Brasil', label: 'Brasil' },
  { value: 'África do Sul', label: 'África do Sul' },
  { value: 'Albânia', label: 'Albânia' },
  { value: 'Alemanha', label: 'Alemanha' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antigua', label: 'Antigua' },
  { value: 'Arábia Saudita', label: 'Arábia Saudita' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armênia', label: 'Armênia' },
  { value: 'Aruba', label: 'Aruba' },
  { value: 'Austrália', label: 'Austrália' },
  { value: 'Áustria', label: 'Áustria' },
  { value: 'Azerbaijão', label: 'Azerbaijão' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrein', label: 'Bahrein' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Bélgica', label: 'Bélgica' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bermudas', label: 'Bermudas' },
  { value: 'Botsuana', label: 'Botsuana' },
  { value: 'Brunei', label: 'Brunei' },
  { value: 'Bulgária', label: 'Bulgária' },
  { value: 'Burkina Fasso', label: 'Burkina Fasso' },
  { value: 'Butão', label: 'Butão' },
  { value: 'Cabo Verde', label: 'Cabo Verde' },
  { value: 'Camarões', label: 'Camarões' },
  { value: 'Camboja', label: 'Camboja' },
  { value: 'Canadá', label: 'Canadá' },
  { value: 'Cazaquistão', label: 'Cazaquistão' },
  { value: 'Chade', label: 'Chade' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Cidade do Vaticano', label: 'Cidade do Vaticano' },
  { value: 'Colômbia', label: 'Colômbia' },
  { value: 'Congo', label: 'Congo' },
  { value: 'Coréia do Sul', label: 'Coréia do Sul' },
  { value: 'Costa do Marfim', label: 'Costa do Marfim' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Croácia', label: 'Croácia' },
  { value: 'Dinamarca', label: 'Dinamarca' },
  { value: 'Djibuti', label: 'Djibuti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'EUA', label: 'EUA' },
  { value: 'Egito', label: 'Egito' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Emirados Árabes', label: 'Emirados Árabes' },
  { value: 'Equador', label: 'Equador' },
  { value: 'Eritréia', label: 'Eritréia' },
  { value: 'Escócia', label: 'Escócia' },
  { value: 'Eslováquia', label: 'Eslováquia' },
  { value: 'Eslovênia', label: 'Eslovênia' },
  { value: 'Espanha', label: 'Espanha' },
  { value: 'Estônia', label: 'Estônia' },
  { value: 'Etiópia', label: 'Etiópia' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Filipinas', label: 'Filipinas' },
  { value: 'Finlândia', label: 'Finlândia' },
  { value: 'França', label: 'França' },
  { value: 'Gabão', label: 'Gabão' },
  { value: 'Gâmbia', label: 'Gâmbia' },
  { value: 'Gana', label: 'Gana' },
  { value: 'Geórgia', label: 'Geórgia' },
  { value: 'Gibraltar', label: 'Gibraltar' },
  { value: 'Granada', label: 'Granada' },
  { value: 'Grécia', label: 'Grécia' },
  { value: 'Guadalupe', label: 'Guadalupe' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guiana', label: 'Guiana' },
  { value: 'Guiana Francesa', label: 'Guiana Francesa' },
  { value: 'Guiné-bissau', label: 'Guiné-bissau' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Holanda', label: 'Holanda' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Hungria', label: 'Hungria' },
  { value: 'Iêmen', label: 'Iêmen' },
  { value: 'Ilhas Cayman', label: 'Ilhas Cayman' },
  { value: 'Ilhas Cook', label: 'Ilhas Cook' },
  { value: 'Ilhas Curaçao', label: 'Ilhas Curaçao' },
  { value: 'Ilhas Marshall', label: 'Ilhas Marshall' },
  { value: 'Ilhas Turks & Caicos', label: 'Ilhas Turks & Caicos' },
  { value: 'Ilhas Virgens (brit.)', label: 'Ilhas Virgens (brit.)' },
  { value: 'Ilhas Virgens(amer.)', label: 'Ilhas Virgens(amer.)' },
  { value: 'Ilhas Wallis e Futuna', label: 'Ilhas Wallis e Futuna' },
  { value: 'Índia', label: 'Índia' },
  { value: 'Indonésia', label: 'Indonésia' },
  { value: 'Inglaterra', label: 'Inglaterra' },
  { value: 'Irlanda', label: 'Irlanda' },
  { value: 'Islândia', label: 'Islândia' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Itália', label: 'Itália' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japão', label: 'Japão' },
  { value: 'Jordânia', label: 'Jordânia' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Líbano', label: 'Líbano' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lituânia', label: 'Lituânia' },
  { value: 'Luxemburgo', label: 'Luxemburgo' },
  { value: 'Macau', label: 'Macau' },
  { value: 'Macedônia', label: 'Macedônia' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malásia', label: 'Malásia' },
  { value: 'Malaui', label: 'Malaui' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marrocos', label: 'Marrocos' },
  { value: 'Martinica', label: 'Martinica' },
  { value: 'Mauritânia', label: 'Mauritânia' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'México', label: 'México' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Mônaco', label: 'Mônaco' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Nicarágua', label: 'Nicarágua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigéria', label: 'Nigéria' },
  { value: 'Noruega', label: 'Noruega' },
  { value: 'Nova Caledônia', label: 'Nova Caledônia' },
  { value: 'Nova Zelândia', label: 'Nova Zelândia' },
  { value: 'Omã', label: 'Omã' },
  { value: 'Palau', label: 'Palau' },
  { value: 'Panamá', label: 'Panamá' },
  { value: 'Papua-nova Guiné', label: 'Papua-nova Guiné' },
  { value: 'Paquistão', label: 'Paquistão' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Polinésia Francesa', label: 'Polinésia Francesa' },
  { value: 'Polônia', label: 'Polônia' },
  { value: 'Porto Rico', label: 'Porto Rico' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Quênia', label: 'Quênia' },
  { value: 'Rep. Dominicana', label: 'Rep. Dominicana' },
  { value: 'Rep. Tcheca', label: 'Rep. Tcheca' },
  { value: 'Reunion', label: 'Reunion' },
  { value: 'Romênia', label: 'Romênia' },
  { value: 'Ruanda', label: 'Ruanda' },
  { value: 'Rússia', label: 'Rússia' },
  { value: 'Saipan', label: 'Saipan' },
  { value: 'Samoa Americana', label: 'Samoa Americana' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serra Leone', label: 'Serra Leone' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Singapura', label: 'Singapura' },
  { value: 'Síria', label: 'Síria' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'St. Kitts & Nevis', label: 'St. Kitts & Nevis' },
  { value: 'St. Lúcia', label: 'St. Lúcia' },
  { value: 'St. Vincent', label: 'St. Vincent' },
  { value: 'Sudão', label: 'Sudão' },
  { value: 'Suécia', label: 'Suécia' },
  { value: 'Suiça', label: 'Suiça' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Tailândia', label: 'Tailândia' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'Tanzânia', label: 'Tanzânia' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Trinidad & Tobago', label: 'Trinidad & Tobago' },
  { value: 'Tunísia', label: 'Tunísia' },
  { value: 'Turquia', label: 'Turquia' },
  { value: 'Ucrânia', label: 'Ucrânia' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Uruguai', label: 'Uruguai' },
  { value: 'Venezuela', label: 'Venezuela' },
  { value: 'Vietnã', label: 'Vietnã' },
  { value: 'Zaire', label: 'Zaire' },
  { value: 'Zâmbia', label: 'Zâmbia' },
  { value: 'Zimbábue', label: 'Zimbábue' },
];

const brazilianStatesOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

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
            <TextInput
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="22222-222"
              defaultValue=""
              register={register('postalCode', {
                required: 'CEP não pode ficar vazio',
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message: 'CEP inválido',
                },
              })}
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
        <Button type="submit" styleType="solid" mainColor="primary">
          Concluir cadastro
        </Button>
      </StyledRegisterForm>
    </main>
  );
}

export default Register;
