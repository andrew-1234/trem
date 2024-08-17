import { ChangeEvent } from "react";
import { Note } from "../constants/NoteType";
import { SearchNotes } from "../api";

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Note[]) => void;
}

const Filter = ({ searchQuery, setSearchQuery, setSearchResults }: FilterProps) => {
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length === 0) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await SearchNotes(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Failed to search notes', err);
    }
  };

  return (
    < div
      className="input-group search-bar"
    // style={{ width: "500px", height: "40px" }}
    >

      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
      />

      <button className="btn btn-primary" type="submit">
        Search
      </button>
    </div >
    // </div >
    // <div className="container">
    //   <input
    //     className="form-control"
    //     type="search"
    //     placeholder="Search"
    //     aria-label="Search"
    //     value={searchQuery}
    //     onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
    //   />
    // </div>
  );
};

export default Filter;