from django.urls import path, include
from django.contrib import admin
from . import views


urlpatterns = [
    path("admin", admin.site.urls),
    path("", views.index, name="index"),
]

