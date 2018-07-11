import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, children, onClick }) => {
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
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};
