import { Link } from "react-router-dom";

const NavBar = () => {


  return (
    <nav className="navbar navbar-trem" >
      <div className="container d-flex justify-content-left">
        <Link className="navbar-brand" to="/">
          <h3 style={{ fontWeight: "bold" }}>Trem notes</h3>
        </Link>
      </div>
    </nav >
  )
}

export default NavBar;