import styled from 'styled-components';

interface FormControl {
  width?: string
}

export const StyledFormControl = styled.div<FormControl>`
  width: ${props => props.width === "half" ? '48%' : '100%'};
  margin-bottom: 2em;
  
  @media(max-width: 540px){
    width: 100%;
  }
`;

export const StyledLabel = styled.label`
  display: inline-block;
  width: 100%;
  margin-bottom: .2em;

  font-size: .9em;
  font-weight: 500;
  text-align: left;
`
