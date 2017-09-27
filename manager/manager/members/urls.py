from django.conf.urls import url
import members.views as views

urlpatterns = [
    url(r'^init/$', views.init)
]
