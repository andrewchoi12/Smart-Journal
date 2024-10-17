from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields we want to serializer when we 
        # accept and return a user
        fields = ['id', 'username', 'password']
        # Tells Django that we want to accept password
        # when we create a new user but don't want to return
        # the password when we give info about a user
        # so, cannot read the password
        extra_kwargs = {'password' : {'write_only' : True}}

        # Method called when we want to create a new version of User
        # Accepts data, 
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user