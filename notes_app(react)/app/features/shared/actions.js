import { GET_NOTES, ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from './types';

export const getNotes = (payload) => ({
  type: GET_NOTES,
  payload,
});

export const addNote = (payload) => ({
  type: ADD_NOTE,
  payload,
});

export const deleteNote = (payload) => ({
  type: DELETE_NOTE,
  payload,
});

export const editNote = (payload) => ({
  type: EDIT_NOTE,
  payload,
});

export const getNotesThunk = () => {
  return (dispatch, state, api) => {
    return api('notes')
      .then(response => {
        dispatch(getNotes(response.data));
      });
  };
};

export const addNoteThunk = (body) => {
  return (dispatch, state, api) => {
    return api(`notes`, 'post', body, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(addNote(response.data));
      });
  };
};

export const editNoteThunk = (body) => {
  return (dispatch, state, api) => {
    return api(`notes/${body._id}`, 'patch', body, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(editNote(response.data));
      });
  };
};

export const deleteNoteThunk = (id) => {
  return (dispatch, state, api) => {
    api(`notes/${id}`, 'delete', id, { 'Content-Type': 'application/json' })
      .then(response => {
        dispatch(deleteNote(response.data._id));
      });
  };
};