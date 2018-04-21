import React from 'react';
import { connect } from 'react-redux';
import translations from './translations.json';

const mapStateToProps = (state) => {
  const language = state.language.language;

  return {
    translations: translations[language],
  };
};

function withTranslation(WrappedComponent) {
  return (
    connect(mapStateToProps)(WrappedComponent)
  );
}

export default withTranslation;
