import { Fragment, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import NoteCardContainer from '../components/NoteCardContainer';
import { FetchNotes, FetchTotalNotes } from '../api';
import { Note } from '../constants/NoteType';
import { HomePagination } from '../components/HomePagination';
// import { Link } from 'react-router-dom';
import { FaSquarePlus } from 'react-icons/fa6';
// import { NoteRoutes } from '../constants/NoteRoutes';
import AddNotePage from './AddNotePage';

const Home = () => {
  const [total, setTotalNotes] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const page_size = 10; // Set the number of notes per page


  useEffect(() => {
    const getTotalNotes = async () => {
      setError(null);
      try {
        const data = await FetchTotalNotes();
        setTotalNotes(data.count);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
      }
    };

    getTotalNotes();
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      setError(null);
      try {
        if (!searchQuery) {
          const notesData = await FetchNotes(page, page_size);
          setNotes(notesData);
        } else if (searchResults !== notes) {
          // Update notes when search results change, even if empty
          setNotes(searchResults);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
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
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {  // Check if the Esc key was pressed
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted or when showModal changes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);


  return (
    <Fragment>
      <div className="container action-bar">
        <div className="action-inner">
          <Filter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchResults={setSearchResults}
          />
          <div>
            <button
              className="btn btn-outline-primary add-note"
              type="button"
              onClick={openModal}
            >
              <FaSquarePlus /> Add Notes
            </button>

            {(showModal &&
              <AddNotePage onClose={closeModal} />
            )}
          </div>
        </div>
        <HomePagination
          pageCount={page_count}
          onPageChange={setPage}
          currentPage={page}
        />
      </div>
      <NoteCardContainer
        totalNotes={total}
        notes={notes}
        error={error}
      />
    </Fragment>
  );
};

export default Home;