import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  const { onChange, className } = props;

  return (
    <input
      className={className}
      onChange={onChange}
    />
  );
};

export default Input;


Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

