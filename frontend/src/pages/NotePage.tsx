import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSave, BiSolidTrashAlt } from 'react-icons/bi';
import { Modal, Button, ButtonGroup, Toast, ToastContainer } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

import { DeleteNote, EditNote, FetchNoteParent } from '../api';
import { Note } from '../constants/NoteType';
import { UseFetchNote } from '../components/UseFetchNote';
import NoteCard from '../components/NoteCard';

// Styled components
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

const Metadata = styled.div`
  border: 1px solid #5938df;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const StyledMDEditor = styled(MDEditor)`
  --color-canvas-default: white;
  --color-fg-default: black;
  --color-border-default: #5938df  
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #5938df;
  box-shadow: 0 0 0;
  
  .w-md-editor-preview {
  }
  
  .w-md-editor-toolbar {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #5938df;
    background-color: transparent;
}
`;

const StyledToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const NotePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { note, setNote, loading, error } = UseFetchNote(Number(id));
  const [expandedReplies, setExpandedReplies] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editorState, setEditorState] = useState({
    content: '',
    preview: 'edit' as 'edit' | 'live' | 'preview',
  });
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  // Check if note has replies and display the replies in the sidcebar if yes 

  const [parentTree, setParentTree] = useState<Note | null>(null);

  useEffect(() => {
    if (note) {
      setEditorState(prev => ({ ...prev, content: note.content }));
      // document.title = `Note: ${note.title.slice(0, 20)}`;
      setParentTree(null);
      const loadParentTree = async () => {
        const noteParentTree = await FetchNoteParent(Number(id));
        setParentTree(noteParentTree);
      }

      loadParentTree();
      if (parentTree == null) {
        <div>No parent tree</div>
      } else {
        <div className="list">
          <NoteCard note={parentTree} onReplyAdded={onReplyAdded} />
        </div>
      }

      if (note.title) {
        const truncatedTitle = note.title.length > 20 ? note.title.slice(0, 20) : note.title;
        document.title = `Note: ${truncatedTitle}`;
      }
    }
  }, [note]);



  const showToast = (message: string, variant: 'success' | 'danger') => {
    setToast({ show: true, message, variant });
  };

  const handleSave = useCallback(async () => {
    if (!note) return;
    const updatedNote: Note = { ...note, content: editorState.content };
    try {
      await EditNote(updatedNote);
      setNote(updatedNote);
      showToast('Note saved successfully!', 'success');
    } catch (err) {
      console.error('Failed to save note', err);
      showToast('Failed to save note. Please try again.', 'danger');
    }
  }, [note, editorState.content, setNote]);

  const handleDelete = useCallback(async () => {
    if (!note) return;
    try {
      await DeleteNote(note.id);
      showToast('Note deleted successfully!', 'success');
      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        navigate('/');
      }, 1500); // Adjust this delay as needed
    } catch (err) {
      console.error('Failed to delete note', err);
      showToast('Failed to delete note. Please try again.', 'danger');
    }
  }, [note, navigate]);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (!note) return <Container>Note not found</Container>;
  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);

  const onReplyAdded = () => { }
  const renderReplies = () => {
    {
      note.replies ? note.replies.map(reply => (
        <NoteCard key={reply.id} note={reply} onReplyAdded={onReplyAdded} />
      )) : <div>No replies yet</div>
    }
    if (note.replies && note.replies.length > 0) {
      return note.replies.map(reply => (
        <NoteCard key={reply.id} note={reply} onReplyAdded={onReplyAdded} />
      ));
    } else {
      return <div>No replies yet</div>;
    }
  }


  // const renderReplies = () => {
  //   if (note.replies) {
  //     const displayedReplies = showAllReplies ? note.replies : [note.replies[0]];
  //     return (
  //       <>
  //         {displayedReplies.map(reply => (
  //           <NoteCard key={reply.id} note={reply} onReplyAdded={onReplyAdded} />
  //         ))}
  //         {note.replies.length > 1 && (
  //           <Button
  //             variant="link"
  //             onClick={() => setShowAllReplies(!showAllReplies)}
  //           >
  //             {showAllReplies ? 'Hide' : 'Show'} {note.replies.length - 1} more {note.replies.length - 1 === 1 ? 'reply' : 'replies'}
  //           </Button>
  //         )}
  //       </>
  //     );
  //   } else {
  //     return <div>No replies yet</div>;
  //   }
  // }
  const renderParentTree = () => {

    if (!!!parentTree || parentTree == null) {
      return <div>No parent tree</div>;
    } else {
      return (
        <div className="list">
          <NoteCard note={parentTree} onReplyAdded={onReplyAdded} />
        </div>
      );
    }
  };

  return (
    <Container>
      <Header>
        <Title>{note.title}</Title>
        <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Header>

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

      <ButtonContainer>
        <Button variant="success" size="sm" className="me-2" onClick={handleSave}>
          <BiSave /> Save
        </Button>
        <Button variant="danger" size="sm" className="me-2" onClick={() => setShowDeleteConfirm(true)}>
          <BiSolidTrashAlt /> Delete
        </Button>
        <ButtonGroup size="sm">
          {(['edit', 'live', 'preview'] as const).map((mode) => (
            <Button
              key={mode}
              variant={editorState.preview === mode ? 'primary' : 'outline-secondary'}
              onClick={() => setEditorState(prev => ({ ...prev, preview: mode }))}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonContainer>

      <StyledMDEditor data-color-mode="light"
        value={editorState.content}
        onChange={(value) => setEditorState(prev => ({ ...prev, content: value || '' }))}
        preview={editorState.preview}
        height={400}
      />

      {/* See 1) note replies 2) Note parent tree */}
      <div className="container">
        <div className="row">
          <h4>Replies</h4>
          {/* {renderReplies()} */}
          {note.replies && note.replies.length > 0 && (
            <>
              {note.replies.length > 1 && (
                <div className="d-inline">
                  {/* <div className="d-flex justify-content-end mt-2"> */}

                  <Button
                    variant="outline-info" size="sm"
                    onClick={() => setExpandedReplies(!expandedReplies)}
                  >
                    {expandedReplies ? 'Show less' : `Show ${note.replies.length - 1} more replies`}
                  </Button>
                </div>
              )}
              {expandedReplies
                ? renderReplies()
                : (() => {
                  const result = renderReplies();
                  return Array.isArray(result) ? result.slice(0, 1) : result;
                })()
              }
            </>
          )}
          {(!note.replies || note.replies.length === 0) && renderReplies()}
          <h4>Parent Tree</h4>
          {renderParentTree()}
        </div>
      </div>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <StyledToastContainer>
        <Toast
          show={toast.show}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </StyledToastContainer>
    </Container>
  );
};

export default NotePage;

