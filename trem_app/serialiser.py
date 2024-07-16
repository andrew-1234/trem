from rest_framework import serializers
from .models import Note


# Create a serialiser for note model
class NoteSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
