import { useState, useEffect } from 'react';
import { FetchNoteById } from '../api/';
import { Note } from '../constants/NoteType';

export const UseFetchNote = (id: number) => {
  // export function useFetchNote(id: number) {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await FetchNoteById(id)
        setNote(noteData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    };

    loadNote()
  }, [id])

  return { note, loading, error }
}
