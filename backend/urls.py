from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path("login/", login_view, name="login-url"),
    path("signup/", signup_view, name="signup-url"),
    path("", homepage_view, name="homepage-url"),
    path("courses/", courses_view, name="courses-url"),
    path("logout/", logout_view, name="logout-url"),

]
