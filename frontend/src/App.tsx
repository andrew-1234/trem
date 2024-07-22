import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import './custom.scss'
import { noteRoutes } from './constants/NoteRoutes'
import Home from './pages/Home'
import Main from './layouts/Main'
import NotePage from './pages/NotePage'
import AddNotePage from './pages/AddNotePage'
import EditNotePage from './pages/EditNotePage'
export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} >
        <Route index element={<Home />} />
        <Route path={noteRoutes.NOTE_INFO(":id")} element={<NotePage />} />
        <Route path={noteRoutes.ADD_NOTE} element={<AddNotePage />} />
        <Route path={noteRoutes.EDIT_NOTE(":id")} element={<EditNotePage />} />
      </Route >
    )
  )

  return <RouterProvider router={router} />
}

