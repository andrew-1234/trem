import React, { useState, useCallback, useEffect } from 'react';
import { Note } from '../constants/NoteType';
import styled from 'styled-components';
import { Button, Form, ButtonProps } from 'react-bootstrap';

const Metadata = styled.div`
  border: 1px solid #5938df;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

const TagBadge = styled.span`
  background-color: #5938df;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
`;

const EditButton = styled(Button) <ButtonProps>`
  margin-left: 10px;
  padding: 2px 8px;
  font-size: 0.8em;
`;

interface NoteMetadataProps {
  note: Note;
  onSave: (updatedTags: string) => Promise<void>;
}

const NoteMetadata: React.FC<NoteMetadataProps> = ({ note, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(note.tags);

  useEffect(() => {
    setTags(note.tags);
  }, [note.tags]);

  const handleSave = useCallback(async () => {
    try {
      await onSave(tags);
      setIsEditing(false);
      console.log('Tags saved successfully');
    } catch (error) {
      console.error('Failed to save tags:', error);
    }
  }, [tags, onSave]);

  const handleCancel = () => {
    setTags(note.tags);
    setIsEditing(false);
  };

  const tagsArray = tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);

  return (
    <Metadata>
      <div>Created: {new Date(note.created_at).toLocaleString()}</div>
      <div>Updated: {new Date(note.updated_at).toLocaleString()}</div>
      <div>Number of replies: {note.replies ? note.replies.length : 0}</div>
      <TagsContainer>
        Tags:
        {isEditing ? (
          <Form.Control
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags, separated by commas"
          />
        ) : (
          tagsArray.map((tag, index) => (
            <TagBadge key={index}>{tag}</TagBadge>
          ))
        )}
        {isEditing ? (
          <>
            <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
            <Button variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <EditButton variant="outline-primary" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </EditButton>
        )}
      </TagsContainer>
    </Metadata>
  );
};

export default NoteMetadata;