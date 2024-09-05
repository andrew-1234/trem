import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Note } from '../constants/NoteType';
import { NoteRoutes } from '../constants/NoteRoutes';
import ReplyForm from './AddReplyForm';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa6';
import DeleteNoteModal from './DeleteNoteModal';

type NoteCardProps = {
  note: Note;
  color?: string;
  depth?: number;
  onReplyAdded: () => void;
  onDelete?: (noteId: number) => void;
  showDeleteButton?: boolean;
};

const StyledNoteCard = styled.div`
  background-color: ${props => props.color};
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
`;

const NoteCard: React.FC<NoteCardProps> = ({ note, color, depth = 0, onReplyAdded, onDelete, showDeleteButton }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const tagsArray = note.tags.split(/[, ]+/).map(tag => tag.trim()).filter(tag => tag.length > 0);
  const { id } = useParams();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDelete = () => {
    if (onDelete) {
      onDelete(note.id);
    }
  };
  return (
    // <div className={`single-note-item ${depth > 0 ? 'reply' : ''}`} style={{ marginLeft: `${depth * 20}px` }}>
    <div className={`single-note-item ${depth > 0 ? 'reply' : ''}`} >
      <StyledNoteCard color={color} className='card card-body mb-1'>
        {/* <div className={`card card-body ${color ? 'currentCard' : ''} mb-3`}> */}
        <Link to={NoteRoutes.NOTE_INFO(note.id.toString())} style={{ textDecoration: 'none' }}>
          <h5 className="note-title text-truncate w-75" data-note-title={note.title}>{note.title}</h5>
        </Link>
        {showDeleteButton && onDelete && (
          <ButtonContainer>
            <Button variant="outline-danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
              <FaTrash />
            </Button>
          </ButtonContainer>
        )}
        <h6 className="mb-2 text-black text-opacity-50">Created: {new Date(note.created_at).toLocaleString()}</h6>

        <div className="tags mb-2">
          {tagsArray.map((tag, index) => (
            <span key={index} className="badge bg-primary me-1">{tag}</span>
          ))}
        </div>

        <div className="card-text text-truncate" data-card-text={note.content}>
          {note.content}
        </div>

        {depth === 0 && (
          <button onClick={() => setShowReplyForm(!showReplyForm)} className="btn btn-outline-primary mt-2">
            {showReplyForm ? 'Cancel Reply' : 'Reply'}
          </button>
        )}

        {showReplyForm && (
          <ReplyForm
            parentNoteId={note.id}
            onReplyAdded={() => {
              setShowReplyForm(false);
              onReplyAdded();
            }}
          />
        )}

        {note.replies && note.replies.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)} className="btn btn-link">
            {showReplies ? 'Hide' : 'Show'} Replies ({note.replies.length})
          </button>
        )}

        {showReplies && note.replies && note.replies.map(reply => (
          <NoteCard key={reply.id} note={reply} color={Number(id) === reply.id ? '#B4FF7B' : ''} depth={depth + 1} onReplyAdded={onReplyAdded} />
        ))}

        <DeleteNoteModal
          show={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />

      </StyledNoteCard>
    </div >
  );
};

export default NoteCard;