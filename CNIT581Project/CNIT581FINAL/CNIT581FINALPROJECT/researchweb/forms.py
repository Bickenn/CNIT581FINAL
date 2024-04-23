from django import forms
from .models import User
from .models import authUser

#creates the form to be used in the addUser page
class addUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

#creates the form to be added in in adminLogin page
class adminLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)