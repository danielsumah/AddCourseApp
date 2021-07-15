from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from django.contrib import messages
from .forms import *
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
    form = CreateUserForm()
    if request.method == 'POST':
        data = request.POST
        user_creation_details = {
            'first_name': data.get('first_name'),
            'last_name': data.get('last_name'),
            'username': data.get('email'),
            'email': data.get('email'),
            'password1': data.get('password1'),
            'password2': data.get('password2')
        }
        print(user_creation_details)
        form = CreateUserForm(user_creation_details)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('email')
            messages.success(request, username +
                             ', Your account has been created')
            return redirect('login-url')
        else:
            messages.info(
                request,
                "Something is Wrong: \n\n email must be in this format 'xyz@email.com' \n password- 8 digits, Contain Cap Letter and a Number"
            )
            print(form.errors)

    context = {
        'form': form,
    }
    return render(request, "backend/signup.html", context)


def homepage_view(request):
    context = {}
    return render(request, "backend/index.html", context)


def courses_view(request):

    courses = Course.objects.all()

    if request.POST:
        user = request.user
        data = request.POST

        if data.get('clear-cart'):
            # get all already added to cart
            in_cart = Cart.objects.filter(user=request.user)
            in_cart.delete()
            return redirect('courses-url')
        else:
            # get the id of the course picked
            course_id = data.get('course_id')
            # bring out the course
            selected_course = Course.objects.get(id=course_id)

            # add course to user cart
            add_course = Cart.objects.filter(
                user=user, course_in_cart=selected_course)
            if add_course.exists():
                print(str(selected_course) + " is already in your cart")
                messages.info(
                    request,
                    str(selected_course) + " is already in your cart"
                )
            else:
                add_course = Cart.objects.create(
                    user=user, course_in_cart=selected_course)
                add_course.save()
                print(str(selected_course) + ' has been added to cart')
                messages.info(
                    request,
                    str(selected_course) + ' has been added to cart'
                )

    # all courses already in cart
    courses_picked = Cart.objects.filter(user=request.user)

    context = {
        'courses': courses,
        'courses_picked': courses_picked,
    }
    return render(request, "backend/courses.html", context)
