import React, { useEffect, useRef, useState } from 'react';
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
  margin-left: 30px;
`;

interface NoteRepliesProps {
  note: Note;
}

const NoteReplies: React.FC<NoteRepliesProps> = ({ note }) => {
  const [expandedReplies, setExpandedReplies] = useState(false);
  const renderCount = useRef(0);
  const replies = note.replies || [];
  useEffect(() => {
    renderCount.current += 1;
    console.log('NoteReplies rendered', {
      noteId: note.id,
      repliesCount: replies.length,
      renderCount: renderCount.current,
      expanded: expandedReplies
    });
  });
  const renderReplies = () => {
    return replies.map(reply => (
      <NoteCard key={reply.id} note={reply} onReplyAdded={() => { }} />
    ));
  };
  console.log('NoteReplies rendering', { noteId: note.id, repliesCount: replies.length, expanded: expandedReplies });

  return (
    <Metadata>
      {replies.length === 0 ? (
        <Styled>No replies yet</Styled>
      ) : (
        <>
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
            : renderReplies().slice(0, 1)
          }
        </>
      )}
    </Metadata>
  );
};

export default NoteReplies;