import { useEffect } from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Home'
  })
  return (
    <>
      <Filter />
      <NoteCardContainer />
    </>
  )
}

export default HomePage