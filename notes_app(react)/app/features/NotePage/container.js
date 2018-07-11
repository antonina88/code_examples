import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { EditIcon } from '../../components/Icons';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

import { editNoteThunk } from '../shared/actions';

class NotePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      title: props.note.title,
      description: props.note.description,
      message: '',
      open: false,
    };
  }

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

  toggleEditNote = () => {
    const { isEdited } = this.state;

    this.setState({
      isEdited: !isEdited,
    });
  }

  onCancel = () => {
    const { title, description } = this.props.note;

    this.setState({ title, description });

    this.toggleEditNote();
  }

  saveNote = () => {
    const { title, description } = this.state;
    const { note, editNoteThunk } = this.props;

    if (title === '' || description === '') {
      this.setState({
        message: 'Fields not filled',
        open: true,
      });

      return false;
    }

    const newData = { title, description };
    const editedNote = { ...note, ...newData };

    editNoteThunk(editedNote);

    this.toggleEditNote();
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { note } = this.props;
    const { isEdited, title, description, open, message } = this.state;
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

    if (isEdited) {
      return (
        <div className='edit-container'>
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

          <div className='actions-buttons'>
            <Button
              className='btn-save'
              onClick={this.saveNote}
            >
              Save
            </Button>

            <Button
              className='btn-cancel'
              onClick={this.onCancel}
            >
              Cancel
            </Button>
          </div>
          {alert}
        </div>
      );
    }

    return (
      <div className='note-detail'>
        <EditIcon
          id={note._id}
          onClick={this.toggleEditNote}
        />
        <h2 className='note-detail__title'>{note.title}</h2>
        <time>{new Date(note.date).toLocaleDateString()}</time>
        <p className='note-detail__description'>{note.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const { notes } = state.notes;
  const noteId = match.params.id;

  const note = notes.find(note => note._id === noteId);

  return { note };
};

export default connect(
  mapStateToProps,
  { editNoteThunk },
)(NotePage);

NotePage.propTypes = {
  editNoteThunk: PropTypes.func,
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }),
};
