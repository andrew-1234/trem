import React, { useState, useEffect } from 'react';
import NoteCard from './NoteCard';
import { Note } from '../constants/NoteType';
import { FetchNoteParent } from '../api';
import AsyncWrapper from './AsyncWrapper';
import styled from 'styled-components';

const Metadata = styled.div`
  // padding: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

interface ParentTreeProps {
  note: Note;
}

const ParentTree: React.FC<ParentTreeProps> = ({ note }) => {
  const [parentTree, setParentTree] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getParentTree = async () => {
      if (note.is_root_note) {
        setParentTree(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const noteParentTree = await FetchNoteParent(note.id);
        setParentTree(noteParentTree);
      } catch (err) {
        console.error('Error fetching parent tree:', err);
        setError('Failed to fetch parent tree');
      } finally {
        setLoading(false);
      }
    };

    getParentTree();
  }, [note.id, note.is_root_note]);

  return (
    <AsyncWrapper
      loading={loading}
      error={error}
      data={parentTree}
      errorComponent={(error: string) => <div className="text-danger">Error loading parent tree: {error}</div>}
    >
      {parentTree && (
        <Metadata>
          <div className="list">
            <NoteCard note={parentTree} onReplyAdded={() => { }} />
          </div>
        </Metadata>
      )}
    </AsyncWrapper>
  );
};

export default ParentTree;