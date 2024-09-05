// src/App.tsx

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './custom.scss'
import { NoteRoutes } from './constants/NoteRoutes'
import Home from './pages/Home'
import Main from './layouts/Main'
import NotePage from './pages/NotePage'
import { NotesProvider } from './contexts/NotesContext'
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/Toast';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} >
        <Route index element={<Home />} />
        <Route path={NoteRoutes.NOTE_INFO(":id")} element={<NotePage />} />
      </Route >
    )
  )

  return (
    <ToastProvider>
      <NotesProvider>
        <RouterProvider router={router} />
        <Toast />
      </NotesProvider>
    </ToastProvider>
  )
}