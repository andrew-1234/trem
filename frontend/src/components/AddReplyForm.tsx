import React, { useState } from 'react';
import { CreateNote } from '../api/ApiNotes';

interface ReplyFormProps {
  parentNoteId: number;
  onReplyAdded: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ parentNoteId, onReplyAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CreateNote({
        title,
        content,
        tags,
        thread_id: parentNoteId,
      });
      setTitle('');
      setContent('');
      setTags('');
      onReplyAdded();
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-body border-top">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Reply title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Reply content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Reply</button>
    </form>
  );
};

export default ReplyForm;