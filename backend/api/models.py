from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Note model
class Note(models.Model):
    # Define the fields in Python
    title = models.CharField(max_length=100)
    content = models.TextField()
    # We don't pass this, just automatically create on creation
    created_at = models.DateTimeField(auto_now_add=True)
    # Foreign key links a user with data that belongs
    # to that user
    #
    # CASCADE just means delete all notes associated when user is deleted
    # Related name tells us what field name we put on the user
    # that references all of its notes (----.notes)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    
    sentiment = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.title
