import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import NoteCard from './NoteCard';
import { Button } from 'react-bootstrap';

interface NoteRepliesProps {
  noteId: number;
}

const NoteReplies: React.FC<NoteRepliesProps> = ({ noteId }) => {
  const { notes } = useNotes();
  const [expandedReplies, setExpandedReplies] = useState(false);

  const note = notes.find(n => n.id === noteId);
  const replies = note?.replies || [];

  const renderReplies = () => {
    if (replies.length === 0) {
      return <div>No replies yet</div>;
    }

    return replies.map(reply => (
      <NoteCard key={reply.id} note={reply} onReplyAdded={() => { }} />
    ));
  };

  return (
    <div>
      <h4>Replies</h4>
      {replies.length > 1 && (
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setExpandedReplies(!expandedReplies)}
          className="mb-2"
        >
          {expandedReplies ? 'Show less' : `Show ${replies.length - 1} more replies`}
        </Button>
      )}
      {expandedReplies
        ? renderReplies()
        : (() => {
          const result = renderReplies();
          return Array.isArray(result) ? result.slice(0, 1) : result;
        })()
      }
    </div>
  );
};

export default NoteReplies;