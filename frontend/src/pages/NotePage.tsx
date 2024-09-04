// src/pages/NotePage.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import NoteMetadata from '../components/NoteMetadata';
import NoteEditor from '../components/NoteEditor';
import NoteReplies from '../components/NoteReplies';
import DeleteNoteModal from '../components/DeleteNoteModal';
import styled from 'styled-components';
import { Button, Spinner } from 'react-bootstrap';
import { Note } from '../constants/NoteType';
import { useSpinDelay } from 'spin-delay';
import { FetchNoteParent } from '../api';
import ParentTree from '../components/ParentTree';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

const NotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchNoteById, updateNote, deleteNote, loading, error } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      if (id) {
        try {
          const fetchedNote = await fetchNoteById(Number(id));
          setNote(fetchedNote);

        } catch (err) {
          console.error('Error fetching note:', err);
        }
      }
    };

    loadNote();
  }, [id, fetchNoteById, FetchNoteParent]);


  const handleSave = useCallback(async (updatedContent: string) => {
    if (note) {
      try {
        const updatedNote = { ...note, content: updatedContent };
        await updateNote(updatedNote);
        setNote(updatedNote); // Update local state
        console.log('Note updated successfully');
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    }
  }, [note, updateNote]);

  const handleTagSave = useCallback(async (updatedTags: string) => {
    if (note) {
      try {
        const updatedNote = { ...note, tags: updatedTags };
        await updateNote(updatedNote);
        setNote(updatedNote); // Update local state
        console.log('Note updated successfully');
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    }
  }, [note, updateNote]);

  const handleDelete = useCallback(async () => {
    if (note) {
      try {
        await deleteNote(note.id);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  }, [note, deleteNote, navigate]);

  const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 200 });

  if (showSpinner) {
    return (
      <Container>
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    )
  }

  if (error) return <Container>Error: {error}</Container>;
  if (!note) return null;

  return (
    <Container>
      <Header>
        <Title>{note.title}</Title>
        <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Header>
      <NoteMetadata
        note={note}
        onSave={handleTagSave}
      />
      <NoteEditor
        initialContent={note.content}
        onSave={handleSave}
        onDelete={() => setShowDeleteConfirm(true)}
      />
      {note && <NoteReplies note={note} />}
      {note && <ParentTree note={note} />}
      <DeleteNoteModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
      <div>
      </div>
    </Container >
  );
};

export default NotePage;