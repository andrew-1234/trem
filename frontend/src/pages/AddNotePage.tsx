// import { useEffect } from 'react'
// import { CreateNote } from '../api'
// import NoteForms from '../components/NoteForms'
// import { Note } from '../constants/NoteType'
// import { useNavigate } from 'react-router-dom'

// function AddNotePage() {

//   const navigate = useNavigate()
//   useEffect(() => {
//     document.title = 'Add Note'
//   })
//   const submitNote = async (note: Note) => {
//     try {
//       const createdNoteID = await CreateNote(note);
//       console.log('Note created:', createdNoteID);
//       navigate(`/note/${createdNoteID}`);
//     } catch (error) {
//       console.error('Error creating note:', error);
//     }
//   }
//   return (
//     <div>
//       <NoteForms onSubmit={submitNote} />
//     </div>
//   )
// }

// export default AddNotePage
import { useEffect } from 'react';
import { CreateNote } from '../api';
import NoteForms from '../components/NoteForms';
import { Note } from '../constants/NoteType';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

interface AddNotePageProps {
  onClose: () => void;
}

function AddNotePage({ onClose }: AddNotePageProps) {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Add Note';
  }, []);

  const submitNote = async (note: Note) => {
    try {
      const createdNoteID = await CreateNote(note);
      console.log('Note created:', createdNoteID);
      navigate(`/note/${createdNoteID}`);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Modal title="Add Note" onClose={onClose}>
      <div className="container">
        <NoteForms onSubmit={submitNote} />
      </div>

    </Modal>
  );
}

export default AddNotePage;