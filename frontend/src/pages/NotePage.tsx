import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MDEditor, { codeEdit, codePreview, commands, EditorContext, MDEditorProps, title1 } from '@uiw/react-md-editor';
import { NoteRoutes } from "../constants/NoteRoutes";
import { UseFetchNote } from "../components/UseFetchNote";
import { DeleteNote } from "../api";
import React from 'react';
import styled from 'styled-components';
import { ButtonGroup } from 'react-bootstrap';

const NotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { note, loading, error } = UseFetchNote(Number(id));
  const [confirmShow, setConfirmShow] = useState(false);
  const [newContent, setNewContent] = useState("");

  const Toolbar = styled.div`
  padding-top: 10px;
  text-align: center;
  `;

  const [state, setVisible] = React.useState<MDEditorProps>({
    hideToolbar: false,
    value: '',
    preview: 'preview',
  });

  const handleEditorChange = (value?: string) => {
    setNewContent(value || "");
  };

  const upPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisible({ ...state, preview: e.target.value as MDEditorProps['preview'] });
  };

  useEffect(() => {
    if (note) {
      setNewContent(note.content);
      setVisible({ ...state, value: note.content });
      document.title = note.title.length >= 20 ? note.title.slice(0, 20) : note.title;
    } else {
      document.title = 'Note';
    }
  }, [note]);

  const handleDeleteFirst = () => setConfirmShow(true);

  const handleDelete = async (noteId: number) => {
    try {
      await DeleteNote(Number(noteId));
      navigate("/");
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!note) return <div>Note not found</div>;

  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="title">{note.title}</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary btn-sm align-self-end m-2"
        >
          Back
        </button>
      </div>

      <div className="note-metadata d-flex flex-column border border-primary">
        <div>Created: {new Date(note.created_at).toLocaleString()}</div>
        <div>Updated: {new Date(note.updated_at).toLocaleString()}</div>
        <div>
          Tags:
          {tagsArray.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="d-flex flex-row justify-content-end">

        <Link
          to={NoteRoutes.EDIT_NOTE(note.id.toString())}
          className="btn btn-outline-primary btn-sm m-1"
        >
          <FiEdit />
          <span>Edit</span>
        </Link>
        <Button className="btn-sm m-1 btn-danger" onClick={handleDeleteFirst}>
          <BiSolidTrashAlt />
          Delete
        </Button>

        <ButtonGroup className="m-1">
          <input
            type="radio"
            className="btn-check"
            name="preview"
            id="edit"
            value="edit"
            autoComplete="off"
            checked={state.preview === "edit"}
            onChange={upPreview}
          />
          <label
            className={`btn btn-sm ${state.preview === "edit" ? "btn-primary" : "btn-outline-secondary"}`}
            htmlFor="edit"
          >
            Edit
          </label>

          <input
            type="radio"
            className="btn-check"
            name="preview"
            id="live"
            value="live"
            autoComplete="off"
            checked={state.preview === "live"}
            onChange={upPreview}
          />
          <label
            className={`btn btn-sm ${state.preview === "live" ? "btn-primary" : "btn-outline-secondary"}`}
            htmlFor="live"
          >
            Live Preview
          </label>

          <input
            type="radio"
            className="btn-check"
            name="preview"
            id="preview"
            value="preview"
            autoComplete="off"
            checked={state.preview === "preview"}
            onChange={upPreview}
          />
          <label
            className={`btn btn-sm ${state.preview === "preview" ? "btn-primary" : "btn-outline-secondary"}`}
            htmlFor="preview"
          >
            Preview
          </label>
        </ButtonGroup>
      </div>

      {/* <div
        // data-color-mode="light"
        className="note-content border border-primary"
      >
        <MDEditor
          value={newContent}
          onChange={handleEditorChange}
          preview="edit"
          commands={[
            // Custom Toolbars
            title1,
          ]}
          extraCommands={[codePreview, codeEdit]}
        />

        <br />
        <hr></hr>
        <br />
        <MDEditor.Markdown source={newContent} />
      </div> */}


      <div className='wmde-markdown-var'>

        <MDEditor
          autoFocus
          value={state.value}
          height={400}
          hideToolbar={!state.hideToolbar}
          textareaProps={{
            placeholder: "Please enter Markdown text",
          }}
          preview={state.preview}
          onChange={(newValue = "") => {
            setVisible({ ...state, value: newValue });
          }}
        />
        <Toolbar>
          <label>
            <input
              type="checkbox"
              checked={state.hideToolbar}
              onChange={(e) => {
                setVisible({ ...state, hideToolbar: e.target.checked });
              }}
            />
            Show ToolBar
            {/* {state.hideToolbar ? 'Show' : 'Hidden'} ToolBar */}
          </label>


        </Toolbar>
      </div>
      <Modal show={confirmShow} onHide={() => setConfirmShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete? This is permanent.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(note.id)}>
            I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotePage;
