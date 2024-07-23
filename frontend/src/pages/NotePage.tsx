import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { NoteRoutes } from "../constants/NoteRoutes";
import { UseFetchNote } from "../components/UseFetchNote"
import { DeleteNote } from "../api";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    } else {
      document.title = 'Note'
    }
  })

  const [confirmShow, setConfirmShow] = useState(false);
  const handleDeleteFirst = () => {
    setConfirmShow(true);
  }

  const handleDelete = async (noteId: number) => {
    try {
      await DeleteNote(Number(noteId));
    } catch (err) {
      console.error('Failed to delete note', err);
    } finally {
      // navigate(-1);
      navigate("/");
    }
  };

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

  // Split tags into an array for display
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

      {/* Edit and Delete Note buttons */}
      <div className="d-flex flex-row justify-content-end">
        <div>
          {/* Edit Note */}
          <Link to={NoteRoutes.EDIT_NOTE(note.id.toString())} className="btn btn-outline-primary btn-sm m-1"><FiEdit /><span>Edit</span></Link>
          {/* Delete Note */}
          <Button className="btn-sm m-1 btn-danger" onClick={handleDeleteFirst}>
            <BiSolidTrashAlt />Delete</Button>
          {/* </button> */}
        </div>
      </div>

      {/* Note contents */}
      <div className="note-content border border-primary">
        {note.content}
      </div>

      {/* Confirm Deletion Modal */}
      <Modal show={confirmShow} onHide={() => setConfirmShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete? This is permanent.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(note.id)}>
            I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
    </div >

  );
};

export default NotePage;