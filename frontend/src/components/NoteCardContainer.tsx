import NoteCard from "./NoteCard";
import { Note } from "../constants/noteType";
import { FetchNotes } from "../api";
import { useState, useEffect } from "react";
import { HomePagination } from "../components/HomePagination"

const NoteCardContainer = () => {
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
  var page_count = 10;
  console.log('page_count', page_count)
  console.log(notes.length)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="container">
      <div className="pagination-sm" >
        <div className="row">
          {notes.map(note => (
            <div key={note.id} className="list">
              <NoteCard note={note} />
            </div>))}
          <p>hello</p>
          <HomePagination pageCount={page_count} onPageChange={setPage} currentPage={page} />
        </div>
      </div>
    </div>
  )
}

export default NoteCardContainer;