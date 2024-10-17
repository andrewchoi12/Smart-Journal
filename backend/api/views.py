from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
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