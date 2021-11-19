import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;
  margin: auto auto 4em;

  @media (max-width: 530px) {
    width: 85%;
  }
`;

export const StyledLoginForm = styled.form`
  width: 100%;
  margin: 0 auto 3em;
  display: flex;
  flex-direction: column;
`;

export const RadioInputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
