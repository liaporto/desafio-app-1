import React from 'react'

import {StyledFieldset, StyledLegend} from './style';

interface FieldsetProps {
  legend: string;
  children: any;
}

const Fieldset = ({legend, children}:FieldsetProps) => {
  return (
    <StyledFieldset>
      <StyledLegend>{legend}</StyledLegend>
      {children}
    </StyledFieldset>
  )
}

export default Fieldset
