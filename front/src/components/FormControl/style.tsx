import styled from 'styled-components';

interface FormControl {
  width?: string
}

export const StyledFormControl = styled.div<FormControl>`
  width: ${props => props.width === "half" ? '48%' : '100%'};
  margin-bottom: 2em;
`;
