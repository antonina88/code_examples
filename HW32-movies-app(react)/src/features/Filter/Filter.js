import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import styles from './filter.module.scss';
import { searchByName, sortByLikes, sortByRating } from './filterActions';

const cx = classNames.bind(styles);

const mapDispatchToProps = (dispatch) => ({
  searchByName: (name) => dispatch(searchByName(name)),
  sortByLikes: () => dispatch(sortByLikes()),
  sortByRating: () => dispatch(sortByRating()),
});

export class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: 'Сортировать',
      onHover: false,
    };
  }

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onHoverBtn = (event) => {
    this.setState({
      onHover: true,
    });
  }

  onLeave = (event) => {
    this.setState({
      onHover: false,
    });
  }

  render() {
    const { sortByLikes, sortByRating, searchByName, translations } = this.props;

    const className = cx({
      'btn btn-primary': true,
      onHover: this.state.onHover,
    });

    return (
      <div className={styles.wrapper}>
        <div>
          <Button
            className={styles.search_btn}
            onClick={sortByLikes}
          >
            {translations && translations.sortByLikes}
          </Button>
          <Button
            className={styles.search_btn}
            onClick={sortByRating}
          >
            {translations && translations.sortByRating}
          </Button>
        </div>
        <div className={styles.search}>
          <Input
            className='form-control'
            onChange={this.onChange}
          />
          <button
            className={className}
            onClick={searchByName.bind(null, this.state.inputValue)}
            onMouseEnter={this.onHoverBtn}
            onMouseLeave={this.onLeave}
          >
            {translations && translations.search}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter);

Filter.propTypes = {
  searchByName: PropTypes.func,
  sortByLikes: PropTypes.func,
  sortByRating: PropTypes.func,
  translations: PropTypes.objectOf(PropTypes.string),
};
