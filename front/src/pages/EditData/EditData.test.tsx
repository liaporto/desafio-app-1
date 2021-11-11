import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from "@testing-library/react";

import userEvent from '@testing-library/user-event';

import EditData from ".";

describe("Edit data form", () => {
  const mockPost:jest.Mock = jest.fn();

  const mockConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => true);
  
  const mockGetData:jest.Mock = jest.fn(async (userId:string) => {
    return {
      cpf: "222.222.222-22",
      pis: "222.2222.222-2",
      name: "Teste",
      email: "teste@email.com",
      password: "pass1",
      country: "Brasil",
      state: "RJ",
      city: "Rio das Ostras",
      postalCode: "22222-222",
      street: "Rua do Limoeiro",
      number: "22",
      additionalInfo: "Ap. 202"
    }
  });
  
  beforeEach(async ()=> {
    render(<EditData submitData={mockPost} getUserData={mockGetData}/>);
    await waitFor(() => expect(mockGetData).toReturn());
  });

  afterAll(() => mockConfirm.mockRestore());
  
  describe("render flow", () => {
    test("async getData function is called and returns data", async () => {
      let data;
      await waitFor(async () => {data = await mockGetData("1")});
      expect(data).toBe({
        cpf: "222.222.222-22",
        pis: "222.2222.222-2",
        name: "Teste",
        email: "teste@email.com",
        password: "pass1",
        country: "Brasil",
        state: "RJ",
        city: "Rio das Ostras",
        postalCode: "22222-222",
        street: "Rua do Limoeiro",
        number: "22",
        additionalInfo: "Ap. 202"
      });
    });
    
    
    //TODO: Resolver esse teste
    test("renders personal data inputs with data", async () => {

      await waitFor(() => {
        expect(mockGetData).toBeCalled();
      });
      
      const cpfInput = screen.getByRole("textbox", {name: /cpf/i}) as HTMLInputElement;
      const pisInput = screen.getByRole("textbox", {name: /pis/i}) as HTMLInputElement;
      const nameInput = screen.getByRole("textbox", {name: /Nome/i}) as HTMLInputElement;
      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/^Senha/i) as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i) as HTMLInputElement;
      
      //Não tá vindo com valor
      expect(cpfInput.value).toBe("222.222.222-22");
      expect(pisInput.value).toBe("222.2222.222-2");
      expect(cpfInput).toBeInTheDocument();
      expect(nameInput.value).toBe("Teste");
      expect(emailInput.value).toBe("teste@email.com");
      expect(passwordInput.value).toBe("pass1");
      expect(confirmPasswordInput.value).toBe("pass1");

    });

    test("renders address inputs", () => {
      expect(
        screen.getByLabelText(/país/i)
      ).toBeInTheDocument();
      
      expect(
        screen.getByLabelText(/estado/i)
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /município/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /cep/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /rua/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /número/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /complemento/i})
      ).toBeInTheDocument();
    });

    test("renders submit button", () => {
      expect(screen.getByText("Salvar edições")).toBeInTheDocument();
    });
  });

  describe("submit flow", () => {
    test("personal data is filled correctly", () => {
      const nameInput = screen.getByRole("textbox", {name: /Nome/i}) as HTMLInputElement;
      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/^Senha/i) as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText(/Confirmar senha/i) as HTMLInputElement;

      fireEvent.input(nameInput, {
        target: {
          value: "Fulano",
        },
      });

      expect(nameInput.value).toBe("Fulano");

      fireEvent.input(emailInput, {
        target: {
          value: "email@exemplo.com",
        },
      });

      expect(emailInput.value).toBe("email@exemplo.com");

      fireEvent.input(passwordInput, {
        target: {
          value: "pass1",
        },
      });

      expect(passwordInput.value).toBe("pass1");

      fireEvent.input(confirmPasswordInput, {
        target: {
          value: "pass1",
        },
      });

      expect(confirmPasswordInput.value).toBe("pass1");
    });

    test("address data is filled correctly", async () => {
      const countryInput = screen.getByLabelText(/país/i) as HTMLInputElement;
      const stateInput = screen.getByLabelText(/estado/i) as HTMLInputElement;
      const cityInput = screen.getByLabelText(/município/i) as HTMLInputElement;
      const postalCodeInput = screen.getByLabelText(/cep/i) as HTMLInputElement;
      const streetInput = screen.getByLabelText(/rua/i) as HTMLInputElement;
      const numberInput = screen.getByLabelText(/número/i) as HTMLInputElement;
      const additionalInfoInput = screen.getByLabelText(/complemento/i) as HTMLInputElement;

      userEvent.selectOptions(countryInput, 'Brasil');

      expect(countryInput.value).toBe("Brasil");

      userEvent.selectOptions(stateInput, 'RJ');
      
      expect(stateInput.value).toBe("RJ");

      fireEvent.input(cityInput, {
        target: {
          value: "Rio das Ostras",
        },
      });

      expect(cityInput.value).toBe("Rio das Ostras");

      fireEvent.input(postalCodeInput, {
        target: {
          value: "22222-222",
        },
      });

      expect(postalCodeInput.value).toBe("22222-222");

      fireEvent.input(streetInput, {
        target: {
          value: "Rua do Limoeiro",
        },
      });

      expect(streetInput.value).toBe("Rua do Limoeiro");

      fireEvent.input(numberInput, {
        target: {
          value: "22",
        },
      });

      expect(numberInput.value).toBe("22");

      fireEvent.input(additionalInfoInput, {
        target: {
          value: "Ap. 202",
        },
      });

      expect(additionalInfoInput.value).toBe("Ap. 202");
    });

    test("state input changes from 'select' to text input if country is not Brazil", async () => {
      const countryInput = screen.getByLabelText(/país/i) as HTMLInputElement;

      await act(() => {
        userEvent.selectOptions(countryInput, 'Brasil');
        fireEvent.blur(countryInput);
      });

      expect(screen.getByTestId("stateSelectInput")).toBeInTheDocument();

      await act(() => {
        userEvent.selectOptions(countryInput, 'Argentina');
        fireEvent.blur(countryInput);
      });

      expect(screen.getByTestId("stateTextInput")).toBeInTheDocument();
    })

    test("form shows error if required values are left empty", async () => {
      await act(async () => {
        fireEvent.click(screen.getByText("Salvar edições"));
      });
      
      expect(screen.getByText("Nome não pode ficar vazio")).toBeInTheDocument();
      expect(screen.getByText("Email não pode ficar vazio")).toBeInTheDocument();
      expect(screen.getByText("A senha não pode ficar vazia")).toBeInTheDocument();
      expect(screen.getByText("A confirmação de senha não pode ficar vazia")).toBeInTheDocument();
      expect(screen.getByText("Município não pode ficar vazio")).toBeInTheDocument();
      expect(screen.getByText("CEP não pode ficar vazio")).toBeInTheDocument();
      expect(screen.getByText("Rua não pode ficar vazia")).toBeInTheDocument();
      expect(screen.getByText("Número não pode ficar vazio")).toBeInTheDocument();
    });

    test("form shows error if values are in wrong format", async () => {

      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const postalCodeInput = screen.getByLabelText(/cep/i) as HTMLInputElement;

      await act(() => {
        fireEvent.input(emailInput, {
          target: {
            value: "ab",
          },
        });
  
        fireEvent.input(postalCodeInput, {
          target: {
            value: "111",
          },
        });
      });

      expect(screen.getByText("Email inválido")).toBeInTheDocument();

      expect(screen.getByText("CEP inválido")).toBeInTheDocument();
    });

    test("form shows error if confirmPassword is not the same as password", async () => {

      const passwordInput = screen.getByLabelText(/^Senha/i) as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText(/Confirmar senha/i) as HTMLInputElement;

      await act(async () => {
        fireEvent.input(passwordInput, {
          target: {
            value: "pass1",
          },
        });
  
        fireEvent.input(confirmPasswordInput, {
          target: {
            value: "pass2",
          },
        });
      })

      expect(screen.getByText("As senhas não estão iguais")).toBeInTheDocument();
    });

    //TODO: Escrever teste que garanta que os campos CPF e PIS estão desabilitados

    //TODO: Escrever teste para o botão de apagar perfil
    
    test("data is updated correctly", async () => {

      const nameInput = screen.getByRole("textbox", {name: /Nome/i}) as HTMLInputElement;
      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/^Senha/i) as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i) as HTMLInputElement;
      const countryInput = screen.getByLabelText(/país/i) as HTMLInputElement;
      const stateInput = screen.getByLabelText(/estado/i) as HTMLInputElement;
      const cityInput = screen.getByLabelText(/município/i) as HTMLInputElement;
      const postalCodeInput = screen.getByLabelText(/cep/i) as HTMLInputElement;
      const streetInput = screen.getByLabelText(/rua/i) as HTMLInputElement;
      const numberInput = screen.getByLabelText(/número/i) as HTMLInputElement;
      const additionalInfoInput = screen.getByLabelText(/complemento/i) as HTMLInputElement;

      const submitButton = screen.getByText("Salvar edições");

      fireEvent.input(nameInput, {
        target: {
          value: "Fulano",
        },
      });

      fireEvent.input(emailInput, {
        target: {
          value: "email@exemplo.com",
        },
      });

      fireEvent.input(passwordInput, {
        target: {
          value: "pass2",
        },
      });

      fireEvent.input(confirmPasswordInput, {
        target: {
          value: "pass2",
        },
      });

      userEvent.selectOptions(countryInput, 'Brasil');

      userEvent.selectOptions(stateInput, 'Alagoas');

      fireEvent.input(cityInput, {
        target: {
          value: "Rio de Janeiro",
        },
      });

      fireEvent.input(postalCodeInput, {
        target: {
          value: "11111-111",
        },
      });

      fireEvent.input(streetInput, {
        target: {
          value: "Rua da Laranjeira",
        },
      });

      fireEvent.input(numberInput, {
        target: {
          value: "11",
        },
      });

      fireEvent.input(additionalInfoInput, {
        target: {
          value: "Ap. 101",
        },
      });

      fireEvent.click(submitButton);

      await waitFor(() => expect(mockPost).toBeCalledWith({
        cpf: "222.222.222-22",
        pis: "222.2222.222-2",
        name: 'Fulano',
        email: 'email@exemplo.com',
        password: 'pass2',
        confirmPassword: 'pass2',
        country: 'Brasil',
        state: 'AL',
        city: 'Rio de Janeiro',
        postalCode: '11111-111',
        street: 'Rua da Laranjeira',
        number: '11',
        additionalInfo: 'Ap. 101'
      }));
    });
  });

  describe("delete user flow", () => {
    test("opens 'confirm' pop-up when user clicks on 'Apagar perfil'", () => {
      const deleteUserButton = screen.getByRole("button", {name: "Apagar perfil"});

      fireEvent.click(deleteUserButton);

      expect(mockConfirm).toBeCalledWith("Tem certeza que deseja apagar o perfil?");
    });
  });
});