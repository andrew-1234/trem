import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import './custom.scss'
import { NoteRoutes } from './constants/NoteRoutes'
import Home from './pages/Home'
import Main from './layouts/Main'
import NotePage from './pages/NotePage'
import EditNotePage from './pages/EditNotePage'
export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} >
        <Route index element={<Home />} />
        <Route path={NoteRoutes.NOTE_INFO(":id")} element={<NotePage />} />
        {/* <Route path={NoteRoutes.ADD_NOTE} element={<AddNotePage />} /> */}
        <Route path={NoteRoutes.EDIT_NOTE(":id")} element={<EditNotePage />} />
      </Route >
    )
  )

  return <RouterProvider router={router} />
}

