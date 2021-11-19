import React from 'react';

import StyledSelect from './style';

interface SelectProps {
  id: string;
  testId?: string;
  selectOptions: Array<{ value: string; label: string }>;
  register: {};
}

function Select({ id, testId, selectOptions, register }: SelectProps) {
  return (
    <StyledSelect id={id} data-testid={testId || ''} {...register}>
      {selectOptions.map((item) => (
        <option key={`option_${item.label}`} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
