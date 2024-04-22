from django.shortcuts import render
import requests
import json
import pandas as pd
from .models import User
from .models import authUser
from .forms import addUserForm
from .forms import adminLoginForm
from django.http import JsonResponse
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render
# Create your views here.

#creates views for all of the webpages
def index(request):
    context = {}
    return render(request, 'researchweb/index.html', context)

def news_article_one(request):
    #creates the urls variables and passes in the apis
    
    url2 = "https://api.openweathermap.org/data/2.5/weather?zip=47906&appid=9367be43d33c103efa4de2fb0ca675a6"
    
    api_response2 = requests.get(url2)
    weather_json = api_response2.json()

    weather_json['main']['temp'] = round((weather_json['main']['feels_like']-273.15)*9/5 + 32)
    weather_json['main']['feels_like'] = round((weather_json['main']['feels_like']-273.15)*9/5 + 32)
    weather_json['main']['temp_min'] = round((weather_json['main']['temp_min']-273.15)*9/5 + 32)
    weather_json['main']['temp_max'] = round((weather_json['main']['temp_max']-273.15)*9/5 + 32)
    weather_json['wind']['speed'] = round((weather_json['wind']['speed'] * 2.236936))

    #creates a dictionary with the json files
    context = {
        'weather': weather_json,
    }
    return render(request, 'researchweb/newsArticle1.html', context)

def news_article_two(request):
    url2 = "https://api.openweathermap.org/data/2.5/weather?zip=47906&appid=9367be43d33c103efa4de2fb0ca675a6"
    
    api_response2 = requests.get(url2)
    weather_json = api_response2.json()

    weather_json['main']['temp'] = round((weather_json['main']['feels_like']-273.15)*9/5 + 32)
    weather_json['main']['feels_like'] = round((weather_json['main']['feels_like']-273.15)*9/5 + 32)
    weather_json['main']['temp_min'] = round((weather_json['main']['temp_min']-273.15)*9/5 + 32)
    weather_json['main']['temp_max'] = round((weather_json['main']['temp_max']-273.15)*9/5 + 32)
    weather_json['wind']['speed'] = round((weather_json['wind']['speed'] * 2.236936))

    context = {
        'weather': weather_json,
    }
    return render(request, 'researchweb/newsArticle2.html', context)

def breakoutGame(request):
    context = {}
    return render(request, 'researchweb/breakout.html', context)

def snakeGame(request):
    context = {}
    return render(request, 'researchweb/snake.html', context)

def byteBlend(request):
    context = {}
    return render(request, 'researchweb/blog2.html', context)

def infinifit(request):
    context = {}
    return render(request, 'researchweb/blog1.html', context)

def adminLogin(request):
    if request.method == "POST":
        form = adminLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a success page.
                return redirect('/admin-page/')
            else:
                # Return an 'invalid login' error message.
                return HttpResponse("Invalid Login")
    else:
        form = adminLoginForm()
    return render(request, "researchweb/adminLogin.html", {'form': form})

def adminPage(request):
    users = User.objects.all()
    context = {
        'users': users,
    }
    return render(request, 'researchweb/adminPage.html', context)

def addUser(request):
    #gets the form
    form = addUserForm()
    if request.method == "POST" and request.headers.get("x-requested-with") == "XMLHttpRequest":
        form = addUserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            form.save()
            return JsonResponse({"username": username}, status=200)
        else:
            errors = form.errors.as_json()
            return JsonResponse({"errors": errors}, status=400)
    return render(request, "researchweb/addUser.html", {"form": form})

