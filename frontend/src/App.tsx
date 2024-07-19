import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './custom.scss'
import HomePage from './pages/HomePage'
import Main from './layouts/Main'
import AddNote from './pages/FormAddNote'
import NotePage from './pages/NotePage'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} >
        <Route index element={<HomePage />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/note-info" element={<NotePage />} />
      </Route >
    )
  )

  return <RouterProvider router={router} />
}

export default App
