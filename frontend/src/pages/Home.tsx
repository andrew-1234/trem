import { Fragment, useEffect, useState } from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'
import { FetchTotalNotes } from '../api';

const Home = () => {

  const [total, setTotalNotes] = useState<number>(0);
  useEffect(() => {
    const getTotalNotes = async () => {
      try {
        const data = await FetchTotalNotes();
        setTotalNotes(data.count);
      } catch (error) {
        console.error('Error fetching total notes:', error);
      }
    };

    getTotalNotes();
  }, []);
  useEffect(() => {
    document.title = 'Home'
  }, []);

  return (
    <Fragment>
      <Filter />
      <NoteCardContainer totalNotes={total} />
    </Fragment>
  )
}
export default Home