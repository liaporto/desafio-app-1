import React from 'react';

import { StyledInput } from './style';

const TextInput = (props:any) => {
  return (
    <StyledInput {...props} {...props.register}/>
  )
}

export default TextInput
