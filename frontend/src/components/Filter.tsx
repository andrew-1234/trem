const Filter = () => {
  return (
    <div className="container">
      <select className="form-select" aria-label="Default select example">
        <option selected>Filter by category:</option>
        <option value="1">General</option>
        <option value="2">Personal</option>
        <option value="3">Other</option>
      </select>
    </div>
  )
}

export default Filter;