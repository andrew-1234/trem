import { ChangeEvent, useEffect } from "react";
import { Note } from "../constants/NoteType";
import { SearchNotes } from "../api";
import { UseDebounced } from "../components/UseDebounced";

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Note[]) => void;
}

const Filter = ({ searchQuery, setSearchQuery, setSearchResults }: FilterProps) => {
  const debouncedSearchQuery = UseDebounced(searchQuery, 500); // 500ms debounce

  useEffect(() => {
    const handleSearch = async (query: string) => {
      if (query.length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const results = await SearchNotes(query);
        setSearchResults(results);
      } catch (err) {
        console.error('Failed to search notes', err);
        setSearchResults([]);
      }
    };

    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery, setSearchResults]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    < div
      className="input-group"
    >

      <input
        className="form-control"
        type="search"
        placeholder="Filter"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />


    </div >
  );
};

export default Filter;