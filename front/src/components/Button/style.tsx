import styled from 'styled-components';

interface CustomButton {
  mainColor?: string,
  styleType?: string,
  width?:string;
}

export const StyledButton = styled.button<CustomButton>`
  cursor: pointer;

  height: 50px;
  width: ${props => (props.width === "full" || !props.width) ? "100%" : (props.width === "half") ? "48%" : "5em"};

  color: ${props => (props.styleType === "solid" ? "#fff" : `var(--${props.mainColor})` )};
  font-size: 1em;
  font-family: 'Rubik', Arial, Helvetica, sans-serif;
  font-weight: 500;

  background-color: ${props => (props.styleType === "solid" ? `var(--${props.mainColor})` : "transparent" )};
  box-shadow: 0px 3px 10px rgba(132, 132, 132, 0.1);
  border: ${props => (props.styleType === "solid" ? "none" : `1.5px solid var(--${props.mainColor})`)};
  border-radius: 10px;
`;
