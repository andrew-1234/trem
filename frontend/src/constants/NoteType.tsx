export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tags: string;
  slug: string;
  thread_id: number | null;
  replies?: Note[];
  is_root_note: boolean;
}