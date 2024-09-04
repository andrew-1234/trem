// src/pages/NotePage.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import NoteMetadata from '../components/NoteMetadata';
import NoteEditor from '../components/NoteEditor';
import NoteReplies from '../components/NoteReplies';
import DeleteNoteModal from '../components/DeleteNoteModal';
import styled from 'styled-components';
import { Spinner, Tabs, Tab } from 'react-bootstrap';
import { Note } from '../constants/NoteType';
import { useSpinDelay } from 'spin-delay';
import { FetchNoteParent } from '../api';
import ParentTree from '../components/ParentTree';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const SidePanel = styled.div`
  width: 350px;
  background-color: #f8f9fa;
  padding: 20px;
  border-left: 1px solid #dee2e6;
  overflow-y: auto;
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
      <MainContent>
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </MainContent>
    )
  }

  if (error) return <MainContent>Error: {error}</MainContent>;
  if (!note) return null;

  return (
    <PageContainer>
      <MainContent>
        <NoteEditor
          initialContent={note.content}
          title={note.title}
          onSave={handleSave}
          onDelete={() => setShowDeleteConfirm(true)}
        />
        <DeleteNoteModal
          show={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      </MainContent>
      <SidePanel>
        <Tabs defaultActiveKey="metadata" id="side-panel-tabs">
          <Tab eventKey="metadata" title="Metadata">
            <NoteMetadata note={note} onSave={handleTagSave} />
          </Tab>
          <Tab eventKey="parentTree" title="Parent Tree">
            {note && <ParentTree note={note} />}
          </Tab>
          <Tab eventKey="replies" title="Replies">
            {note && <NoteReplies note={note} />}
          </Tab>
        </Tabs>
      </SidePanel>
    </PageContainer>
  );
};

export default NotePage;