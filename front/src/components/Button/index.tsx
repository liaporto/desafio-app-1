import React from 'react';
import { StyledButton } from './style';

interface ButtonProps {
  children: string,
  type?: "button" | "submit" | "reset",
  styleType?: string,
  mainColor?: string,
  onClick?: () => any
}

const Button = ({children, type, mainColor, styleType, onClick}:ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      mainColor={mainColor}
      styleType={styleType}
    >
      {children}
    </StyledButton>
  )
}

export default Button