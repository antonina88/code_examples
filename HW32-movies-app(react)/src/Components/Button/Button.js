import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  const { onClick, children, className } = props;

  return (
    <button
      className={className}
      onClick={onClick}
      type='text'
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,
  className: PropTypes.string,
};
