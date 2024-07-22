import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { noteRoutes } from "../constants/NoteRoutes";
const NavBar = () => {
  return (
    <nav className="navbar bg-white border-bottom border-primary border-end-100" >
      <div className="container d-flex justify-content-around">
        <Link className="navbar-brand" to="/">
          <h3 style={{ fontWeight: "bold" }}>Trem 📟 </h3>
        </Link>
        <div className="d-flex">
          <div
            className="input-group input-group-sm"
            style={{ width: "500px", height: "40px" }}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>

        <Link to={noteRoutes.ADD_NOTE} style={{ textDecoration: "none" }}>
          <button
            className="btn btn-outline-primary"
            type="button"
          >
            <FaSquarePlus /> Add Notes
          </button>
        </Link>
      </div>
    </nav >
  )
}

export default NavBar;