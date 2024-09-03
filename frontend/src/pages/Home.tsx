// src/pages/Home.tsx

import React, { Fragment, useEffect, useState, useCallback } from 'react';
import Filter from '../components/Filter';
import NoteCardContainer from '../components/NoteCardContainer';
import { Note } from '../constants/NoteType';
import { HomePagination } from '../components/HomePagination';
import { FaSquarePlus } from 'react-icons/fa6';
import AddNotePage from './AddNotePage';
import { useNotes } from '../contexts/NotesContext';
import { Spinner } from 'react-bootstrap';

const Home: React.FC = () => {
  const { notes, totalNotes, loading, error, fetchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const page_size = 10;

  useEffect(() => {
    fetchNotes(page, page_size);
    console.log("total notes: ", totalNotes);
  }, [page, fetchNotes]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.title = 'Home';
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const refreshNotes = useCallback(() => {
    fetchNotes(page, page_size);
  }, [page, page_size, fetchNotes]);

  const page_count = searchQuery
    ? Math.ceil(searchResults.length / page_size)
    : Math.ceil(totalNotes / page_size);

  const displayedNotes = searchQuery ? searchResults : notes;

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

            {showModal && <AddNotePage onClose={closeModal} />}
          </div>
        </div>
        <HomePagination
          pageCount={page_count}
          onPageChange={setPage}
          currentPage={page}
        />
      </div>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      ) : displayedNotes.length > 0 ? (
        <NoteCardContainer
          totalNotes={totalNotes}
          notes={displayedNotes}
          error={null}
          onReplyAdded={refreshNotes}
        />
      ) : (
        <div className="text-center mt-4">No notes found</div>
      )}
    </Fragment>
  );
};

export default Home;