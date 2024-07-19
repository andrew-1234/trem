import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Modal from "../components/Modal";

type Props = {}

const NotePage = (props: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1 className="title">Note Title</h1>
          <button onClick={() => navigate(-1)} className="btn btn-primary btn-sm align-self-end m-2 ">Back</button>
        </div>

        <div className="note-metadata d-flex flex-column border border-primary">
          <div className=""> Created: </div>
          <div className=""> Updated: </div>
          <div className="">Category: </div>
          <div className="">Tags: </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div className="">
            <Link to="/edit-note" className="btn btn-outline-primary btn-sm m-1"><FiEdit /><span>Edit</span></Link>
            <button className="btn btn-danger btn-sm m-1"><BiSolidTrashAlt /><span>Delete</span></button>
          </div>
        </div>

        <div className="note-content border border-primary">

          Note contents go here
        </div>





      </div >
      {/* <Modal /> */}
    </>
  )
}
export default NotePage;