from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from django.contrib import messages
# Create your views here.


def login_view(request):
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("courses-url")
        else:
            messages.info(request, "Username or password is incorrect")
    context = {

    }

    return render(request, "backend/login.html", context)


def logout_view(request):
    logout(request)
    return redirect('login-url')


def signup_view(request):
    context = {}
    return render(request, "backend/signup.html", context)


def homepage_view(request):
    context = {}
    return render(request, "backend/index.html", context)


def courses_view(request):
    context = {}
    return render(request, "backend/courses.html", context)
