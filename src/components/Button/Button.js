import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => (
  <ButtonStyled onClick={() => onClick(pS => pS + 1)}>{children}</ButtonStyled>
);

Button.propTypes = { onClick: PropTypes.func.isRequired };
