from django.db import models
from django.utils.text import slugify


# Create your models here.
# Create a Class for Notes
class Note(models.Model):
    CATEGORY = (("GENERAL", "General"), ("PERSONAL", "Personal"), ("OTHER", "Other"))

    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(max_length=100, choices=CATEGORY, default="GENERAL")
    tags = models.CharField(max_length=200, blank=True, default="")
    slug = models.SlugField(max_length=200, unique=True, editable=False)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.title

    # Define a method for saving the notes and initiating a unique slug
    def save(self, *args, **kwargs):
        super(Note, self).save(*args, **kwargs)  # Save to get the primary key (ID)
        if not self.slug:
            self.slug = f"{slugify(self.title)}-{self.id}"
            self.save(update_fields=["slug"])
