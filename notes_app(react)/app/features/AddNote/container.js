import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

import { addNoteThunk } from '../shared/actions';

class AddNote extends Component {
  state = {
    title: '',
    description: '',
    message: '',
    open: false,
  };

  onChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  saveNote = () => {
    const { title, description } = this.state;
    const { addNoteThunk } = this.props;


    if (title === '' || description === '') {
      this.setState({
        message: 'Fields not filled',
        open: true,
      });

      return false;
    }

    addNoteThunk({ title, description });

    this.setState({
      title: '',
      description: '',
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { title, description, open, message } = this.state;
    const isPrimary = true;

    const actions = [
      <FlatButton
        label='Close'
        onClick={this.handleClose}
        primary={isPrimary}
      />,
    ];

    const alert = open? [
      <Dialog
        actions={actions}
        key='modal'
        modal={false}
        onRequestClose={this.handleClose}
        open={open}
      >
        {message}
      </Dialog>,
    ]: null;

    return (
      <div className='add-container'>
        {alert}
        <h3>Add note</h3>
        <Input
          className='title-filed'
          onChange={this.onChangeTitle}
          value={title}
        />
        <TextArea
          className='description-filed'
          onChange={this.onChangeDescription}
          value={description}
        />
        <Button
          className='btn-save'
          onClick={this.saveNote}
        >
          Save
        </Button>
      </div>
    );
  }
}

export default connect(null, { addNoteThunk })(AddNote);

AddNote.propTypes = {
  addNoteThunk: PropTypes.func,
};
