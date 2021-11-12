import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from "@testing-library/react";

import userEvent from '@testing-library/user-event';

import Register from ".";

import { registerUser } from "../../services/UserService";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalRouterDom = jest.requireActual('react-router-dom');
  return {
      __esModule: true,
      ...originalRouterDom,
      useNavigate: () => mockedNavigate
  };
});

jest.mock("../../services/UserService");

const mockRegisterUser = (registerUser as jest.Mock).mockResolvedValue({
  cpf: "111.111.111-11",
  pis: "111.1111.111-1",
  name: "Fulano",
  email: "email@exemplo.com",
  hash: "fakehash",
  salt: "fakesalt",
  country: "Brasil",
  state: "RJ",
  city: "Rio das Ostras",
  postalCode: "22222-222",
  street: "Rua do Limoeiro",
  number: "22",
  additionalInfo: "Ap. 202",
});

const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => true);

describe("Register form", () => {

  beforeEach(()=> {
    render(<Register/>);
  })

  describe("render flow", () => {
    test("renders personal data inputs", () => {
      expect(
        screen.getByRole("textbox", {name: /cpf/i})
      ).toBeInTheDocument();
      
      expect(
        screen.getByRole("textbox", {name: /pis/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /primeiro nome/i})
      ).toBeInTheDocument();

      expect(
        screen.getByRole("textbox", {name: /email/i})
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(/^Senha/i)
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(/Confirmar senha/i)
      ).toBeInTheDocument();
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
      expect(screen.getByText("Concluir cadastro")).toBeInTheDocument();
    });
  });

  describe("submit flow", () => {
    test("personal data is filled correctly", () => {

      const cpfInput = screen.getByRole("textbox", {name: /CPF/i}) as HTMLInputElement;
      const pisInput = screen.getByRole("textbox", {name: /PIS/i}) as HTMLInputElement;
      const nameInput = screen.getByRole("textbox", {name: /Nome/i}) as HTMLInputElement;
      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/^Senha/i) as HTMLInputElement;
      const confirmPasswordInput = screen.getByLabelText(/Confirmar senha/i) as HTMLInputElement;

      fireEvent.input(cpfInput, {
        target: {
          value: "111.111.111-11",
        },
      });

      expect(cpfInput.value).toBe("111.111.111-11");

      fireEvent.input(pisInput, {
        target: {
          value: "111.1111.111-1",
        },
      });

      expect(pisInput.value).toBe("111.1111.111-1");

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

    test("form shows error if requires values are left empty", async () => {
      await act(async () => {
        fireEvent.click(screen.getByText("Concluir cadastro"));
      });

      expect(screen.getByText("CPF não pode ficar vazio")).toBeInTheDocument();
      expect(screen.getByText("PIS não pode ficar vazio")).toBeInTheDocument();
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

      const cpfInput = screen.getByRole("textbox", {name: /CPF/i}) as HTMLInputElement;
      const pisInput = screen.getByRole("textbox", {name: /PIS/i}) as HTMLInputElement;
      const emailInput = screen.getByRole("textbox", {name: /Email/i}) as HTMLInputElement;
      const postalCodeInput = screen.getByLabelText(/cep/i) as HTMLInputElement;

      await act(() => {
        fireEvent.input(cpfInput, {
          target: {
            value: "111",
          },
        });
  
        fireEvent.input(pisInput, {
          target: {
            value: "111",
          },
        });
  
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

      expect(screen.getByText("CPF inválido")).toBeInTheDocument();

      expect(screen.getByText("PIS inválido")).toBeInTheDocument();

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
    })
    
    test("data is submitted correctly", async () => {

      const cpfInput = screen.getByRole("textbox", {name: /CPF/i}) as HTMLInputElement;
      const pisInput = screen.getByRole("textbox", {name: /PIS/i}) as HTMLInputElement;
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

      const submitButton = screen.getByText("Concluir cadastro");

      fireEvent.input(cpfInput, {
        target: {
          value: "111.111.111-11",
        },
      });

      fireEvent.input(pisInput, {
        target: {
          value: "111.1111.111-1",
        },
      });

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
          value: "pass1",
        },
      });

      fireEvent.input(confirmPasswordInput, {
        target: {
          value: "pass1",
        },
      });

      userEvent.selectOptions(countryInput, 'Brasil');

      userEvent.selectOptions(stateInput, 'Rio de Janeiro');

      fireEvent.input(cityInput, {
        target: {
          value: "Rio das Ostras",
        },
      });

      fireEvent.input(postalCodeInput, {
        target: {
          value: "22222-222",
        },
      });

      fireEvent.input(streetInput, {
        target: {
          value: "Rua do Limoeiro",
        },
      });

      fireEvent.input(numberInput, {
        target: {
          value: "22",
        },
      });

      fireEvent.input(additionalInfoInput, {
        target: {
          value: "Ap. 202",
        },
      });

      fireEvent.click(submitButton);
      

      await waitFor(() => {
        expect(mockRegisterUser).toReturnWith({
          cpf: "111.111.111-11",
          pis: "111.1111.111-1",
          name: "Fulano",
          email: "email@exemplo.com",
          hash: "fakehash",
          salt: "fakesalt",
          country: "Brasil",
          state: "RJ",
          city: "Rio das Ostras",
          postalCode: "22222-222",
          street: "Rua do Limoeiro",
          number: "22",
          additionalInfo: "Ap. 202",
        });
        expect(mockAlert).toBeCalledWith("Cadastro feito com sucesso!");
      });
    });
  });
});