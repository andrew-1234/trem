import React from 'react';
import { Note } from '../constants/NoteType';
import styled from 'styled-components';

const Metadata = styled.div`
  border: 1px solid #5938df;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

interface NoteMetadataProps {
  note: Note;
}

const NoteMetadata: React.FC<NoteMetadataProps> = ({ note }) => {
  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (
    <Metadata>
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
    </Metadata>
  );
};

export default NoteMetadata;