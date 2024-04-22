from django import forms
from .models import User
from .models import authUser

class addUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

class adminLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)