import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguage } from './languageActions';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  language: state.language.language,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (value) => dispatch(changeLanguage(value)),
});

class Language extends Component {
  handleChangeLanguage = (event) => {
    this.props.changeLanguage(event.target.value);
  }

  render() {
    return (
      <select
        className='form-control col-1'
        defaultValue={this.props.language}
        onChange={this.handleChangeLanguage}
      >
        <option value='ru'>RU</option>
        <option value='en'>EN</option>
      </select>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);

Language.propTypes = {
  language: PropTypes.string,
  changeLanguage: PropTypes.func,
};
