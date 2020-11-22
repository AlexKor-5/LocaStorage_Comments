from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.controllerAW, name='todo'),
    url(r'^done_list/$', views.done_list, name='done_list'),
    url(r'^submit/$', views.submit, name='submit'),
    url(r'^load/$', views.load, name='load'),
    url(r'^done/$', views.done, name='done'),
    url(r'^delete/$', views.delete, name='delete'),
    url(r'^done_all/$', views.done_all, name='done_all'),
    url(r'^remove_all_done/$', views.remove_all_done, name='remove_all_done'),
    url(r'^remove_all_undone/$', views.remove_all_undone, name='remove_all_undone'),
    url(r'^load_done/$', views.load_done, name='load_done')
]