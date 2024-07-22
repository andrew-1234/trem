import NoteCard from "./NoteCard";
import { Note } from "../constants/noteType";
import { FetchNotes } from "../api";
import { useState, useEffect } from "react";
import { HomePagination } from "../components/HomePagination"

interface NoteCardContainerProps {
  totalNotes: number;
}

const NoteCardContainer = (props: NoteCardContainerProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const page_size = 10; // Set the number of notes per page
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesData = await FetchNotes(page, page_size);
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
  }, [page]);
  // use FetchTotalNotes to get the total number of notes
  // use Math.ceil to get the total number of pages
  // use HomePagination to display the pagination

  // const page_count = Math.ceil(notes.length / page_size);
  // var total_notes = FetchTotalNotes();

  const page_count = Math.ceil(props.totalNotes / 10); // Assuming 10 notes per page

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (props.totalNotes === 0) {
  //   return <div>No notes found</div>;
  // }
  const dummyNote: Note = {
    id: 0,
    title: "Your First Note - Welcome! ",
    content: "Click the title to get started.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: "inbox get-started"
  }

  return (
    <div className="container">
      <div className="pagination-sm" >
        <HomePagination pageCount={page_count} onPageChange={setPage} currentPage={page} />
        <div className="row">
          {/* {notes.map(note => (
            <div key={note.id} className="list">
              <NoteCard note={note} />
            </div>))} */}
          {props.totalNotes === 0 ? (
            <div className="list">
              <NoteCard note={dummyNote} />
            </div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="list">
                <NoteCard note={note} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteCardContainer;