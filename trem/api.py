from datetime import datetime
from django.db.models.manager import BaseManager
from django.http import HttpRequest
from ninja import NinjaAPI, Schema
from typing import List, Optional
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from trem_app.models import Note
from django.db.models import Q
# from django.db.models import F

api = NinjaAPI()


class NoteIn(Schema):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[str] = None
    thread_id: Optional[int] = None


class NoteOut(Schema):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    tags: str
    slug: str
    # is_reply: bool
    is_root_note: bool
    replies: List["NoteOut"] = []

    @staticmethod
    def resolve_is_root_note(obj: Note) -> bool:
        return obj.is_root_note()


NoteOut.model_rebuild()


class NotePagination(PageNumberPagination):
    page_size = 10


# # Create note
# @api.post("/notes")
# def create_note(request: HttpRequest, payload: NoteIn) -> dict[str, int]:
#     note: Note = Note.objects.create(**payload.dict())
#     return {"id": note.id}
# Update the create_note and update_note functions
@api.post("/notes", response=NoteOut)
def create_note(request: HttpRequest, payload: NoteIn) -> Note:
    thread = None
    if payload.thread_id:
        thread = get_object_or_404(Note, id=payload.thread_id)

    note_data = payload.dict(exclude={"thread_id"})
    note = Note.objects.create(**note_data, thread=thread)
    return note


# Get note by ID
@api.get("/notes/{note_id}", response=NoteOut)
def get_note(request: HttpRequest, note_id: int) -> Note:
    note: Note = get_object_or_404(Note, id=note_id)
    return note


# List notes with pagination
@api.get("/notes", response=List[NoteOut])
def list_notes(request: HttpRequest, page: int = 1, page_size: int = 10) -> List[Note]:
    qs: BaseManager[Note] = Note.objects.filter(thread__isnull=True)  # Only root notes
    start = (page - 1) * page_size
    end = start + page_size
    return list(qs[start:end])


# Get replies to a note
@api.get("/notes/{note_id}/replies", response=List[NoteOut])
def get_note_replies(request: HttpRequest, note_id: int) -> List[Note]:
    note: Note = get_object_or_404(Note, id=note_id)
    return list(note.replies.all())


# @api.get("/notes/{note_id}/siblings", response=List[NoteOut])
# def get_sibling_notes(request: HttpRequest, note_id: int) -> List[Note]:
#     note: Note = get_object_or_404(Note, id=note_id)
#     return list(Note.objects.filter(note.thread))


# Get parent note
@api.get("/notes/{note_id}/parent", response=NoteOut)
def get_parent_note(request: HttpRequest, note_id: int) -> Optional[Note]:
    note: Note = get_object_or_404(Note, id=note_id)
    return note.thread


# Get number of database entries in notes
@api.get("/count")
def count_notes(request: HttpRequest):
    count: int = Note.objects.filter(thread__isnull=True).count()
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


# Search notes by query
@api.get("/search", response=List[NoteOut])
def search_notes2(request: HttpRequest, query: str) -> List[Note]:
    query_words = query.split()
    q_objects = Q()

    for word in query_words:
        q_objects &= (
            Q(title__icontains=word)
            | Q(content__icontains=word)
            | Q(tags__icontains=word)
        )

    results = Note.objects.filter(q_objects)
    return list(results)
