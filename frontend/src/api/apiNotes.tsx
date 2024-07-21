import { Note } from '../constants/noteType';
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

// List all notes
export const fetchNotes = async (): Promise<Note[]> => {
  console.log('fetchNotes');
  const response = await fetch(`${BASE_URL}/api/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const data = await response.json();
  return data as Note[];
};

// Fetch a single note 
export const fetchNoteByID = async (id: number): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/api/notes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  const data = await response.json();
  return data as Note;
};

// Update a note
export const editNote = async (note: Note): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/api/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to edit note');
  }
  const data = await response.json();
  return data as Note;
};

// Create a new note
export const createNote = async (note: Note): Promise<number> => {
  const response = await fetch(`${BASE_URL}/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  const data = await response.json();
  return data.id as number;
};