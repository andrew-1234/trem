import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'
type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
      <Filter />
      <NoteCardContainer />
    </>
  )
}

export default HomePage