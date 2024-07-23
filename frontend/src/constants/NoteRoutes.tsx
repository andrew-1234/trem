export const NoteRoutes = {
  NOTE_INFO: function (id: string) { return "/note/" + id; },
  ADD_NOTE: "/add/note",
  EDIT_NOTE: function (id: string) { return "/edit/note/" + id; },
}