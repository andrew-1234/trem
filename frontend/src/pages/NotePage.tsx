import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import NoteMetadata from '../components/NoteMetadata';
import NoteEditor from '../components/NoteEditor';
import NoteReplies from '../components/NoteReplies';
import DeleteNoteModal from '../components/DeleteNoteModal';
import styled from 'styled-components';
import { Spinner, Container, Button } from 'react-bootstrap';
import { Note } from '../constants/NoteType';
import { useSpinDelay } from 'spin-delay';
import ParentTree from '../components/ParentTree';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { BiMenuAltRight } from 'react-icons/bi';
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  transition: margin-left 0.3s ease-in-out;
  padding: 20px;
`;

const NotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchNoteById, updateNote, deleteNote, loading, error } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log('NotePage rendered', {
      noteId: note?.id,
      renderCount: renderCount.current
    });
  });

  const handleSubMenuToggle = useCallback((open: boolean) => {
    console.log('Replies submenu', open ? 'opened' : 'closed');
  }, []);


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

  }, [id, fetchNoteById]);

  const handleSave = useCallback(async (updatedContent: string) => {
    if (note) {
      try {
        const updatedNote = { ...note, content: updatedContent };
        await updateNote(updatedNote);
        setNote(updatedNote);
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
        setNote(updatedNote);
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
    );
  }

  if (error) return <PageContainer>Error: {error}</PageContainer>;
  if (!note) return null;

  return (
    <Container>
      <PageContainer>
        <Sidebar
          collapsed={collapsed}
          rtl={false}
        >
          <div className="d-flex justify-content-end">
            <Button variant="" onClick={() => setCollapsed(!collapsed)}>
              <BiMenuAltRight />
            </Button>
          </div>
          <Menu>
            <SubMenu label="Metadata">
              <MenuItem component={<NoteMetadata note={note} onSave={handleTagSave} />} >
              </MenuItem>
            </SubMenu>
            <SubMenu label="Replies" onOpenChange={handleSubMenuToggle}>
              {note && note.replies && note.replies.length > 0
                ? <MenuItem component={<NoteReplies note={note} />}></MenuItem>
                : <div>No replies</div>
              }
            </SubMenu>
            <SubMenu label="Parent Tree">
              <MenuItem component={<ParentTree note={note} />} >
              </MenuItem>
            </SubMenu>
            <SubMenu label="Hello">
              <MenuItem >
                Hello
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
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
      </PageContainer>
    </Container >
  );
};

export default NotePage;