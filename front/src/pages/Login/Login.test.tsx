import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";

import Login from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalRouterDom = jest.requireActual('react-router-dom');
  return {
      __esModule: true,
      ...originalRouterDom,
      useNavigate: () => mockedNavigate
  };
});

describe("Login", () => {
  const mockPost:jest.Mock = jest.fn();

  beforeEach(()=> {
    render(<Login submitData={mockPost}/>);
  })

  describe("Render flow", () => {
    test("renders inputs", () => {
      
      expect(
        screen.getByPlaceholderText("E-mail, CPF ou PIS")
      ).toBeInTheDocument();
      
      expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    });

    test("renders submit button", () => {
      expect(screen.getByText("Entrar")).toBeInTheDocument();
    });
  });

  describe("Submit flow", () => {
    test("form is filled correctly", () => {

      const loginInput = screen.getByPlaceholderText("E-mail, CPF ou PIS") as HTMLInputElement;
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

      const loginInput = screen.getByPlaceholderText("E-mail, CPF ou PIS");
      const passwordInput = screen.getByPlaceholderText("Senha");

      await act(async () => {
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

      expect(mockPost).toHaveBeenCalled();
    });

    test("form shows error if login is empty", async () => {

      const loginInput = screen.getByPlaceholderText("E-mail, CPF ou PIS") as HTMLInputElement;

      await act(() => {
        fireEvent.change(loginInput, { target: { value: "a" } });
        fireEvent.change(loginInput, { target: { value: "" } });
        fireEvent.blur(loginInput);
      });

      expect(
        screen.getByText("Login não pode estar vazio")
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

      const loginInput = screen.getByPlaceholderText("E-mail, CPF ou PIS");
      const passwordInput = screen.getByPlaceholderText("Senha");

      await act(() => {
        fireEvent.input(loginInput, {
          target: {
            value: "algo que não é email, nem CPF, nem PIS",
          },
        });
        fireEvent.input(passwordInput, {
          target: {
            value: "pass1",
          },
        });
        fireEvent.blur(loginInput);
      });

      expect(screen.getByText("Login inválido")).toBeInTheDocument();
    });
  });
});