import { Fragment, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import NoteCardContainer from '../components/NoteCardContainer';
import { FetchNotes, FetchTotalNotes } from '../api';
import { Note } from '../constants/NoteType';
import { HomePagination } from '../components/HomePagination';

const Home = () => {
  const [total, setTotalNotes] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const page_size = 10; // Set the number of notes per page

  useEffect(() => {
    const getTotalNotes = async () => {
      try {
        const data = await FetchTotalNotes();
        setTotalNotes(data.count);
      } catch (error) {
        console.error('Error fetching total notes:', error);
      }
    };

    getTotalNotes();
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!searchQuery) {
          const notesData = await FetchNotes(page, page_size);
          setNotes(notesData);
        } else {
          setNotes(searchResults);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [page, searchQuery, searchResults]);

  const page_count = searchQuery
    ? Math.ceil(searchResults.length / page_size)
    : Math.ceil(total / page_size);
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <Fragment>
      <div className="container action-bar">
        <Filter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchResults={setSearchResults}
        />
        <HomePagination
          pageCount={page_count}
          onPageChange={setPage}
          currentPage={page}
        />
      </div>
      <NoteCardContainer
        totalNotes={total}
        notes={notes}
        loading={loading}
        error={error}
      />
    </Fragment>
  );
};

export default Home;