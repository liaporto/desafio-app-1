import React from 'react'

import {StyledFormControl} from './style'

interface FormControlProps {
  children?: any | undefined
  controlWidth?: string
}

const FormControl = ({children, controlWidth}:FormControlProps) => {
  return (
    <StyledFormControl width={controlWidth}>
      {children}
    </StyledFormControl>
  )
}

export default FormControl
