# Desafio Aplicação 1 - Cadastro usuário WEB

## Como executar

### Executando o app em modo de desenvolvimento

1. Entrar na pasta "front" com `cd front`

2. Executar `yarn install` para instalar todas as dependências<sup>1</sup>

3. Executar `yarn start` para servir o app em modo de desenvolvimento

4. Abrir o projeto no endereço [https://localhost:3000](https://localhost:3000)

5. Entrar na pasta "back" com `cd back`

6. Executar `yarn install` para instalar todas as dependências<sup>1</sup>

7. Executar `yarn config-dev` para migrar o banco de dados e configurar chaves RSA<sup>2</sup>

8. Executar `yarn serve` para rodar o back-end

<sup>1</sup> Feito apenas na primeira vez em que o aplicativo for ser executado.

<sup>2</sup> Feito apenas na primeira vez em que o aplicativo for ser executado ou após alterações na model User.

### Executando a versão em produção do app

1. Entrar na pasta "back" com `cd back`

2. Executar `yarn build`

3. Executar `yarn serve`

4. Abrir o projeto no endereço [https://localhost:3333](https://localhost:3333)

## Testes

1 - Entrar na pasta "front" com `cd front`

2 - Executar `yarn test`