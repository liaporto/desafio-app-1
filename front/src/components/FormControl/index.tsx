import React from 'react';

import { StyledFormControl, StyledLabel } from './style';

interface FormControlProps {
  children: any | undefined;
  inputLabel?: string;
  htmlFor?: string;
  controlWidth?: string;
}

function FormControl({
  children,
  inputLabel,
  htmlFor,
  controlWidth,
}: FormControlProps) {
  return (
    <StyledFormControl width={controlWidth}>
      {inputLabel && <StyledLabel htmlFor={htmlFor}>{inputLabel}</StyledLabel>}
      {children}
    </StyledFormControl>
  );
}

export default FormControl;
