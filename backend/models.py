from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Course(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    high_price = models.CharField(max_length=10)
    low_price = models.CharField(max_length=10)
    image = models.ImageField()

    def __str__(self) -> str:
        return self.name+' by '+self.author


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course_in_cart = models.ForeignKey(
        Course, null=True, on_delete=models.SET_NULL)

    def __str__(self) -> str:
        return str(self.user) + '    --------    ' + str(self.course_in_cart)
