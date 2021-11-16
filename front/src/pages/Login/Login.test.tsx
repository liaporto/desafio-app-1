import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

import Login from '.';

import * as userService from "../../services/UserService";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalRouterDom = jest.requireActual('react-router-dom');
  return {
      __esModule: true,
      ...originalRouterDom,
      useNavigate: () => mockedNavigate
  };
});

const mockLoginUser = jest.spyOn(userService, "loginUser");

describe("Login", () => {
  beforeEach(()=> {
    render(<Login/>);
  })

  describe("Render flow", () => {
    test("renders login type radio inputs",() => {
      const selectEmailLoginType = screen.getByLabelText("Email");
      const selectCPFLoginType = screen.getByLabelText("CPF");
      const selectPISLoginType = screen.getByLabelText("PIS");

      expect(selectEmailLoginType).toBeInTheDocument();
      expect(selectCPFLoginType).toBeInTheDocument();
      expect(selectPISLoginType).toBeInTheDocument();
    })

    test("renders login inputs", () => {
      
      expect(
        screen.getByTestId("email_input")
      ).toBeInTheDocument();
      
      expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    });

    test("renders submit button", () => {
      expect(screen.getByText("Entrar")).toBeInTheDocument();
    });
  });

  describe("Submit flow", () => {
    test("form is filled correctly with email", () => {

      const loginInput = screen.getByTestId("email_input") as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText("Senha") as HTMLInputElement;

      fireEvent.input(loginInput, {
        target: {
          value: "email@exemplo.com",
        },
      });

      expect(loginInput.value).toBe("email@exemplo.com");

      fireEvent.input(passwordInput, {
        target: {
          value: "pass1",
        },
      });

      expect(passwordInput.value).toBe("pass1");
    });

    test("form submits correctly", async () => {

      const selectEmailLoginType = screen.getByLabelText("Email");
      const loginInput = screen.getByTestId("email_input");
      const passwordInput = screen.getByPlaceholderText("Senha");

      await act(async () => {
        fireEvent.click(selectEmailLoginType);

        fireEvent.change(loginInput, {
          target: {
            value: "email@exemplo.com",
          },
        });

        fireEvent.change(passwordInput, {
          target: {
            value: "pass1",
          },
        });

        fireEvent.click(screen.getByText("Entrar"));
      });

      expect(mockLoginUser).toHaveBeenCalled();
    });

    test("form shows error if login is empty", async () => {

      const loginInput = screen.getByTestId("email_input") as HTMLInputElement;

      await act(() => {
        fireEvent.change(loginInput, { target: { value: "a" } });
        fireEvent.change(loginInput, { target: { value: "" } });
        fireEvent.blur(loginInput);
      });

      expect(
        screen.getByText("Login não pode ficar vazio")
      ).toBeInTheDocument();
    });

    test("form shows error if passoword is empty", async () => {

      const passwordInput = screen.getByPlaceholderText("Senha") as HTMLInputElement;

      await act(() => {
        fireEvent.change(passwordInput, { target: { value: "a" } });
        fireEvent.change(passwordInput, { target: { value: "" } });
        fireEvent.blur(passwordInput);
      });

      expect(
        screen.getByText("A senha não pode estar vazia")
      ).toBeInTheDocument();
    });

    test("form shows error if login is in wrong pattern", async () => {

      const selectEmailLoginType = screen.getByLabelText("Email");
      const selectCPFLoginType = screen.getByLabelText("CPF");
      const selectPISLoginType = screen.getByLabelText("PIS");

      const emailInput = screen.getByTestId("email_input");
      let cpfInput:HTMLInputElement;
      let pisInput:HTMLInputElement;

      const passwordInput = screen.getByPlaceholderText("Senha");

      await act(() => {
        fireEvent.input(emailInput, {
          target: {
            value: "algo que não é email",
          },
        });
        fireEvent.blur(emailInput);
      });
      
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
      
      fireEvent.click(selectCPFLoginType);

      await waitFor(() => {
        cpfInput = screen.getByTestId("cpf_input");
      });

      fireEvent.input(cpfInput, {
        target: {
          value: "3333",
        },
      });

      fireEvent.blur(cpfInput);

      await waitFor(() => expect(screen.getByText("CPF inválido")).toBeInTheDocument());

      fireEvent.click(selectPISLoginType);

      await waitFor(() => {
        pisInput = screen.getByTestId("pis_input");
      })

      fireEvent.input(pisInput, {
        target: {
          value: "333",
        },
      });

      fireEvent.blur(pisInput);

      await waitFor(() => expect(screen.getByText("PIS inválido")).toBeInTheDocument());
    });
  });
});