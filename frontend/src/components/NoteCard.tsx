import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
type NoteCardProps = { color?: string };

const NoteCard = ({ color = "green" }: NoteCardProps) => {
  return (
    <div className="col-md-4 single-note-item">
      <div className="card card-body">
        <FaNoteSticky style={{ marginLeft: "auto", color: color }} />
        <Link to="/note-info" style={{
        }}>
          <h5 className="note-title text-truncate w-75" data-note-title="Placeholder">Ghost in the Shell</h5>
        </Link>
        <h6 className="card-subtitle mb-0 text-muted fs-6">18 July 2024</h6>
        <p className="card-text" data-card-text="Placeholder">
          Alice was beginning to get very tired of sitting by her sister on the
          bank, and of having nothing to do. Once or twice she had peeped into
          the book her sister was reading, but it had no pictures or
          conversations in it, “and what is the use of a book,” thought Alice,
          “without pictures or conversations?”
        </p>
        <p>hello</p>
      </div>
    </div >
  )
}
export default NoteCard