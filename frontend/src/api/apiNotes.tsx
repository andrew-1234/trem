import { Note } from '../constants/noteType';
var BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

// List all notes
export const FetchNotes = async (page: Number = 1, page_size: Number = 10): Promise<Note[]> => {
  console.log('fetchNotes');
  const response = await fetch(`${BASE_URL}/api/notes?page=${page}&page_size=${page_size}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const data = await response.json();
  return data as Note[];
};

// Fetch a single note 
export const FetchNoteById = async (id: number): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/api/notes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note');
  }
  const data = await response.json();
  return data as Note;
};

// Fetch the total number of notes
export const FetchTotalNotes = async (): Promise<{ count: number }> => {
  const response = await fetch(`${BASE_URL}/api/count`);
  if (!response.ok) {
    throw new Error('Failed to fetch total notes');
  }
  const data = await response.json();
  return data;
};

// Update a note
export const EditNote = async (note: Note): Promise<Note> => {
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
export const CreateNote = async (note: Note): Promise<number> => {
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