from django.conf.urls import url
import app.views as views

urlpatterns = [
    url(r'load/$', views.load),
    url(r'post/$', views.post),
    url(r'(?P<UID>\d+)/$', views.index),
]
