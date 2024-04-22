from django.db import models

# Create your models here.
from django.utils import timezone

class User(models.Model):
	# User_ID <-- built-in ID
	username = models.CharField(max_length=50)
	email = models.CharField(max_length=100)
	fname = models.CharField(max_length=50)
	lname = models.CharField(max_length=50)
	def __str__(self):
		return self.username
	
class authUser(models.Model):
	# User_ID <-- built-in ID
	username = models.CharField(max_length=50)
	password = models.CharField(max_length=15)
	email = models.CharField(max_length=100)
	fname = models.CharField(max_length=50)
	lname = models.CharField(max_length=50)
	def __str__(self):
		return self.username