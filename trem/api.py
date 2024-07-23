from datetime import datetime
from django.db.models.manager import BaseManager
from django.http import HttpRequest
from ninja import NinjaAPI, Schema
from typing import List, Optional
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from trem_app.models import Note

api = NinjaAPI()


class NoteIn(Schema):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[str] = None


class NoteOut(Schema):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    tags: str
    slug: str


class NotePagination(PageNumberPagination):
    page_size = 10


# Create note
@api.post("/notes")
def create_note(request: HttpRequest, payload: NoteIn) -> dict[str, int]:
    note: Note = Note.objects.create(**payload.dict())
    return {"id": note.id}


# Get note by ID
@api.get("/notes/{note_id}", response=NoteOut)
def get_note(request: HttpRequest, note_id: int) -> Note:
    note: Note = get_object_or_404(Note, id=note_id)
    return note


# List notes
# @api.get("/notes", response=List[NoteOut])
# def list_notes(request: HttpRequest) -> BaseManager[Note]:
#     qs: BaseManager[Note] = Note.objects.all()
#     return qs


# List notes with pagination
@api.get("/notes", response=List[NoteOut])
def list_notes(
    request: HttpRequest, page: int = 1, page_size: int = 10
) -> BaseManager[Note]:
    qs: BaseManager[Note] = Note.objects.all()
    start = (page - 1) * page_size
    end = start + page_size
    return qs[start:end]


# Get number of database entries in notes
@api.get("/count")
def count_notes(request: HttpRequest):
    count: int = Note.objects.count()
    return {"count": count}


# Update note by ID
@api.put("/notes/{note_id}")
def update_note(request: HttpRequest, note_id: int, payload: NoteIn) -> dict[str, bool]:
    note: Note = get_object_or_404(Note, id=note_id)
    for attr in ["title", "content", "tags"]:
        value = getattr(payload, attr)
        if value is not None:
            setattr(note, attr, value)
    note.save()  # type: ignore
    return {"success": True}


# Delete note by ID
@api.delete("/notes/{note_id}")
def delete_note(request: HttpRequest, note_id: int) -> dict[str, bool]:
    note: Note = get_object_or_404(Note, id=note_id)
    note.delete()
    return {"success": True}
