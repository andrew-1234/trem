from django.shortcuts import render

from trem_app.models import Note
from trem_app.serialiser import NoteSerialiser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(["GET", "POST"])
def notes(request):
    if request.method == "GET":
        notes = Note.objects.all()
        serialiser = NoteSerialiser(notes, many=True)
        return Response(serialiser.data)
    elif request.method == "POST":
        serialiser = NoteSerialiser(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
