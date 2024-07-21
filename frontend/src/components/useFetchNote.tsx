import { useState, useEffect } from 'react';
import { fetchNoteByID } from '../api';
import { Note } from '../constants/noteType';

export const useFetchNote = (id: number) => {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await fetchNoteByID(id);
        setNote(noteData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  return { note, loading, error };
};

