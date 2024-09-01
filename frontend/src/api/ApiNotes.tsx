import { Note } from '../constants/NoteType';
var BASE_URL = import.meta.env.VITE_APP_API_URL;

// List all notes
export const FetchNotes = async (page: number = 1, page_size: number = 10): Promise<Note[]> => {
  const response = await fetch(`${BASE_URL}/api/notes?page=${page}&page_size=${page_size}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return await response.json();
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
  console.log(BASE_URL);
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

// Delete a note
export const DeleteNote = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/notes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};

// Create a new note
export const CreateNote = async (note: Omit<Note, 'id' | 'created_at' | 'updated_at' | 'slug'>): Promise<number> => {
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
  return data.id;
};

// Get replies for a note
export const FetchNoteReplies = async (noteId: number): Promise<Note[]> => {
  const response = await fetch(`${BASE_URL}/api/notes/${noteId}/replies`);
  if (!response.ok) {
    throw new Error('Failed to fetch replies');
  }
  return await response.json();
};

// Get note Parent tree
export const FetchNoteParent = async (noteId: number): Promise<Note> => {
  const response = await fetch(`${BASE_URL}/api/notes/${noteId}/parent`);
  if (!response.ok) {
    throw new Error('Failed to fetch parent tree');
  }
  return await response.json();
};

// Search notes
export const SearchNotes = async (query: string): Promise<Note[]> => {
  const response = await fetch(`${BASE_URL}/api/search?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search notes');
  }
  const data = await response.json();
  return data as Note[];
};