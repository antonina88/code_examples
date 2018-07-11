import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NoteItem from './component';

import { getNotesThunk, deleteNoteThunk } from '../shared/actions';

class NotesList extends Component {
  componentDidMount() {
    const { getNotesThunk } = this.props;

    getNotesThunk();
  }

  render() {
    const { notes, deleteNoteThunk } = this.props;

    const notesList = notes && notes.map(note => {
      return (
        <NoteItem
          deleteNote={deleteNoteThunk}
          key={note._id}
          note={note}
        />
      );
    });

    return (
      <Fragment>
        <div className='notes'>
          {notesList}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes.notes,
});

export default connect(
  mapStateToProps,
  { getNotesThunk, deleteNoteThunk },
)(NotesList);

NotesList.propTypes = {
  getNotesThunk: PropTypes.func,
  deleteNoteThunk: PropTypes.func,
  notes: PropTypes.arrayOf(PropTypes.object),
};
