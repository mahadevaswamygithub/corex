from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    
    def save(self, *args, **kwargs):
        if self.is_active is None:
            self.is_active = True  
        super(User, self).save(*args, **kwargs)