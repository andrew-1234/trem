import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
// import Modal from "../components/Modal";

type Props = {}

const NotePage = (props: Props) => {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1 className="title">Note Title</h1>
          <div className="btn btn-primary btn-sm align-self-end m-2">Back</div>
        </div>

        <div className="note-metadata d-flex flex-column border border-primary">
          <div className=""> Created: </div>
          <div className=""> Updated: </div>
          <div className="">Category: </div>
          <div className="">Tags: </div>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <div className="">
            <button className="btn btn-outline-primary btn-sm m-1"><FiEdit /><span>Edit</span></button>
            <button className="btn btn-danger btn-sm m-1"><BiSolidTrashAlt /><span>Delete</span></button>
          </div>
        </div>

        <div className="note-content border border-primary">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
          quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?
        </div>





      </div>
      {/* <Modal /> */}
    </>
  )
}
export default NotePage;