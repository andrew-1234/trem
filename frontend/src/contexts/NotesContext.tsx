import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Note } from '../constants/NoteType';
import { FetchNotes, FetchTotalNotes, CreateNote, EditNote, DeleteNote as DeleteNoteAPI, FetchNoteById } from '../api';
import { useToast } from './ToastContext';

interface NotesContextType {
  notes: Note[];
  totalNotes: number;
  loading: boolean;
  error: string | null;
  fetchNotes: (page: number, pageSize: number) => Promise<void>;
  fetchNoteById: (id: number) => Promise<Note>;
  addNote: (note: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'slug'>) => Promise<number>;
  updateNote: (updatedNote: Note) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [totalNotes, setTotalNotes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchNotes = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedNotes = await FetchNotes(page, pageSize);
      setNotes(fetchedNotes);
      const totalCount = await FetchTotalNotes();
      setTotalNotes(totalCount.count);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNoteById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const note = await FetchNoteById(id);
      return note;
    } catch (err) {
      setError('Failed to fetch note');
      console.error('Error fetching note:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(async (note: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'slug'>) => {
    setLoading(true);
    setError(null);
    try {
      const newNoteId = await CreateNote(note);
      setNotes(prevNotes => [...prevNotes, { ...note, id: newNoteId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), slug: '' }]);
      setTotalNotes(prevTotal => prevTotal + 1);
      showToast('Note added successfully', 'success');
      return newNoteId;
    } catch (err) {
      setError('Failed to add note');
      showToast('Failed to add note', 'error');
      console.error('Error adding note:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const updateNote = useCallback(async (updatedNote: Note) => {
    setLoading(true);
    setError(null);
    try {
      await EditNote(updatedNote);
      setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? updatedNote : note));
      showToast('Note updated successfully', 'success');
    } catch (err) {
      setError('Failed to update note');
      showToast('Failed to update note', 'error');
      console.error('Error updating note:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const deleteNote = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await DeleteNoteAPI(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      setTotalNotes(prevTotal => prevTotal - 1);
      showToast('Note deleted successfully', 'success');
    } catch (err) {
      setError('Failed to delete note');
      showToast('Failed to delete note', 'error');
      console.error('Error deleting note:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        totalNotes,
        loading,
        error,
        fetchNotes,
        fetchNoteById,
        addNote,
        updateNote,
        deleteNote
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};