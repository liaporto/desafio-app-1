import React from 'react';
import { StyledButton } from './style';

interface ButtonProps {
  children: string | Array<JSX.Element> | JSX.Element,
  type?: "button" | "submit" | "reset",
  styleType?: string,
  mainColor?: string,
  width?:string,
  onClick?: () => any
}

const Button = ({children, width, type, mainColor, styleType, onClick}:ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      mainColor={mainColor}
      styleType={styleType}
      width={width}
    >
      {children}
    </StyledButton>
  )
}

export default Button