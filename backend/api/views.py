from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .utils import analyze_sentiment

# ListCreateView means it will list or create
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    # You cannot call this root unless you're authenticated
    # and you pass a valid JWT token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Filter notes and only get notes
        # created by this user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            note = serializer.save(author=self.request.user)
            sentiment = analyze_sentiment(note.content)
            print('setiment: ', sentiment)
            note.sentiment = sentiment
            note.save()
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # Used to make sure you can only delete your own notes
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    # List of all diff objects we look at
    # to make sure we don't create a duplicate
    queryset = User.objects.all()

    # Tells the view what kind of data
    # we need to accept to make a new user
    serializer_class = UserSerializer

    # Specifies who can actually call this
    # In this case anyone
    permission_classes = [AllowAny]