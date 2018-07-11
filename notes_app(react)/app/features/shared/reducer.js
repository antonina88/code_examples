import { GET_NOTES, ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from './types';

export const initialState = {
  notes: [],
};

export default function notesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
      };

    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, payload],
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== payload),
      };

    case EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === payload._id
          ? payload
          : note
        ),
      };

    default:
      return state;
  }
}
