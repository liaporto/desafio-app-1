import React from 'react';

import StyledInput from './style';

function TextInput({ register, ...props }: any) {
  return <StyledInput {...props} {...register} />;
}

export default TextInput;
