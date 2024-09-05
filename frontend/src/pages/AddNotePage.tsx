import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import NoteForms from '../components/NoteForms';
import { Note } from '../constants/NoteType';
import Modal from '../components/Modal';

interface AddNotePageProps {
  onClose: () => void;
}

function AddNotePage({ onClose }: AddNotePageProps) {
  // const navigate = useNavigate();
  const { addNote } = useNotes();

  useEffect(() => {
    document.title = 'Add Note';
  }, []);

  const submitNote = async (note: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'slug'>) => {
    try {
      const createdNoteID = await addNote(note);
      console.log('Note created:', createdNoteID);
      // navigate(`/note/${createdNoteID}`);
      onClose(); // Close the modal after successful creation
    } catch (error) {
      // Error handling is now done in the context
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