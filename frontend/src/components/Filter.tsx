const Filter = () => {
  return (
    <div className="container">
      <select className="form-select" aria-label="Default select example" defaultValue="">
        <option value="" disabled>Filter by tags:</option>
      </select>
    </div>
  )
}

export default Filter;

// API call to get all tags from the database
// Sort the tags alphabetically
// Display the tags in the dropdown menu

