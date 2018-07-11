import React from 'react';

import AddNote from '../../features/AddNote';
import NotesList from '../../features/NotesList';

const MainPage = () => {
  return (
    <div>
      <AddNote />
      <NotesList />
    </div>
  );
};

export default MainPage;