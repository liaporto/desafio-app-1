import React from 'react';

import {StyledSelect} from './style';

interface SelectProps{
  id: string;
  testId?: string;
  selectOptions: Array<{value:string, label:string}>;
  register: {};
}

const Select = ({id, testId, selectOptions, register}:SelectProps) => {
  return (
    <StyledSelect id={id} data-testid={testId ? testId : ""} {...register}>
      {selectOptions.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
    </StyledSelect>
  )
}

export default Select
