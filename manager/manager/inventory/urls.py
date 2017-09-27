from django.conf.urls import url
import inventory.views as views

urlpatterns = [
    url(r'^init/$', views.init)
]
