import React, { useState } from 'react';
import { Note } from '../constants/NoteType';

type NoteFormData = Omit<Note, 'id' | 'created_at' | 'updated_at' | 'slug'>;

interface NoteFormProps {
  onSubmit: (note: NoteFormData) => void;
  passedNote?: Note;
}

function NoteForms({ onSubmit, passedNote }: NoteFormProps) {
  const initialNote: NoteFormData = passedNote ? {
    title: passedNote.title,
    content: passedNote.content,
    tags: passedNote.tags,
    thread_id: passedNote.thread_id,
    is_root_note: passedNote.is_root_note,
  } : {
    title: '',
    content: '',
    tags: '',
    thread_id: null,
    is_root_note: true,
  };

  const [note, setNote] = useState<NoteFormData>(initialNote);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const submittedNote = {
      ...note,
      tags: note.tags
        .split(/[, ]+/)
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .join(', ')
    };
    onSubmit(submittedNote);
  }

  return (
    <div className="container col-6">
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center' }}>{passedNote ? 'Edit Note' : 'Create a Note'}</h1>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="Enter note's title"
            value={note.title}
            name="title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className='form-control'
            placeholder='Enter note content'
            value={note.content}
            name="content"
            onChange={handleChange}
            rows={10}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <small id="optional" className="form-text text-muted float-end">Optional</small>
          <input
            className="form-control"
            placeholder="Enter tags (comma separated)"
            value={note.tags}
            name="tags"
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary d-flex justify-content-center mt-3"
          style={{ width: "100%" }}
          type="submit"
        >
          {passedNote ? 'Save Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
}

export default NoteForms;