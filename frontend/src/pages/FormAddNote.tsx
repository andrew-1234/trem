type Props = {}

const FormAddNote = (props: Props) => {
  return (
    <div className="container col-6">
      <form>
        <h1>Add New Note</h1>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter note's title" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Content</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="Enter note's content"></textarea>
        </div>

        <select className="form-control form-select" id="exampleFormControlSelect1">
          <option selected>Select a category</option>
          <option value="1">General</option>
          <option value="2">Personal</option>
          <option value="3">Other</option>
        </select>

        <small id="optional" className="form-text text-muted">Optional</small>

        <button className="btn btn-primary d-flex justify-content-center mt-3" style={{ width: "100%" }}>Add Note</button>
      </form>
    </div>
  )
}


export default FormAddNote 