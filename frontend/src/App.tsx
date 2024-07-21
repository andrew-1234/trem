import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import './custom.scss'
import { ROUTES } from './constants/routes'
import HomePage from './pages/HomePage'
import Main from './layouts/Main'
import NotePage from './pages/NotePage'
import AddNotePage from './pages/AddNotePage'
import EditNotePage from './pages/EditNotePage'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} >
        <Route index element={<HomePage />} />
        <Route path={ROUTES.NOTE_INFO(":id")} element={<NotePage />} />
        <Route path={ROUTES.ADD_NOTE} element={<AddNotePage />} />
        <Route path={ROUTES.EDIT_NOTE(":id")} element={<EditNotePage />} />
      </Route >
    )
  )

  return <RouterProvider router={router} />
}

export default App
