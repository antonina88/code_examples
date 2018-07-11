import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ className, value, onChange }) => {
  return (
    <input
      className={className}
      onChange={onChange}
      type='text'
      value={value}
    />
  );
};

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};