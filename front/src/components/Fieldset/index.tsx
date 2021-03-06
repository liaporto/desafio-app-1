import React from 'react';

import { StyledFieldset, StyledLegend } from './style';

interface FieldsetProps {
  legend?: string;
  children: any;
}

function Fieldset({ legend, children }: FieldsetProps) {
  return (
    <StyledFieldset>
      {legend && <StyledLegend>{legend}</StyledLegend>}
      {children}
    </StyledFieldset>
  );
}

export default Fieldset;
