import styled from 'styled-components';

const ButtonContainer = styled.div`
  width: 50%;
  height: 8em;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 530px) {
    width: 70%;
  }
`;

export default ButtonContainer;
