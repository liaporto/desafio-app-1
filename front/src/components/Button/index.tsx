import React from 'react';
import StyledButton from './style';

interface ButtonProps {
  children: string | Array<JSX.Element> | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'solid' | 'outline';
  mainColor?: 'primary' | 'secondary';
  width?: string;
  ariaLabel?: string;
  onClick?: () => any;
}

function Button({
  children,
  width,
  type,
  mainColor,
  styleType,
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      mainColor={mainColor}
      styleType={styleType}
      width={width}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
