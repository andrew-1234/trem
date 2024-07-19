from datetime import datetime
from django.db.models.manager import BaseManager
from django.http import HttpRequest
from ninja import NinjaAPI, Schema
from typing import List, Optional

from django.shortcuts import get_object_or_404
from trem_app.models import Note

api = NinjaAPI()


class NoteIn(Schema):
    title: str
    content: str
    category: Optional[str] = None
    tags: Optional[str] = None


class NoteOut(Schema):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    category: str
    tags: str
    slug: str


@api.post("/notes")
def create_note(request: HttpRequest, payload: NoteIn) -> dict[str, int]:
    note: Note = Note.objects.create(**payload.dict())
    return {"id": note.id}


@api.get("/notes/{note_id}", response=NoteOut)
def get_note(request: HttpRequest, note_id: int) -> Note:
    note: Note = get_object_or_404(Note, id=note_id)
    return note


@api.get("/notes", response=List[NoteOut])
def list_notes(request: HttpRequest) -> BaseManager[Note]:
    qs: BaseManager[Note] = Note.objects.all()
    return qs


@api.put("/notes/{note_id}")
def update_note(request: HttpRequest, note_id: int, payload: NoteIn) -> dict[str, bool]:
    note: Note = get_object_or_404(Note, id=note_id)
    for attr, value in payload.dict().items():
        setattr(note, attr, value)
    note.save()  # type: ignore
    return {"success": True}


@api.delete("/notes/{note_id}")
def delete_note(request: HttpRequest, note_id: int) -> dict[str, bool]:
    note: Note = get_object_or_404(Note, id=note_id)
    note.delete()
    return {"success": True}
