import React, { useState } from 'react';
import NoteCard from './NoteCard';
import { Button } from 'react-bootstrap';
import { Note } from '../constants/NoteType';
import styled from 'styled-components';

const Metadata = styled.div`
  // padding: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const Styled = styled.div`
  display: flex;
  justify-content: center;
`;

interface NoteRepliesProps {
  note: Note;
}

const NoteReplies: React.FC<NoteRepliesProps> = ({ note }) => {
  const [expandedReplies, setExpandedReplies] = useState(false);

  const replies = note?.replies || [];

  const renderReplies = () => {
    if (replies.length === 0) {
      return <Styled>No replies yet</Styled>;
    }

    return replies.map(reply => (
      <NoteCard key={reply.id} note={reply} onReplyAdded={() => { }} />
    ));
  };

  return (
    <Metadata>
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
    </Metadata>
  );
};

export default NoteReplies;