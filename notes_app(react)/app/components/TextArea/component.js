import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ className, value, onChange }) => {
  return (
    <textarea
      className={className}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextArea;

TextArea.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
