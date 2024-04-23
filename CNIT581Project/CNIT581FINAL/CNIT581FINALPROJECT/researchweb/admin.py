from django.contrib import admin

# Register your models here.

from .models import *

#adds the user table in the admin site
#username for the admin site is apuls and the password is Password123
admin.site.register(User)