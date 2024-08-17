import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { NoteRoutes } from "../constants/NoteRoutes";

const NavBar = () => {


  return (
    <nav className="navbar bg-white border-bottom border-primary border-end-100" >
      <div className="container d-flex justify-content-around">
        <Link className="navbar-brand" to="/">
          <h3 style={{ fontWeight: "bold" }}>Trem 📟 </h3>
        </Link>



        <Link to={NoteRoutes.ADD_NOTE} style={{ textDecoration: "none" }}>
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