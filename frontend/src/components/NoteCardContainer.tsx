import NoteCard from "./NoteCard";
import { Note } from "../constants/noteType";
import { fetchNotes } from "../api";
import { useState, useEffect } from "react";


const NoteCardContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesData = await fetchNotes();
        console.log('loadNotes inside NoteCardContainer')
        setNotes(notesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {notes.map(note => (
          <div key={note.id} className="col-md-4">
            <NoteCard note={note} />
          </div>))}
      </div>
    </div>
  )
}

export default NoteCardContainer;