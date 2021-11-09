import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";

import Login from '.';

describe("Login", () => {
  let mockPost:jest.Mock;

  beforeEach(()=> {
    mockPost = jest.fn();
  })

  describe("Render flow", () => {
    test("renders inputs", () => {
      render(<Login submitData={mockPost}/>);
      
      expect(
        screen.getByPlaceholderText("E-mail, CPF ou PIS")
      ).toBeInTheDocument();
      
      expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    });

    test("renders submit button", () => {
      render(<Login submitData={mockPost}/>);
      expect(screen.getByText("Entrar")).toBeInTheDocument();
    });
  });

  describe("Submit flow", () => {
    test("form is filled correctly", () => {
      render(<Login submitData={mockPost}/>);

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

      render(<Login submitData={mockPost} />);

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
      const mockPost = jest.fn();

      render(<Login submitData={mockPost}/>);

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
      render(<Login submitData={mockPost}/>);

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
      render(<Login submitData={mockPost}/>);

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