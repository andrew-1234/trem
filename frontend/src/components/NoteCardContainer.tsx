import NoteCard from "./NoteCard";
import { Note } from "../constants/NoteType";

interface NoteCardContainerProps {
  totalNotes: number;
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const NoteCardContainer = ({
  totalNotes,
  notes,
  loading,
  error,
}: NoteCardContainerProps) => {

  const dummyNote: Note = {
    id: 0,
    title: "Your First Note - Welcome!",
    content: "Click the title to get started.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: "inbox get-started",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {totalNotes === 0 ? (
          <div className="list">
            <NoteCard note={dummyNote} />
          </div>
        ) : notes.length === 0 ? (
          <div className="list">
            <p>No results</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="list">
              <NoteCard note={note} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteCardContainer;