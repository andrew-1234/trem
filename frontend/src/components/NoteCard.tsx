import { Link } from "react-router-dom";
import { Note } from '../constants/noteType';
import { ROUTES } from '../constants/routes';

type NoteCardProps = {
  note: Note;
  color?: string;
};

const NoteCard = ({ note, color = "magenta" }: NoteCardProps) => {
  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);
  return (

    <div className="single-note-item">
      <div className="card card-body">

        {/* Link to the Note's Page */}
        <Link to={ROUTES.NOTE_INFO(note.id.toString())} style={{ textDecoration: 'none' }}>
          <h5 className="note-title text-truncate w-75" data-note-title={note.title}>{note.title}</h5>
        </Link>

        {/* Note Metadata: Date Created */}
        <h6 className="mb-2 text-black text-opacity-50">{new Date(note.created_at).toLocaleString()}</h6>

        {/* Note Metadata: Tags */}
        <div className="tags mb-2">
          {tagsArray.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>

        {/* Note Contents */}
        <div className="card-text text-truncate" data-card-text={note.content}>
          {note.content}
        </div>
      </div>
    </div >

  )
}

export default NoteCard