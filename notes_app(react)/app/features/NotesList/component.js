import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RemoveIcon } from '../../components/Icons';

const NoteItem = ({ note, deleteNote, updateNote }) => {
  return (
    <div className='notes__item'>
      <div className='notes__icons'>
        <RemoveIcon
          id={note._id}
          removeNote={deleteNote}
        />
      </div>
      <h2 className='notes__title'>
        <Link to={`/notes/${note._id}`}>
          {note.title}
        </Link>
      </h2>
      <time>{new Date(note.date).toLocaleDateString()}</time>
      <p className='notes__description'>{note.description}</p>
    </div>
  );
};

export default NoteItem;

NoteItem.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }),
};
