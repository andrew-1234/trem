import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Note } from '../constants/noteType'
import { editNote } from '../api';
import { useFetchNote } from '../components/useFetchNote';
import NoteForms from '../components/NoteForms'

function EditNotePage() {
  const navigate = useNavigate()

  // Set the document title
  useEffect(() => {
    document.title = 'Edit Note'
  })

  // Fetch note data by ID
  const { id } = useParams<{ id: string }>();
  const { note, loading, error } = useFetchNote(Number(id));


  // Return if loading, error, or note not found
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!note) {
    return <div>Note not found</div>;
  }

  // Define the submitNote function
  const submitNote = async (note: Note) => {
    await editNote(note);
    console.log('Note edited:', id);
    navigate(`/note/${id}`)
  }

  // Return the NoteForm, passing the note and the submitNote function
  return (
    <div>
      <NoteForms onSubmit={submitNote} passedNote={note} />
    </div>
  )
}

export default EditNotePage 