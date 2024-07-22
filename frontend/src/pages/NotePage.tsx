import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { noteRoutes } from "../constants/NoteRoutes";
import { UseFetchNote } from "../components/UseFetchNote"

const NotePage = () => {
  const navigate = useNavigate()

  // Set the document title 
  useEffect(() => {
    if (note) {
      if (note.title.length >= 20) {
        document.title = note.title.slice(0, 20)
      } else {
        document.title = note.title
      }
    }
  })

  // Fetch note data by ID
  const { id } = useParams<{ id: string }>();
  const { note, loading, error } = UseFetchNote(Number(id));

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

  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (

    <div className="container">
      <div className="d-flex justify-content-between">

        {/* Title | Navigate Back */}
        <h1 className="title">{note.title}</h1>
        <button onClick={() => navigate(-1)} className="btn btn-primary btn-sm align-self-end m-2">Back</button>
      </div>

      {/* Note Metadata box */}
      <div className="note-metadata d-flex flex-column border border-primary">
        <div> Created: {new Date(note.created_at).toLocaleString()} </div>
        <div> Updated: {new Date(note.created_at).toLocaleString()} </div>
        <div>Tags: {tagsArray.map((tag, index) => (
          <span key={index} className="badge bg-primary me-1">
            {tag}
          </span>
        ))}</div>
      </div>

      {/* Delete and Edit Note buttons */}
      <div className="d-flex flex-row justify-content-end">
        <div>
          {/* Edit Note */}
          <Link to={noteRoutes.EDIT_NOTE(note.id.toString())} className="btn btn-outline-primary btn-sm m-1"><FiEdit /><span>Edit</span></Link>
          {/* Delete Note */}
          <button className="btn btn-danger btn-sm m-1"><BiSolidTrashAlt /><span>Delete</span></button>
        </div>
      </div>

      {/* Note contents */}
      <div className="note-content border border-primary">
        {note.content}
      </div>
    </div>

  );
};

export default NotePage;