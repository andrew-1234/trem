import React, { useState } from 'react';
import { Note } from '../constants/NoteType';

interface NoteFormProps {
  onSubmit: (note: Note) => void;
  passedNote?: Note;
}

function NoteForms(props: NoteFormProps) {
  // If passed note is provided, use it as initial state
  const initialNote = props.passedNote ? props.passedNote : {
    id: 0,
    title: '',
    content: '',
    tags: '',
    created_at: '',
    updated_at: '',
    slug: '',
    thread_id: null,
  };

  const [note, setNote] = useState<Note>(initialNote);

  // Set state when form input changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    var { name, value } = event.target;
    setNote({
      ...note,
      [name]: value
    })
  }

  // Handle form submission event using the passed onSubmit prop
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (note.tags && note.tags.length > 0) {
      // If note has tags, check if the values are comma separated
      // If not, convert to comma separated
      var value = note.tags
      note.tags = value.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0).join(', ')
    }

    props.onSubmit(note);
  }

  return (
    <div className="container col-6">
      <form onSubmit={handleSubmit}>

        {/* Container Header */}
        <h1 style={{ textAlign: 'center' }} >{note.id ? 'Edit Note' : 'Create a Note'}</h1>

        {/* Title form*/}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="Enter note's title"
            value={note.title}
            name="title"
            onChange={handleChange}
          ></input>
        </div>

        {/* Content form */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className='form-control'
            placeholder='Enter note content'
            value={note.content}
            name="content"
            onChange={handleChange}
            rows={10}
          ></textarea>
        </div>

        {/* Tags form */}
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <small id="optional" className="form-text text-muted float-end">Optional</small>
          <input
            className="form-control"
            placeholder="Enter tags (comma separated)"
            value={note.tags}
            name="tags"
            onChange={handleChange}
          ></input>
        </div>


        {/* Submit button */}
        <button
          className="btn btn-primary d-flex justify-content-center mt-3"
          style={{ width: "100%" }}
        >
          {note.id ? 'Save Note' : 'Add Note'}
        </button>
      </form>
    </div>
  )
}

export default NoteForms