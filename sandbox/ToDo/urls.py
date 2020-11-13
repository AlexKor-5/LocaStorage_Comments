from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^todo/$',views.todo,name='todo'),
]