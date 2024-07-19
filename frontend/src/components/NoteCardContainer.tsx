import NoteCard from "./NoteCard";

const NoteCardContainer = () => {
  return (
    <div className="container">
      <div className="row">
        {/* <h4>Note card container</h4> */}
        <NoteCard color="blue" />
        <NoteCard color="red" />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
      {/* <NoteCard /> */}
    </div>
  )
}

export default NoteCardContainer;