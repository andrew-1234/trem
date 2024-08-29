from django.db import models
from django.utils.text import slugify


class BaseModel(models.Model):
    class Meta:
        abstract = True


class Note(BaseModel):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.CharField(max_length=200, blank=True, default="")
    slug = models.SlugField(max_length=200, unique=True, editable=False)
    thread = models.ForeignKey(
        "self", null=True, blank=True, related_name="replies", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

    def is_root_note(self):
        return self.thread is None

    def save(self, *args, **kwargs) -> None:  # type: ignore
        super(Note, self).save(*args, **kwargs)  # type: ignore
        if not self.slug:
            self.slug: models.SlugField[str] = f"{slugify(self.title)}-{self.id}"
            self.save(update_fields=["slug"])  # type: ignore
