// src/pages/NotePage.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import NoteMetadata from '../components/NoteMetadata';
import NoteEditor from '../components/NoteEditor';
import NoteReplies from '../components/NoteReplies';
import DeleteNoteModal from '../components/DeleteNoteModal';
import styled from 'styled-components';
import { Spinner, Tabs, Tab, Container, Button } from 'react-bootstrap';
import { Note } from '../constants/NoteType';
import { useSpinDelay } from 'spin-delay';
import { FetchNoteParent } from '../api';
import ParentTree from '../components/ParentTree';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const MainContent = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  transition: margin-right 0.3s ease-in-out;
  margin-right: ${props => props.isSidebarOpen ? '320px' : '0'};
`;

const SidePanelContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  right: ${props => props.$isOpen ? '0' : '-300px'};
  top: 0px;
  bottom: 0;
  width: 350px;
  transition: right 0.3s ease-in-out;
  display: flex;
`;

const SidePanel = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  border-left: 1px solid #dee2e6;
  overflow-y: auto;
  padding: 20px;
`;

const ToggleButton = styled.button`
  position: absolute;
  left: -10px;
  top: 0;
  bottom: 0;
  width: 20px;
  background-color: #e9ecef;
  border: none;
  border-right: 1px solid #dee2e6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  &:hover {
    background-color: #dee2e6;
  }
  svg {
    font-size: 0.8rem;
  }
`;
const NotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchNoteById, updateNote, deleteNote, loading, error } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      <PageContainer>
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </PageContainer>
    )
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (error) return <PageContainer>Error: {error}</PageContainer>;
  if (!note) return null;

  return (
    <Container>
      <PageContainer>
        <MainContent isSidebarOpen={isSidebarOpen}>
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
        <SidePanelContainer $isOpen={isSidebarOpen}>
          <ToggleButton onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
          </ToggleButton>
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
        </SidePanelContainer>
        {/* <ToggleButton
          isOpen={isSidebarOpen}
          onClick={toggleSidebar}
        /> */}

      </PageContainer>
    </Container>
  );
};

export default NotePage;