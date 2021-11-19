import styled from 'styled-components';

const StyledInput = styled.input`
  height: 50px;
  width: 100%;
  margin-bottom: 0.5em;

  padding-left: 1em;

  border: none;
  border-radius: 0.5em;

  box-shadow: 0px 3px 10px rgba(132, 132, 132, 0.1);

  &:disabled,
  &:read-only {
    background-color: var(--light-gray);
    color: var(--dark-gray);
  }

  @media (max-width: 530px) {
    &::placeholder {
      font-size: 1.3em;
    }
  }

  @media (max-width: 960px) {
    &::placeholder {
      font-size: 1.2em;
    }
  }
`;

export default StyledInput;
