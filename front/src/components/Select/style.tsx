import styled from 'styled-components';

export const StyledSelect = styled.select`
  height: 50px;
  width: 100%;
  margin-bottom: .5em;
  padding: 0 1em;

  border: none;
  border-radius: .5em;

  box-shadow: 0px 3px 10px rgba(132, 132, 132, 0.1);

  background-color: var(--white);

  //TODO: Estilizar caret
  /* &::after {
    content: '';
    position: absolute;
    top: 25%;
    left: 12px;
    border-top: 12px solid #999;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
  } */
`;
