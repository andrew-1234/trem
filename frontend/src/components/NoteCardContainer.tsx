import NoteCard from "./NoteCard";
import { Note } from "../constants/NoteType";
import { useNotes } from "../contexts/NotesContext";

interface NoteCardContainerProps {
  totalNotes: number;
  notes: Note[];
  error: string | null;
  onReplyAdded: () => void;
}

const NoteCardContainer = ({
  totalNotes,
  notes,
  error,
  onReplyAdded,
}: NoteCardContainerProps) => {

  const dummyNote: Note = {
    id: 0,
    title: "Your First Note - Welcome!",
    content: "Click the title to get started.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: "inbox get-started",
    slug: "",
    thread_id: null,
    is_root_note: true,
  };
  const { deleteNote } = useNotes();
  const renderContent = () => {
    if (error) {
      return <div>Error: {error}</div>;
    }
    if (totalNotes === 0) {
      return (
        <div className="list">
          <NoteCard note={dummyNote} onReplyAdded={onReplyAdded} />
        </div>
      );
    }
    return notes.map((note) => (
      <div key={note.id} className="list">
        <NoteCard note={note} onReplyAdded={onReplyAdded} onDelete={deleteNote} showDeleteButton={true} />
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {renderContent()}
      </div>
    </div>
  );
};

export default NoteCardContainer;