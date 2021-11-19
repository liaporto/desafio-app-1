import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';

import StyledArrowIcon from './style';

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Button
      type="button"
      styleType="outline"
      mainColor="primary"
      width="third"
      ariaLabel="Voltar"
      onClick={handleClick}
    >
      <StyledArrowIcon />
    </Button>
  );
}

export default BackButton;
